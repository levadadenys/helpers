# Generate Changelog function

This function checks the git log of the repository your terminal is currently opened in, takes 2 arguments - number of commits to check and repository owner/name.

Checks git log for conventional commits, generates Changelog.md with all conventional commits it will be able to find with links to corresponding commits. Also this script is able to find conventional commits in squash merged PRs if conventional commits were listed in squash merge commit message.