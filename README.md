# Overview

The homework is a way for you to show off your development skills, and also test your ability to learn the basics of a new language and framework that you haven't used before.  We’re looking for your coding style, your ability to understand the requirements and create a functional piece of code as output.  Your project should include installation and run instructions, functional and working code, and an explanation of what the code does in this Readme.  As a deliverable, push your final code to to this repo.

# Requirements

You have been tasked by Acme eCommerce to create a REST API for viewing a product catalog, as well as for submitting orders and viewing order status.  The data can be stored  on a local data store of your choice.  When an order is placed, as well as writing to the local data store, an 'order fulfillment request' must be sent to a Redis server, so that it can be processed by our fulfillment system.

Create a node.js service that monitors for the fulfillment events in redis. You can use any redis functionality to assist in monitoring for the event.  Once the event is triggered and the data retrieved from redis, post the results to a Kinvey datastore via the Kinvey REST API (you can sign up for a free account at https://console.kinvey.com/ and view basic documentation at http://devcenter.kinvey.com/rest/guides/getting-started and http://devcenter.kinvey.com/rest/guides/datastore).  For authentication, use masteresecret credentials for simplicity (http://devcenter.kinvey.com/rest/guides/security#credentials).

You are free to use any frameworks and libraries you want, but please be prepared to reason about your choices.  You are also free to go beyond the scope of this assignment and add additional functionality of your own choosing.

This is meant to be first iteration quality.  It is not expected that you write a production-hardened app, but you should include a list of items that you would work on to make it production-ready.  Special attention, however, should be paid to API design.

Some things to consider:
* Handling errors/failure scenarios
* Testing Strategy
* Performance implications for a high volume of requests
* How to make the app fault-tolerant

Feel free to ask questions to clarify any of the requirements, and have fun with it!

# Installation

## MongoDB
A simple running MongoDB replica is required for this app. You can use an existing/hosted one or follow the instructions bellow to create and setup a replica locally.

### Windows
  1. Install [MongoDB Server](https://www.mongodb.com/download-center/community)
  2. Add *<MONGO_INSTALLATION_PATH>\Server\<VERSION>\bin* folder to PATH system environment variable
  3. Run the configuration [run.bat](../blob/master/scripts/mongodb/run.bat) file (with administrator privileges if required) to create and setup a simple MongodDB replica (Primary, Secondary and Arbiter)

  *Note: Feel free to update the scripts defaults to your preffered dbs locations, ports, replica name etc.*

### Linux / Linux
  1. Install MongoDB on [Linux](https://docs.mongodb.com/manual/administration/install-on-linux)/[macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  2. Make sure mongod and monogo commands are available anywhere in the terminal
  3. Open terminal in [scripts/mongodb folder](../master/scripts/mongodb)
  4. Mark [run.sh](../master/scripts/mongodb/run.sh) as executable
  ```
  #> chmod +x run.sh
  ```
  3. Run the configuration [run.sh](../master/scripts/mongodb/run.sh) file (with sudo if required) to create and setup a simple MongodDB replica (Primary, Secondary and Arbiter)

  *Note: Feel free to update the scripts defaults to your preffered dbs locations, ports, replica name etc.*


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
Install latest LTS [Node.js](https://nodejs.org/en/) (at this point 10.14.1)

## NPM packages
  1. Open terminal in the root folder
  2. Install all npm packages
  ```
  #> npm install
  ```

# Run
  1. Configure application
     1. Open [ecosystem.config.js](../ecosystem.config.js)
     2. Setup the MongoDB, Redis and Kinvey configuration via the Node environment variables in the *env* sections of the two applications
  2. Start the applications
  ```
  #> npm start
  ```
