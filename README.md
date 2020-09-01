# Financial-Tool

Current process for making changes and committing them to Github src folder
In VS Code
1. Click on "master" branch in bottom left corner.  Click "Create New Branch From" and create a new branch with a meaningful name.  Choose master as the "from" branch
2. Make whatever changes are necessary
3. Save changes (CTRL S in VS Code)
4. Use parcel index.html (from src folder, not from root Financial Tool folder) to compile them and test them with localhost:1234.  This will create a bunch of changes to parcel files in the Changes/Source Control window in VS Code
5. Shut down parcel test server
6. Stage only the changes to the actual files that were edited (not the parcel files)
7. Commit Staged (from VS Code Source Control drop down) and add a relevant message
8. Go to Github window in VS Code and Create new Pull Request.  Choose Master as target branch and previously created/named feature branch as "upstream" branch.  For pull request title, can choose last commit message, branch name, or add a new PR name
9. Pull Request tab opens.  Can review changes in Github if needed.  Click Merge Pull Request in VS Code, then Create Merge Commit.  If prompted about uncommitted changes on PR branch, click Yes to proceed.  These are the parcel file changes which don't need to be committed
10. Delete branch.  Delete both copies of the branch (local and remote)

To push these changes to be visible/usable from Github pages website
From VS Code terminal.  First make sure the local master branch is synced with the remote branch (Might be numbers next to up/down arrows in the bottom right corner)
Must run these commands from root folder (Financial Tool):
1. parcel build .\src\index.html --out-file index.html --public-url ./
This packages everything up together pulling from index.html from the src folder, creates the index.html output file, adds a little "./" extension to the url

2. git add .
This adds all the files from the parent directory (Financial-Tool) to the relevant git repository-puts them in "git mode"

3. git commit -m "fixed parcel link issue2"
This commits the changes to the files to git, and adds a comment to that commit for tracking purposes.  This is now visible on the github website under commits

4. git push
This pushes all the changes up and totally rebuilds the website??

Need to make sure you do hard refresh of the browser when reloading the page, as the browser will have cached old versions of the files
