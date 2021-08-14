#!/bin/sh

#IMPORTANT: incomplete script, DO NOT EXECUTE!!!

#Check if the script is running as root.
if [[ "$EUID" -ne 0 ]]; then 
	echo "Please run as root"
  	exit 1
fi


osName=$(cat /etc/os-release | grep -w ID | cut -d '=' -f 2);
packManager='';
installPackages='';

if [ $osName = "pop" ] || [ $osName = "ubuntu" ] || [ $osName = "debian" ]
then	
	packManager="apt-get";
	packages="python3 nodejs npm pip";
elif [ $osName = "fedora" ]
then
	packManager="dnf";
	packages="python3 nodejs npm pip";

fi


$packManager install $installPackages -y;

cd server
pip install -r requirements.txt
python3 app.py
cd ..
cd client
npm start
