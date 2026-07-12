param(
  [string]$Message = "Portfolio improvements"
)

git add .
git commit -m $Message
git push
