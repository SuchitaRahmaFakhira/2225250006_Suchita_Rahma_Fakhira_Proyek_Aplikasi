"""REST API JSON untuk aplikasi PolaKu (dipanggil dari frontend JavaScript)."""
import json
import uuid
from datetime import datetime, timezone

from flask import Blueprint, current_app, jsonify, request

from db import get_db

api_bp = Blueprint("api", __name__, url_prefix="/api")

JENIS_HASIL = {"latihan", "evaluasi", "angket", "modul"}
MAKS_BATCH = 100
MAKS_NAMA = 30
MAKS_DETAIL = 20_000


def sekarang():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def gagal(pesan, kode_http=400):
    return jsonify(ok=False, pesan=pesan), kode_http


def bilangan_bulat(nilai, minimum=0):
    """True jika nilai adalah int (bukan bool) dan >= minimum."""
    return type(nilai) is int and nilai >= minimum


def teks_pendek(nilai, maks):
    return isinstance(nilai, str) and 0 < len(nilai.strip()) <= maks


@api_bp.get("/kesehatan")
def kesehatan():
    return jsonify(ok=True, waktu=sekarang())


def baca_nama(data):
    """Mengembalikan (nama, None) jika valid, atau (None, pesan_galat)."""
    nama = data.get("nama_panggilan")
    if not isinstance(nama, str) or not nama.strip():
        return None, "Nama panggilan wajib diisi."
    nama = " ".join(nama.split())
    if len(nama) > MAKS_NAMA:
        return None, f"Nama terlalu panjang (maks. {MAKS_NAMA} huruf)."
    return nama, None


@api_bp.post("/siswa")
def daftar_siswa():
    """Siapa pun boleh mendaftar: cukup nama panggilan, tanpa kode kelas."""
    nama, galat = baca_nama(request.get_json(silent=True) or {})
    if galat:
        return gagal(galat)

    siswa_id = str(uuid.uuid4())
    db = get_db()
    db.execute(
        "INSERT INTO siswa (id, nama_panggilan, dibuat) VALUES (?, ?, ?)",
        (siswa_id, nama, sekarang()),
    )
    db.commit()
    return jsonify(ok=True, siswa_id=siswa_id), 201


@api_bp.put("/siswa/<siswa_id>")
def ubah_nama_siswa(siswa_id):
    nama, galat = baca_nama(request.get_json(silent=True) or {})
    if galat:
        return gagal(galat)
    db = get_db()
    cur = db.execute("UPDATE siswa SET nama_panggilan = ? WHERE id = ?", (nama, siswa_id))
    db.commit()
    if cur.rowcount == 0:
        return gagal("Siswa tidak ditemukan.", 404)
    return jsonify(ok=True)


def periksa_item_hasil(item):
    """Mengembalikan pesan kesalahan, atau None jika item valid."""
    if not isinstance(item, dict):
        return "harus berupa objek"
    if not teks_pendek(item.get("id"), 64):
        return "id tidak valid"
    if item.get("jenis") not in JENIS_HASIL:
        return "jenis tidak valid"
    modul = item.get("modul")
    if modul is not None and not teks_pendek(modul, 50):
        return "modul tidak valid"
    for kolom in ("skor", "maks"):
        if item.get(kolom) is not None and not bilangan_bulat(item.get(kolom)):
            return f"{kolom} harus bilangan bulat >= 0"
    skor, maks = item.get("skor"), item.get("maks")
    if skor is not None and maks is not None and skor > maks:
        return "skor tidak boleh lebih dari maks"
    if not bilangan_bulat(item.get("petunjuk_dipakai", 0)):
        return "petunjuk_dipakai harus bilangan bulat >= 0"
    if not teks_pendek(item.get("waktu"), 40):
        return "waktu wajib diisi"
    if len(json.dumps(item.get("detail"), ensure_ascii=False)) > MAKS_DETAIL:
        return "detail terlalu besar"
    return None


@api_bp.post("/hasil")
def simpan_hasil():
    data = request.get_json(silent=True) or {}
    siswa_id = data.get("siswa_id")
    daftar = data.get("hasil")

    if not isinstance(daftar, list) or not daftar:
        return gagal("Daftar hasil kosong.")
    if len(daftar) > MAKS_BATCH:
        return gagal(f"Maksimal {MAKS_BATCH} hasil per kiriman.")

    db = get_db()
    if not isinstance(siswa_id, str) or db.execute(
        "SELECT 1 FROM siswa WHERE id = ?", (siswa_id,)
    ).fetchone() is None:
        return gagal("Siswa tidak ditemukan.", 404)

    for i, item in enumerate(daftar):
        pesan = periksa_item_hasil(item)
        if pesan:
            return gagal(f"Hasil ke-{i + 1}: {pesan}.")

    diterima = 0
    waktu_terima = sekarang()
    for item in daftar:
        cur = db.execute(
            """INSERT OR IGNORE INTO hasil
               (id, siswa_id, jenis, modul, skor, maks, petunjuk_dipakai, detail_json, waktu, diterima)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                item["id"],
                siswa_id,
                item["jenis"],
                item.get("modul"),
                item.get("skor"),
                item.get("maks"),
                item.get("petunjuk_dipakai", 0),
                json.dumps(item.get("detail"), ensure_ascii=False),
                item["waktu"],
                waktu_terima,
            ),
        )
        diterima += cur.rowcount
    db.commit()
    return jsonify(ok=True, diterima=diterima, total=len(daftar))


@api_bp.get("/soal/evaluasi")
def soal_evaluasi():
    versi = (request.args.get("versi") or "A").upper()
    with open(current_app.config["BANK_SOAL"], encoding="utf-8") as f:
        bank = json.load(f)
    if versi not in bank:
        return gagal("Versi soal tidak tersedia.")
    return jsonify(ok=True, versi=versi, soal=bank[versi])
