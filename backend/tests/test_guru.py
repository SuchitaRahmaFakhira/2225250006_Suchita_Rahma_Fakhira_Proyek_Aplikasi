from app import create_app
from conftest import buat_hasil


def masuk(client, kunci="rahasia"):
    return client.post("/guru/masuk", data={"kunci": kunci})


def test_halaman_masuk_tampil(client):
    resp = client.get("/guru")
    assert resp.status_code == 200
    assert "Kunci guru".encode() in resp.data


def test_kunci_salah_ditolak(client):
    resp = masuk(client, "salah")
    assert resp.status_code == 401
    assert client.get("/guru/rekap.csv").status_code == 401


def test_kunci_belum_diatur_rekap_terkunci(tmp_path):
    app = create_app({"TESTING": True, "SECRET_KEY": "uji", "KUNCI_GURU": "", "DATABASE": str(tmp_path / "a.db")})
    client = app.test_client()
    assert "belum diatur".encode() in client.get("/guru").data
    assert masuk(client, "").status_code == 401
    assert client.get("/guru/rekap.csv").status_code == 401


def test_rekap_dan_csv(client, siswa_id):
    client.post(
        "/api/hasil",
        json={
            "siswa_id": siswa_id,
            "hasil": [
                buat_hasil("p1", jenis="evaluasi", modul="pretest-A", skor=6, maks=10),
                buat_hasil("p2", jenis="evaluasi", modul="posttest-B", skor=9, maks=10),
                buat_hasil("p3", jenis="evaluasi", modul="posttest-B", skor=10, maks=10),
                buat_hasil("l1", skor=4, maks=5),
                buat_hasil("l2", skor=3, maks=5),
                buat_hasil("g1", jenis="angket", modul="angket-pretest", skor=5, maks=9),
                buat_hasil("m1", jenis="modul", modul="modul-1", skor=None, maks=None),
            ],
        },
    )
    assert masuk(client).status_code == 302

    halaman = client.get("/guru").data.decode()
    assert "Rani" in halaman

    csv = client.get("/guru/rekap.csv").data.decode("utf-8-sig")
    baris = csv.strip().splitlines()
    assert baris[0].startswith("nama_panggilan;id_siswa;pre_test;post_test")
    kolom = baris[1].split(";")
    assert kolom[0] == "Rani" and kolom[1] == siswa_id[:6]
    # Post-test memakai percobaan pertama (90), rata latihan (80+60)/2 = 70
    assert kolom[2:8] == ["60", "90", "70,0", "2", "1,0", "5,0"]
    assert kolom[8] == "1"


def test_keluar(client):
    masuk(client)
    client.get("/guru/keluar")
    assert client.get("/guru/rekap.csv").status_code == 401
