# Assignment submission checklist

## Part 1 — GitHub UI (12 points)

Required files are prepared locally. Commit and push them to the public `main` branch before submitting these URLs. Public visibility and remote publication have not been verified.

| Task | Points | URL to submit after publication |
| --- | --- | --- |
| 1. Project README | 4 | https://github.com/swayam-8/simple-calculator-intrest-/blob/main/README.md |
| 2. Apache 2.0 LICENSE | 2 | https://github.com/swayam-8/simple-calculator-intrest-/blob/main/LICENSE |
| 3. Code of Conduct | 2 | https://github.com/swayam-8/simple-calculator-intrest-/blob/main/CODE_OF_CONDUCT.md |
| 4. Contributing | 2 | https://github.com/swayam-8/simple-calculator-intrest-/blob/main/CONTRIBUTING.md |
| 5. Bash calculator | 2 | https://github.com/swayam-8/simple-calculator-intrest-/blob/main/simple-interest.sh |

## Part 2 — Git CLI (8 points)

These tasks require a **real GitHub fork** of
`ibm-developer-skills-network/mcino-Introduction-to-Git-and-GitHub`.
The simple-calculator-intrest- repository is not established as that fork.
A Git clone alone does not establish a GitHub fork relationship.

Follow the course lab in that fork. Capture the actual commands and complete output; do not submit sample or fabricated output. GitHub API access is blocked by this environment's current network policy. Git read access to the course repository succeeded, but API authentication is not yet verified.

### Task 6 — `forked-repo`

Create the fork with GitHub's Fork button. Then run and capture this read-only request, substituting your fork owner:

```sh
curl --fail-with-body --silent --show-error \
  -H 'Accept: application/vnd.github+json' \
  'https://api.github.com/repos/YOUR_USERNAME/mcino-Introduction-to-Git-and-GitHub'
```

Save both the command and its actual terminal output in `forked-repo`. The response must show `fork: true` and the required course repository in `parent.full_name`. If anonymous access is unavailable, use supported authenticated GitHub access; do not put tokens in evidence files.

### Task 7 — `merge_branches`

Clone your actual fork. Follow the lab's specified typo fix on `bug-fix-typo` and commit it. Capture the real output of:

```sh
git checkout main
git merge bug-fix-typo
```

Save the command transcript in `merge_branches`. Confirm the merge actually reports one changed file. Do not merge the unrelated calculator project into the course repository.

### Task 8 — `bug-fix-revert`

Follow the lab's revert steps, push the resulting branch to your fork, and create the required pull request. Do not guess the target branch; use the lab's instructions. Retrieve the actual pull request with:

```sh
curl --fail-with-body --silent --show-error \
  -H 'Accept: application/vnd.github+json' \
  'https://api.github.com/repos/BASE_OWNER/BASE_REPOSITORY/pulls/ACTUAL_PR_NUMBER'
```

Save the command and actual output in `bug-fix-revert`. Verify the response identifies the pull request and its fork under `head.repo.full_name`.

### Task 9 — `github-branches`

In the course fork checkout, run `git fetch origin`, then capture `git branch -avv` in `github-branches`. This lists local/remote branch names and tracking status. The screenshot cuts off the end of Task 9; check the full lab instructions for any additional required command or exact expected branches.

None of the four Part 2 evidence files is claimed as complete. Generate them only after the corresponding operations really succeed.
