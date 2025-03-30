import os
import argparse

def replace_string_in_file(file_path, old_string, new_string):
    """
    Reads a file, replaces occurrences of old_string with new_string, and writes back the changes.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        if old_string in content:
            new_content = content.replace(old_string, new_string)
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(new_content)
            print(f"Updated: {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def find_and_replace(root_dir, old_string, new_string):
    """
    Walks through the directory, finds .js, .jsx, .ts, .tsx files, and replaces the given string.
    """
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude build and node_modules directories
        dirnames[:] = [d for d in dirnames if d not in {"build", "node_modules"}]

        for filename in filenames:
            if filename.endswith((".js", ".jsx", ".ts", ".tsx")):
                file_path = os.path.join(dirpath, filename)
                replace_string_in_file(file_path, old_string, new_string)

def main():
    parser = argparse.ArgumentParser(description="Replace a string in all JS/TS files in the project.")
    parser.add_argument("old_string", type=str, help="The string to be replaced.")
    parser.add_argument("new_string", type=str, help="The replacement string.")

    args = parser.parse_args()

    root_dir = os.getcwd()  # Current working directory
    find_and_replace(root_dir, args.old_string, args.new_string)

if __name__ == "__main__":
    main()