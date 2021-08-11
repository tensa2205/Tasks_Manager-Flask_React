## How to run the project.
> In order to run the project, you must have Python and Pip. I recommend Python 3.8.10 because that's the one i'm using.

### Python installation
**Windows and MacOS users**

*Windows*
 > Download and execute Windows installer (32-bit or 64-bit).

 *MacOS*
 > Download and execute either *macOS 64-bit Intel installer* or *macOS 64-bit universal2 installer*.

 *Link*
 > [Python 3.8.10](https://www.python.org/downloads/release/python-3810/)

 **Linux users**
 1. Determine whether Python is already installed
    > python --version' **or** 'python3 --version
 2. Install Python
    - On Debian derivatives, like Ubuntu
      > sudo apt-get install Python3.8.10
    - On SUSE and derivatives
      > sudo zypper install python3-3.8
 3. Verify that Python installed correctly, running the following command
    > python3 --version

 ### PIP installation
 **Windows users**
  1. Launch a command prompt
  2. Run the following command to download the get-pip.py file
     > curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
  3. Type the following command
     > python get-pip.py
  4. Verify installation using the following command that gives us the location of the package and a list of commands we can use.
     > pip help

**MacOS users**
  1. Open the command prompt
  2. Run the following command
     > sudo easy_install pip

**Linux users**
  - Debian/Ubuntu
    - Python2
      > sudo apt install python-pip
      
    - Python3
      > sudo apt install python3-pip
      
  - SUSE
    - curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    - python get-pip.py

### Installing all required packages
  1. Go to the root folder of the repository
  2. Execute the command
     > pip install -r requirements.txt
  3. Run the app.py program
     > python serverSide/app.py 

