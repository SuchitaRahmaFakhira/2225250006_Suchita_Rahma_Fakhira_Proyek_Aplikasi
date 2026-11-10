from conftest import buat_hasil


def test_kesehatan(client):
    assert client.get("/api/kesehatan").get_json()["ok"] is True


def test_daftar_siswa_tanpa_kode_kelas(client):
    resp = client.post("/api/siswa", json={"nama_panggilan": "  Rani  "})
    assert resp.status_code == 201
    assert len(resp.get_json()["siswa_id"]) == 36


def test_nama_sama_tetap_siswa_berbeda(client):
    a = client.post("/api/siswa", json={"nama_panggilan": "Rani"}).get_json()["siswa_id"]
    b = client.post("/api/siswa", json={"nama_panggilan": "Rani"}).get_json()["siswa_id"]
    assert a != b


def test_daftar_siswa_nama_kosong_atau_panjang(client):
    assert client.post("/api/siswa", json={"nama_panggilan": "  "}).status_code == 400
    assert client.post("/api/siswa", json={"nama_panggilan": "x" * 31}).status_code == 400
    assert client.post("/api/siswa", data="bukan json").status_code == 400


def test_ubah_nama_siswa(client, siswa_id):
    assert client.put(f"/api/siswa/{siswa_id}", json={"nama_panggilan": "Rani Putri"}).status_code == 200
    assert client.put(f"/api/siswa/{siswa_id}", json={"nama_panggilan": ""}).status_code == 400
    assert client.put("/api/siswa/tidak-ada", json={"nama_panggilan": "X"}).status_code == 404


def test_simpan_hasil_batch(client, siswa_id):
    resp = client.post(
        "/api/hasil",
        json={"siswa_id": siswa_id, "hasil": [buat_hasil("a1"), buat_hasil("a2", jenis="angket", modul="angket-modul-1", skor=3, maks=9)]},
    )
    assert resp.status_code == 200
    assert resp.get_json()["diterima"] == 2


def test_simpan_hasil_id_duplikat_diabaikan(client, siswa_id):
    client.post("/api/hasil", json={"siswa_id": siswa_id, "hasil": [buat_hasil("dup")]})
    resp = client.post("/api/hasil", json={"siswa_id": siswa_id, "hasil": [buat_hasil("dup"), buat_hasil("baru")]})
    assert resp.get_json()["diterima"] == 1


def test_simpan_hasil_validasi(client, siswa_id):
    kasus = [
        buat_hasil("x", jenis="lain"),
        buat_hasil("x", skor=6, maks=5),
        buat_hasil("x", skor=-1),
        buat_hasil("x", skor=True),
        buat_hasil("x", waktu=""),
    ]
    for item in kasus:
        resp = client.post("/api/hasil", json={"siswa_id": siswa_id, "hasil": [item]})
        assert resp.status_code == 400, item


def test_simpan_hasil_siswa_tidak_dikenal(client):
    resp = client.post("/api/hasil", json={"siswa_id": "tidak-ada", "hasil": [buat_hasil("x")]})
    assert resp.status_code == 404


def test_simpan_hasil_batch_terlalu_besar(client, siswa_id):
    hasil = [buat_hasil(f"id{i}") for i in range(101)]
    assert client.post("/api/hasil", json={"siswa_id": siswa_id, "hasil": hasil}).status_code == 400


def test_soal_evaluasi(client):
    for versi in ("A", "B"):
        data = client.get(f"/api/soal/evaluasi?versi={versi}").get_json()
        assert data["ok"] and len(data["soal"]) == 10
        for soal in data["soal"]:
            assert len(soal["pilihan"]) == 4
            assert 0 <= soal["kunci"] < 4
            assert soal["pengecoh"][soal["kunci"]] is None
    assert client.get("/api/soal/evaluasi?versi=Z").status_code == 400


def test_api_tidak_dikenal_404_json(client):
    resp = client.get("/api/tidak-ada")
    assert resp.status_code == 404
    assert resp.get_json()["ok"] is False


def test_frontend_belum_dibuild(client):
    assert client.get("/").status_code == 503


def test_frontend_disajikan(app, tmp_path):
    dist = tmp_path / "dist"
    dist.mkdir()
    (dist / "index.html").write_text("<h1>PolaKu</h1>", encoding="utf-8")
    (dist / "sw.js").write_text("// sw", encoding="utf-8")
    client = app.test_client()
    assert b"PolaKu" in client.get("/").data
    assert b"PolaKu" in client.get("/rute/apa/saja").data
    resp = client.get("/sw.js")
    assert resp.headers["Cache-Control"] == "no-cache"
    assert "javascript" in resp.headers["Content-Type"]
