# Installation

## MongoDB
A simple running MongoDB replica set is required for this app. You can use an existing/hosted one or follow the instructions bellow to create and setup a replica set locally. If you use and existing one please do not forget to create indexes on ```product.keywords``` and ```product.category``` as described in the end of [stup.js](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/setup.js).

You can alter the db setup details (replica set name, servers urls and ports, db name etc.) in ([stup.js](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/setup.js) to match your preferences prior following the instructions bellow.

### Windows
> *Note: Feel free to update the db setup defaults (replica set name, servers urls and ports, db name etc.) in [run.bat](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/run.bat) and [stup.js](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/setup.js) to match your preferences prior following the instructions bellow.*
  1. Install [MongoDB Server](https://www.mongodb.com/download-center/community)
  2. Add *<MONGO_INSTALLATION_PATH>\Server\<VERSION>\bin* folder to PATH system environment variable
  3. Run the configuration [run.bat](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/run.bat) file (with administrator privileges if required) to create and setup a simple MongodDB replica set (Primary, Secondary and Arbiter)

### Linux / Linux
> *Note: Feel free to update the db setup defaults (replica set name, servers urls and ports, db name etc.) in [run.sh](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/run.sh) and [stup.js](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/setup.js) to match your preferences prior following the instructions bellow.*
  1. Install MongoDB on [Linux](https://docs.mongodb.com/manual/administration/install-on-linux)/[macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  2. Make sure mongod and monogo commands are available anywhere in the terminal
  3. Open terminal in [scripts/mongodb folder](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb)
  4. Mark [run.sh](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/run.sh) as executable
  ```
  #> chmod +x run.sh
  ```
  3. Run the configuration [run.sh](https://github.com/vstaykov/kinvey-assignment/blob/master/scripts/mongodb/run.sh) file (with sudo if required) to create and setup a simple MongodDB replica set (Primary, Secondary and Arbiter)

## Redis
A simple running Redis server is required for this app. You can use an existing/hosted one or follow the instructions bellow to create and run a server locally.

### Windows
  1. Install [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
  2. Run Redis container and expose the Redis container listening port (6379) to a port on your machine *local_machine_port:redis_container_port*
  ```
  #> docker run -d -p 6379:6379 --name redis-server redis
  ```

### Linux
  1. Install Redis
  2. Run Redis server

## NodeJS
Install latest LTS [Node.js](https://nodejs.org/en/) (at this point 10.14.1).

## NPM packages
  1. Open terminal in the root folder
  2. Install all npm packages
  ```
  #> npm install
  ```
