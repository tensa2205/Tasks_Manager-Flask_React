## How to run flask.
> - In order to run Flask, you must have Python, Pip, XAMPP, a virtual environment with all dependencies installed. I recommend Python 3.8.10 because that's the one i'm using.

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
    ```bash
    python --version or python3 --version
    ```
 2. Install Python
    - On Debian derivatives, like Ubuntu
      ```bash
      sudo apt-get install Python3.8.10
      ```
    - On SUSE and derivatives
      ```bash
      sudo zypper install python3-3.8
      ```
 3. Verify that Python installed correctly, running the following command
    ```bash
    python3 --version
    ```
   

### XAMPP installation
 **Windows users**
 - Download from the following [link](https://www.apachefriends.org/download.html) and install.

 **MacOS users**
 - Download from the following [link](https://www.apachefriends.org/download.html) and install.

 **Linux users**
 1. Download from the following [link](https://www.apachefriends.org/download.html).
 2. Move to Downloads folder by using the following command:
      ```bash
      cd /home/[username]/Downloads
      ```
 3. Add permissions to the package to make it executable
      ```bash
      chmod 755 [package name]
      ```
 4. Launch the setup wizard as root
      ```bash
      sudo ./[package name]
      ```
 5. Go through the graphical setup to install.

 ### PIP installation
 **Windows users**
  1. Launch a command prompt
  2. Run the following command to download the get-pip.py file
     ```bash
     curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
     ```
  3. Type the following command
     ```bash
     python get-pip.py
     ```
  4. Verify installation using the following command that gives us the location of the package and a list of commands we can use.
      ```bash
      pip help
      ```

**MacOS users**
  1. Open the command prompt
  2. Run the following command
     ```bash
     sudo easy_install pip
      ```
**Linux users**
  - Debian/Ubuntu
    - Python2
      ```bash
      sudo apt install python-pip
      ```
    - Python3
      ```bash
      sudo apt install python3-pip
      ```
  - SUSE
    ```bash
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    ```
    ```bash
    python get-pip.py
    ```
### Virtualenv installation
**Windows users**
- On the command prompt
   ```bash
   py -m install --user virtualenv
   ```
**Linux/macOS users**
- on the command prompt
   ```bash
   python3 -m pip install --user virtualenv
   ```

### Installing all required packages
1. Create a virtual environment
  - Windows
      ```bash
      py -m venv env
      ``` 
   - Linux/macOS
      ```bash
      python3 -m venv env
      ```
     **Second argument is the location to create the virtual environment**
2. Activate virtual environment
  - Windows
      ``` bash
      .\env\Scripts\activate
      ```
  - Linux/macOS
      ```bash
      source env/bin/activate
      ```
3. Go to the serverSide folder of the repository
4. Execute the command
      ```bash 
      pip install -r requirements.txt
      ```
5. Run the app.py program
      ```bash
      python3 app.py
      ``` 

