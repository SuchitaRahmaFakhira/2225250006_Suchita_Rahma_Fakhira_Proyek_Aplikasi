"""Koneksi dan skema database SQLite untuk PolaKu.

Aplikasi terbuka untuk semua orang: tidak ada kode kelas.
Siswa cukup dikenali dari nama panggilan + ID acak dari server.
"""
import sqlite3

import click
from flask import current_app, g

SKEMA = """
CREATE TABLE IF NOT EXISTS siswa (
    id              TEXT PRIMARY KEY,
    nama_panggilan  TEXT NOT NULL,
    dibuat          TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hasil (
    id                TEXT PRIMARY KEY,
    siswa_id          TEXT NOT NULL REFERENCES siswa(id),
    jenis             TEXT NOT NULL CHECK (jenis IN ('latihan', 'evaluasi', 'angket', 'modul')),
    modul             TEXT,
    skor              INTEGER,
    maks              INTEGER,
    petunjuk_dipakai  INTEGER NOT NULL DEFAULT 0,
    detail_json       TEXT,
    waktu             TEXT NOT NULL,
    diterima          TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hasil_siswa ON hasil(siswa_id);
"""


def get_db():
    """Ambil koneksi database untuk request yang sedang berjalan."""
    if "db" not in g:
        g.db = sqlite3.connect(current_app.config["DATABASE"])
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


def close_db(_error=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    get_db().executescript(SKEMA)


@click.command("init-db")
def init_db_command():
    """Membuat tabel database (aman dijalankan berulang kali)."""
    init_db()
    click.echo("Database siap.")


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
