### Retrieve order status

##### Request
> GET /orders/{id}/status

##### Response
###### Success
```
HTTP/1.1 200 OK
Content-Type: application/json

<JSON-Document-representing-Order-Status>
```

###### Invalid ID
```
HTTP/1.1 400 Bad Request
Content-Type: application/json

Invalid id: <ID>
```

###### Missing order
```
HTTP/1.1 404 Not Found
Content-Type: application/json

Order with ID <ID> does not exist
```

### Create order

##### Request
> POST /orders
> Content-Type: application/json
>
> <JSON-Document-representing-Order>

##### Response
```
HTTP/1.1 201 Created
Content-Type: application/json

<JSON-Document-representing-created-Order>
```

