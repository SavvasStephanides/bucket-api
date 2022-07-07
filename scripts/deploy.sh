cd bucket
git config --global user.email "savvascyp@hotmail.com"
git config --global user.name "SavvasStephanides"
git status
git add -A
git commit -m "🤖 [Automated deploy via Bucket API] $(date '+%d-%m-%Y %H:%M:%S')"
git push --all -f https://${GITHUB_TOKEN}@github.com/SavvasStephanides/bucket.git
