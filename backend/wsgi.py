"""Titik masuk WSGI (dipakai PythonAnywhere atau server WSGI lain).

Di file WSGI PythonAnywhere cukup tulis:
    import sys
    sys.path.insert(0, "/home/<username>/polaku/backend")
    from wsgi import application
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app  # noqa: E402

application = create_app()
