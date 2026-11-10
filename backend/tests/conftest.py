import pytest

from app import create_app


@pytest.fixture
def app(tmp_path):
    return create_app(
        {
            "TESTING": True,
            "SECRET_KEY": "uji",
            "KUNCI_GURU": "rahasia",
            "DATABASE": str(tmp_path / "uji.db"),
            "FRONTEND_DIST": str(tmp_path / "dist"),
        }
    )


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def siswa_id(client):
    resp = client.post("/api/siswa", json={"nama_panggilan": "Rani"})
    return resp.get_json()["siswa_id"]


def buat_hasil(id_, jenis="latihan", modul="latihan-un", skor=4, maks=5, **lain):
    item = {
        "id": id_,
        "jenis": jenis,
        "modul": modul,
        "skor": skor,
        "maks": maks,
        "petunjuk_dipakai": 1,
        "detail": {"soal": []},
        "waktu": "2026-11-10T08:00:00+07:00",
    }
    item.update(lain)
    return item
