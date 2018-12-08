SETLOCAL
SET scriptDir=%cd%
SET replicaName=productsCatalogRepl
SET primaryPort=27017
SET primaryService=productsCatalogRepl-Primary
SET secondaryPort=27018
SET secondaryService=productsCatalogRepl-Secondary
SET arbiterPort=27019
SET arbiterService=productsCatalogRepl-Arbiter
SET dbName=productsCatalog

cd ..\...

mkdir data
cd data

mkdir db1
mkdir db2
mkdir db3

mongod --dbpath %cd%\db1 --port %primaryPort% --replSet %replicaName% --install --serviceName %primaryService% --serviceDisplayName %primaryService% --logpath %cd%\%primaryService%.log --logappend

mongod --dbpath %cd%\db2 --port %secondaryPort% --replSet %replicaName% --install --serviceName %secondaryService% --serviceDisplayName %secondaryService% --logpath %cd%\%secondaryService%.log --logappend

mongod --dbpath %cd%\db3 --port %arbiterPort% --replSet %replicaName% --install --serviceName %arbiterService% --serviceDisplayName %arbiterService% --logpath %cd%\%arbiterService%.log --logappend

sc start %primaryService%
sc start %secondaryService%
sc start %arbiterService%

mongo localhost:%primaryPort%/%dbName% %scriptDir%\setup.js




