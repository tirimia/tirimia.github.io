import json
import os
import sqlite3
from pathlib import Path

db = sqlite3.connect(os.environ["ORG_ROAM_DB_PATH"])
cur = db.cursor()
cur.execute("select id, file, title from nodes")
data = cur.fetchall()
nodes = [
    {
        "id": node[0].replace('"', ""),
        "note": Path(node[1].replace('"', "")).stem,
        "name": node[2].replace('"', ""),
    }
    for node in data
]
cur.execute("select source, dest from links")
data = cur.fetchall()
links = [
    {"source": link[0].replace('"', ""), "target": link[1].replace('"', ""), "value": 1}
    for link in data
    if not link[1].startswith('".')  # Cuts out images
]

file_path = os.environ.get("OUTPUT_FILE") or "main/graph.json"
with open(file_path, "w") as f:
    json.dump({"nodes": nodes, "links": links}, f, indent=2)
