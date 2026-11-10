"""Server Python (Flask) untuk PolaKu.

Menyajikan:
- /api/...  : REST API JSON (siswa, hasil belajar, bank soal evaluasi)
- /guru     : halaman rekap untuk guru/peneliti
- /         : hasil build frontend React (PWA) dari ../frontend/dist
"""
import mimetypes
import os
import secrets

from flask import Flask, jsonify, send_from_directory

import db
from routes.api import api_bp
from routes.guru import guru_bp

# Windows kadang salah menebak tipe file; pastikan benar agar PWA berjalan.
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("image/svg+xml", ".svg")

FOLDER_INI = os.path.dirname(os.path.abspath(__file__))
TANPA_CACHE = {"", "index.html", "sw.js", "manifest.webmanifest", "registerSW.js"}


def create_app(config=None):
    try:
        from dotenv import load_dotenv

        load_dotenv(os.path.join(FOLDER_INI, ".env"))
    except ImportError:
        pass

    app = Flask(__name__, instance_path=os.path.join(FOLDER_INI, "instance"))
    app.config.update(
        SECRET_KEY=os.environ.get("SECRET_KEY") or secrets.token_hex(32),
        # Kunci untuk membuka halaman rekap /guru. Jika kosong, rekap tidak bisa dibuka.
        KUNCI_GURU=os.environ.get("KUNCI_GURU", ""),
        DATABASE=os.environ.get("DATABASE") or os.path.join(app.instance_path, "data.db"),
        FRONTEND_DIST=os.environ.get("FRONTEND_DIST")
        or os.path.join(FOLDER_INI, "..", "frontend", "dist"),
        BANK_SOAL=os.path.join(FOLDER_INI, "data", "bank_soal_evaluasi.json"),
        SESSION_COOKIE_SAMESITE="Lax",
        JSON_SORT_KEYS=False,
    )
    if config:
        app.config.update(config)

    os.makedirs(app.instance_path, exist_ok=True)
    db.init_app(app)
    with app.app_context():
        db.init_db()

    app.register_blueprint(api_bp)
    app.register_blueprint(guru_bp)

    @app.get("/", defaults={"path": ""})
    @app.get("/<path:path>")
    def frontend(path):
        if path.startswith("api/"):
            return jsonify(ok=False, pesan="Alamat API tidak ditemukan."), 404
        dist = os.path.abspath(app.config["FRONTEND_DIST"])
        if not os.path.isfile(os.path.join(dist, "index.html")):
            return (
                "<h1>PolaKu</h1><p>Frontend belum di-build. Jalankan "
                "<code>npm run build</code> di folder <code>frontend/</code>.</p>",
                503,
            )
        if path and os.path.isfile(os.path.join(dist, path)):
            resp = send_from_directory(dist, path)
        else:
            resp = send_from_directory(dist, "index.html")
            path = "index.html"
        if path in TANPA_CACHE:
            resp.headers["Cache-Control"] = "no-cache"
        return resp

    return app
