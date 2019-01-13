Please note, the following setup steps are verified on MacOS - some commands may differ for other environments.

1 - Clone git repository to get all files
2 - In terminal / command line, navigate to the cloned project repository
3 - Run npm install to install all npm packages required...
    - In terminal / command line, enter "npm install" (this may take a little while)
4 - Run the MongoDB server...
    - In terminal / command line, enter "mongod"
    - This is a process that must be left running - leave it running and open a new terminal window
5 - Seed the database...
    - In terminal / command line, enter "mongo < server/db/seeds.js" (this may take a while to run)
6 - Run webpack...
    - In terminal / command line, enter "npm run build"
    - This is a process that must be left running - leave it running and open a new terminal window
7 - Run express server...
    - In terminal / command line, enter "npm run server:dev"
    - This is a process that must be left running - leave it running and open a new terminal window
8 - In your web browser, go to the address: "localhost:3000/"
9 - You will now be running the web app in your browser!

############
DEPENDENCIES
############

The following tools must be installed in order to open this project:

1 - Node.js - Installers available here: https://nodejs.org/en/download/

2 - MongoDB - Installer available here: https://www.mongodb.com/download-center/community
    - (Or from the command line, using homebrew, follow this guide: https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
