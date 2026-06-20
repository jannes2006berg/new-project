from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'index.html',
    'menu.html',
    'socials.html',
    'src/styles.css',
    'src/scroll-buttons.js',
    'assets/favicon.svg',
]
HTML_FILES = ['index.html', 'menu.html', 'socials.html']

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        for attr in ('href', 'src'):
            if attr in data:
                self.refs.append((tag, attr, data[attr]))


def is_external(ref: str) -> bool:
    parsed = urlparse(ref)
    return parsed.scheme in {'http', 'https', 'tel', 'mailto'}


def strip_anchor(ref: str) -> str:
    return ref.split('#', 1)[0]

for item in REQUIRED:
    assert (ROOT / item).exists(), f'Missing required file: {item}'

for html in HTML_FILES:
    path = ROOT / html
    text = path.read_text(encoding='utf-8')
    assert '</html>' in text.lower(), f'{html} is missing closing html tag'
    parser = LinkParser()
    parser.feed(text)
    for tag, attr, ref in parser.refs:
        clean = strip_anchor(ref)
        if not clean or clean.startswith('#') or is_external(clean):
            continue
        target = (path.parent / clean).resolve()
        assert ROOT in target.parents or target == ROOT, f'{html}: unsafe path {ref}'
        assert target.exists(), f'{html}: broken local {attr} on <{tag}>: {ref}'

print('Static site is ready')
