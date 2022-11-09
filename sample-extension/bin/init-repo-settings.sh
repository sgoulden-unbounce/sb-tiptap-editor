read -p "Please enter in your GitHub username: " ownerName
read -p "Please enter in your repo name: " repoName
read -p "Please enter your Personal Access Token: " accessToken

OWNER_REPO_BRANCH_STATUS=$(curl \
  -H 'Accept: application/vnd.github+json' \
  -H "Authorization: Bearer $accessToken" \
  "https://api.github.com/repos/$ownerName/$repoName/branches/main" \
  --write-out %{http_code} --silent --output /dev/null
  )

if [[ $OWNER_REPO_BRANCH_STATUS == 200 ]]
  then
    RESPONSE=$(curl \
      -X PUT \
      -H 'Accept: application/vnd.github+json' \
      -H "Authorization: Bearer $accessToken" \
      "https://api.github.com/repos/$ownerName/$repoName/branches/main/protection" \
      -d '{"enforce_admins":true,"required_pull_request_reviews":{"dismiss_stale_reviews":false,"require_code_owner_reviews":false,"required_approving_review_count":1},"restrictions":null,"required_status_checks":{"strict":true,"contexts":[]}}' \
      --write-out %{http_code} --silent --output /dev/null
    )
    echo "Your branch update response is $RESPONSE"
  else
    echo "There was an error validating your GitHub username, repository name, Personal Access Token, or that the default branach is 'main'. Please double check your inputs and try again."
    exit 1
fi

VISIBILITY_RESPONSE=$(curl \
  -X PATCH \
  -H 'Accept: application/vnd.github.nebula-preview+json' \
  -H "Authorization: token $accessToken" \
  https://api.github.com/repos/$ownerName/$repoName \
  -d '{"private":"true"}' \
  --write-out %{http_code} --silent --output /dev/null
)

if [[ $VISIBILITY_RESPONSE == 200 ]]
  then
    echo "Your visibility update response is $VISIBILITY_RESPONSE"
    exit 0
  else
    echo "There was an error trying to change the visibility of your repository. Please check your inputs and try again, or manually change the visibility in GitHub."
    exit 1
fi