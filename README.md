# Financial-Tool
From VS Code

Must run from root folder (Financial Tool):
1. parcel build .\src\index.html --out-file index.html --public-url ./
This packages everything up together pulling from index.html from the src folder, creates the index.html output file, adds a little "./" extension to the url

2. git add .
This adds all the files from the parent directory (Financial-Tool) to the relevant git repository-puts them in "git mode"

3. git commit -m "fixed parcel link issue2"
This commits the changes to the files to git, and adds a comment to that commit for tracking purposes.  This is now visible on the github website under commits

4. git push
This pushes all the changes up and totally rebuilds the website??

Need to make sure you do hard refresh of the browser when reloading the page, as the browser will have cached old versions of the files
