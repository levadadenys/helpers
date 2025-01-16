import subprocess
import re
import argparse

def get_git_log(depth):
    """
    Retrieves git log messages up to the specified depth.
    """
    try:
        result = subprocess.run(
            ["git", "log", f"-n {depth}", "--pretty=format:%H%n%s%n%b---"],
            stdout=subprocess.PIPE,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error retrieving git log: {e}")
        return ""

def parse_conventional_commits(log, repo):
    """
    Parses conventional commits from git log and includes commit hash links.
    """
    changelog_entries = []
    pattern = re.compile(r"(feat|fix|chore|docs|style|refactor|perf|test|ci|build|revert)(\([^)]+\))?: (.+)")

    for entry in log.split("---"):
        lines = entry.strip().split("\n")
        if not lines:
            continue

        commit_hash = lines[0]
        commit_message = "\n".join(lines[1:])

        # Find all conventional commits in the message
        matches = pattern.findall(commit_message)
        for match in matches:
            commit_type = match[0]
            scope = match[1] or ""
            description = match[2]

            # Add commit hash as the link
            commit_link = f" ([{commit_hash[:7]}](https://github.com/{repo}/commit/{commit_hash}))"
            changelog_entries.append(f"- **{commit_type}{scope}**: {description}{commit_link}")

    return changelog_entries

def generate_changelog(entries):
    """
    Generates a formatted changelog.
    """
    changelog = "# Changelog\n\n"
    changelog += "\n".join(entries)
    return changelog

def main():
    parser = argparse.ArgumentParser(description="Generate changelog from git log.")
    parser.add_argument("--depth", type=int, default=10, help="Depth of git log to parse")
    parser.add_argument("--repo", type=str, required=True, help="GitHub repository in the format 'owner/repo'")
    args = parser.parse_args()

    git_log = get_git_log(args.depth)
    if not git_log:
        print("No git log data found.")
        return

    conventional_commits = parse_conventional_commits(git_log, args.repo)
    if conventional_commits:
        changelog = generate_changelog(conventional_commits)
        with open("CHANGELOG.md", "w") as f:
            f.write(changelog)
        print("Changelog has been generated and saved to CHANGELOG.md.")
    else:
        print("No conventional commits found in the specified git log depth.")

if __name__ == "__main__":
    main()