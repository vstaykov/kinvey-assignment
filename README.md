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
Follow the [installation instructions](../master/docs/INSTALLATION.md) to setup all prerequisites.

# Run
  1. Configure application
     1. Open [ecosystem.config.js](../master/ecosystem.config.js)
     2. Setup the MongoDB, Redis and Kinvey configuration via the Node environment variables in the *env* sections of the two applications
     > *Note:* Update instances depending on the CPU of your system. If it has only 1 core - change instances to 1
  2. Start the applications
  ```
  #> npm start
  ```

# Details
The functionality of this app is separated into two services. The goal of this is improved separation of concernes and robustness:
  * **Product catalog REST API** - viewing a product catalog, submitting orders and order fulfillment requests and viewing order status
  * **Orders fulfillment monitoring** - monitoring for order fulfillment events in Redis and writing the provided data into Kinvey data store

## General Info

#### Configuration
API, local DB, Redis and Kinvey connections can be configured via Node environment variables. You can easily alter the configuration by providing values to these variables in the [ecosystem.config.js](../master/ecosystem.config.js).

#### Local storage
MongoDB replica set is used for storing products and orders. It is a simple replica set with primary, secondary and arbiter servers. In case the primary is not available for any reason the application would switch to the secondary until the first is available again. In addition, indexes on ```product.keywords``` and ```product.category``` are created for better search and retrieve performance.

#### Process management
PM2 and Node.js clustering is used to properly manage app processes. By default, one orders fulfillment monitoring instance and two API instances are created. PM2 handles load balancing and process restarts due to failure or other reason thus improving performance and minimizing down time.

Default PM2 processes logs names and locations can be configured in the [ecosystem.config.js](../master/ecosystem.config.js).

## Product catalog REST API
The REST API provieds two main endpoints -```/products``` and ```/orders```.

  * [```/products``` API](../master/docs/PRODUCTS_API.md)
  * [```/orders``` API](../master/docs/ORDERS_API.md)

#### Order fulfillment requests submission
A MongoDB change stream is used to monitor the local db for newly created orders. When an order is inserted, the order data is sent to a Redis server for further processing by a "fulfillment system" - added to a LIST in a specific key (a contract with the "fulfillment system").

#### Load balancing
PM2 and Node.js clustering are used to start two (configurable in the [ecosystem.config.js](../master/ecosystem.config.js)) API instances sharing the same port. This would improve performance and enable handling high volume requests.

#### Logging
API failed requests 4xx and 5xx are logged in a log file. The file name and location can be easily configured in the [ecosystem.config.js](../master/ecosystem.config.js).

## Order fulfillment monitoring
The order fulfillment monitoring monitors Redis for order fulfillment events and sends the fulfillment data to a dedicated Kinvey data store.

#### Redis monitoring
The Redis keyspace notifications functionallity is used to recieve events about insertion in a list in a specific Redis key (a contract with the "fulfillment system").

#### Kinvey data store
When an item is inserted to the Redis list it is popped, retrieved and stored in a Kinvey data store.

# Development Notes

## Test data
For testing purposes, you can run ```mongo <PRIMARY_SERVER_URL> ./scripts/mongodb/add-test-products.js``` to populate some test products. Just make sure the db name in [add-test-products.js](../master/scripts/mongodb/add-test-products.js) matches the one you use.

## Best Practices
I have tried to follow all best practices for code structure and formatting, naming conventions, RESTful API design etc. Some development aspects do not have established best practices and the approach followed is based on my personal thoughts, e.g:
  * files naming convention
  * unit tests location

## Testing
As the technologies used are fairly new to me and having in mind the time frame - I have decided to start with the implementation and then covering with unit tests. Not all parts are covered with tests but I tried to show testing different components - utility code, API routes.

## TODO
The following aspects of the project can be further implemented or improved:
  * Implement products API sorting
  * Implement products API compression
  * Implement products API caching strategy
  * Cover the whole codebase with unit tests
  * Log performance and errors in cloud based solution for LIVE monitoring
  * Research build and minification application

