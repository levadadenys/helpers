import os
import re
import sys

def clean_facilitator_bio_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove heading with name (## Name) and email ([...](mailto:...))
    content = re.sub(
        r'^##\s*.+\n(?:\s*\[.*?\]\(mailto[: ]?.*?\)\n)?\n*',
        '',
        content,
        flags=re.MULTILINE
    )
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Cleaned: {filepath}")

def main():
    if len(sys.argv) > 1:
        directory = sys.argv[1]
    else:
        directory = os.path.dirname(os.path.abspath(__file__))

    if not os.path.isdir(directory):
        print(f"❌ Provided path is not a directory: {directory}")
        return

    for filename in os.listdir(directory):
        if filename.endswith('_bio.md'):
            filepath = os.path.join(directory, filename)
            clean_facilitator_bio_file(filepath)

if __name__ == '__main__':
    main()