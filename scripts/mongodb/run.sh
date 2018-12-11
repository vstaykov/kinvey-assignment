SCRIPT_DIR=$(pwd)
REPLICA_NAME="productsCatalogRepl"
PRIMARY_PORT="27017"
PRIMARY_LOG_FILE="productsCatalogRepl-Primary.log"
SECONDARY_PORT="27018"
SECONDARY_LOG_FILE="productsCatalogRepl-Secondary.log"
ARBITER_PORT="27019"
ARBITER_LOG_FILE="productsCatalogRepl-Arbiter.log"
DB_NAME="productsCatalog"

cd ../..

mkdir data
cd data

mkdir db1
mkdir db2
mkdir db3

DATA_DIR=$(pwd)

mongod --dbpath $DATA_DIR/db1 --port $PRIMARY_PORT --replSet $REPLICA_NAME --fork --logpath $DATA_DIR/$PRIMARY_LOG_FILE --logappend

mongod --dbpath $DATA_DIR/db2 --port $SECONDARY_PORT --replSet $REPLICA_NAME --fork --logpath $DATA_DIR/$SECONDARY_LOG_FILE --logappend

mongod --dbpath $DATA_DIR/db3 --port $ARBITER_PORT --replSet $REPLICA_NAME --fork --logpath $DATA_DIR/$ARBITER_LOG_FILE --logappend

mongo localhost:$PRIMARY_PORT/$DB_NAME $SCRIPT_DIR/setup.js
