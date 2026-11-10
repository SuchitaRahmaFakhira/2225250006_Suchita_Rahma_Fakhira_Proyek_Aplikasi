"""Halaman rekap untuk guru/peneliti: /guru, /guru/masuk, /guru/keluar, /guru/rekap.csv

Aplikasi siswa terbuka untuk semua orang, tetapi rekap nilai dilindungi satu
kunci guru yang diatur di server (variabel lingkungan KUNCI_GURU di file .env).
"""
import csv
import hmac
import io
from datetime import datetime

from flask import Blueprint, Response, current_app, redirect, render_template, request, session, url_for

from db import get_db

guru_bp = Blueprint("guru", __name__, url_prefix="/guru")


def persen(skor, maks):
    if skor is None or not maks:
        return None
    return round(skor * 100 / maks)


def rata(nilai):
    nilai = [n for n in nilai if n is not None]
    return round(sum(nilai) / len(nilai), 1) if nilai else None


def hitung_rekap():
    """Menghitung ringkasan nilai setiap siswa."""
    db = get_db()
    siswa = db.execute("SELECT id, nama_panggilan, dibuat FROM siswa ORDER BY nama_panggilan, dibuat").fetchall()

    rekap = []
    for s in siswa:
        hasil = db.execute(
            "SELECT jenis, modul, skor, maks, petunjuk_dipakai, waktu FROM hasil "
            "WHERE siswa_id = ? ORDER BY waktu",
            (s["id"],),
        ).fetchall()

        pre = [h for h in hasil if h["jenis"] == "evaluasi" and (h["modul"] or "").startswith("pretest")]
        post = [h for h in hasil if h["jenis"] == "evaluasi" and (h["modul"] or "").startswith("posttest")]
        latihan = [h for h in hasil if h["jenis"] == "latihan"]
        angket = [h["skor"] for h in hasil if h["jenis"] == "angket"]
        modul = {h["modul"] for h in hasil if h["jenis"] == "modul"}

        rekap.append(
            {
                "nama": s["nama_panggilan"],
                "id_pendek": s["id"][:6],  # pembeda bila ada nama yang sama
                # Nilai tes yang dipakai = percobaan PERTAMA (paling jujur untuk penelitian).
                "pretest": persen(pre[0]["skor"], pre[0]["maks"]) if pre else None,
                "posttest": persen(post[0]["skor"], post[0]["maks"]) if post else None,
                "rata_latihan": rata([persen(h["skor"], h["maks"]) for h in latihan]),
                "jumlah_latihan": len(latihan),
                "rata_petunjuk": rata([h["petunjuk_dipakai"] for h in latihan]),
                "rata_angket": rata(angket),
                "modul_selesai": len(modul),
                "terakhir": hasil[-1]["waktu"][:16].replace("T", " ") if hasil else "-",
            }
        )
    return rekap


def kunci_diatur():
    return bool(current_app.config.get("KUNCI_GURU"))


def sudah_masuk():
    return kunci_diatur() and session.get("guru") is True


@guru_bp.get("")
@guru_bp.get("/")
def beranda():
    if not sudah_masuk():
        return render_template("guru_masuk.html", kunci_diatur=kunci_diatur())
    return render_template("guru.html", rekap=hitung_rekap(), dibuat=datetime.now().strftime("%d-%m-%Y %H.%M"))


@guru_bp.post("/masuk")
def masuk():
    kunci = request.form.get("kunci") or ""
    benar = current_app.config.get("KUNCI_GURU") or ""
    if not benar or not hmac.compare_digest(kunci.encode(), benar.encode()):
        return render_template("guru_masuk.html", galat="Kunci guru salah.", kunci_diatur=kunci_diatur()), 401
    session.clear()
    session["guru"] = True
    return redirect(url_for("guru.beranda"))


@guru_bp.get("/keluar")
def keluar():
    session.pop("guru", None)
    return redirect(url_for("guru.beranda"))


def angka_id(nilai):
    """Format angka untuk Excel berbahasa Indonesia (koma desimal)."""
    if nilai is None:
        return ""
    return str(nilai).replace(".", ",")


@guru_bp.get("/rekap.csv")
def rekap_csv():
    if not sudah_masuk():
        return Response("Silakan masuk sebagai guru terlebih dahulu.", status=401)

    keluaran = io.StringIO()
    penulis = csv.writer(keluaran, delimiter=";")
    penulis.writerow(
        [
            "nama_panggilan", "id_siswa", "pre_test", "post_test", "rata_latihan_persen", "jumlah_latihan",
            "rata_petunjuk_per_latihan", "rata_angket_beban_kognitif", "modul_selesai", "aktivitas_terakhir",
        ]
    )
    for r in hitung_rekap():
        penulis.writerow(
            [
                r["nama"], r["id_pendek"], angka_id(r["pretest"]), angka_id(r["posttest"]), angka_id(r["rata_latihan"]),
                r["jumlah_latihan"], angka_id(r["rata_petunjuk"]), angka_id(r["rata_angket"]),
                r["modul_selesai"], r["terakhir"],
            ]
        )
    # BOM (utf-8-sig) agar huruf terbaca benar saat dibuka di Excel.
    return Response(
        "﻿" + keluaran.getvalue(),
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="rekap-polaku.csv"'},
    )
