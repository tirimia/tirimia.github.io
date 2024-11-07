# Heavily inspired by https://www.amoradi.org/20210730173543.html
import os
import sqlite3
from pathlib import Path

# from pandocfilters import Image, Link, Para, RawBlock, Str, toJSONFilter, walk
from panflute import (
    Doc,
    Header,
    HorizontalRule,
    Image,
    Link,
    ListItem,
    OrderedList,
    Para,
    Str,
    run_filter,
)

db = sqlite3.connect(os.environ["ORG_ROAM_DB_PATH"])

NOTES_HTTP_PATH = "/azubinomicon/notes"


def img_to_url(filename: str) -> str:
    return f"{NOTES_HTTP_PATH}/assets/{os.path.basename(filename)}"


def file_to_url(file: str) -> str:
    return f"{NOTES_HTTP_PATH}/{Path(file).stem}.html"


def unquote(s: str):
    """Roam looooves to quote stuff, I don't."""
    return s.replace('"', "")


def get_backlinks(note_id: str) -> [ListItem]:
    cur = db.cursor()
    cur.execute(
        "select nodes.title, nodes.file from links join nodes on links.source = nodes.id where links.dest = ?",
        (f'"{note_id}"',),
    )
    return [
        ListItem(
            Para(Link(Str(unquote(backlink[0])), url=file_to_url(unquote(backlink[1]))))
        )
        for backlink in cur.fetchall()
    ]


def prepare(doc: Doc):
    return


def action(elem, doc: Doc):
    if isinstance(elem, Image):
        elem.url = img_to_url(elem.url)
        return elem
    elif isinstance(elem, Link) and elem.url.startswith("id:"):
        cur = db.cursor()
        org_uuid = elem.url.split(":")[1]
        parameters = [f'"{org_uuid}"']  # UUIDs are quoted
        cur.execute("select id, file from nodes where id = ?", parameters)
        data = cur.fetchone()
        file_name = Path(data[1]).stem
        elem.url = file_to_url(file_name)
        return elem


def finalize(doc: Doc):
    note_id = doc.get_metadata("id")
    backlinks = get_backlinks(note_id)
    if backlinks:
        backlinks_title = Header(Str("Backlinks"), level=2)
        doc.content.extend([HorizontalRule(), backlinks_title, OrderedList(*backlinks)])


run_filter(action, prepare, finalize)
