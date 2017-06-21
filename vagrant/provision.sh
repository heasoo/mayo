#!/usr/bin/env bash

sudo locale-gen "en_CA.UTF-8"

if type node &>/dev/null; then
	echo "Node.js is already installed."
else
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -k
fi

if type psql &>/dev/null; then
	echo "PostgreSQL is already installed."
else
	# Credit: http://www.dbrnd.com/2017/01/postgresql-how-to-install-postgresql-9-6-on-ubuntu-16-04/
	sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
	wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

	sudo apt-get update -qq
	sudo apt-get install -qq postgresql-9.6

	# Credit: https://github.com/laravel/settler/blob/master/scripts/provision.sh#L203
	sudo -u postgres psql -c "CREATE ROLE mayo LOGIN UNENCRYPTED PASSWORD 'mayo' SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;"
	sudo -u postgres /usr/bin/createdb --echo --owner=mayo mayo
fi

sudo apt-get update -qq
sudo apt-get install -qq -y nodejs build-essential postgresql-9.6

sudo npm -g install knex gulp

cd /vagrant
npm install --no-bin-links

#knex migrate:latest