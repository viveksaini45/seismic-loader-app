Step 1 : Download the package from github as a zip using your broser or clone the package using git.
Step 2: Navigate into the directory “seismic-loader-app-main”. Open terminal and type the command npm install. This command would instal all the dependencies
Step 3: Type command node tus-upload-server.js . This will start the tus file uploader server which would be internally used by our application. It runs on port 1080. No need to access it manually.
Step 4 : Open another terminal and navigate to the same directory as above. Type command node server.js This command will start our main application which is running on port 3000.
Step 5: Open any browser, preferably Firefox or Chrome. In the address box, type the address  localhost:3000. This will open the application .You can test the file upload from here.
