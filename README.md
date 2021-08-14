# ToDo-list application using Flask and React

Hi! in order to have everything you need to launch this project you need to read the instructions in the two existing README.md in client and serverSide folder.

The following instructions are merely to run both backend and frontend of the application.

**IMPORTANT: Flask-API runs on port 5000 and React runs on port 3000**

### Run xampp servers on Linux
sudo /opt/lampp/lampp start

### On windows/MacOS
Start all in the Xampp panel control

### Start react
Once you got NodeJS and npm. Go to client folder and run the following command:
```bash
npm start
```
- This is going to open a new tab your default navigator with the React app.

**If something went wrong: *try npm install* and again npm start**

### Start Flask
Once you create a your virtual environment, installed all dependencies and activate your new virtual environment (specified in the README.md of the serverSide folder).

Run the following command :
```bash
python3 app.py
```
- or if you are on the root folder of the project
```bash
python3 serverSide/app.py
```


