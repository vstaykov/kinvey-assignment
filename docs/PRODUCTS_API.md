### Retrieve products

##### Request
> GET /products

##### Response
```
HTTP/1.1 200 OK
Content-Type: application/json

<JSON-Document-representing-Products>

*Note:* Return products has only *name*, *image*, *price* and *category* properties
```

###### Modifiers
Modifier | Description
--- | ---
```keywords``` | Return products that contain the specified keywords
```category``` | Return products from the specified category
```minPrice``` | Return products with price greater than or equal to the specified
```maxPrice``` | Return products with price less than or equal to the specified

##### Pagination
The returned response would contain max 100 products. For more products you can use ```offset``` and ```limit``` parameters to paginate the results.

```offset```
  * default value is 0
  * if offset is more than the available results - empty list is returned

```limit```
  * default value is 100
  * max value is 100
  * if limit is more than the available results - all of them are returned


### Retrieve categories

##### Request
> GET /products/categories

##### Response
```
HTTP/1.1 200 OK
Content-Type: application/json

<JSON-Document-representing-Categories>
```

### Retrieve product

##### Request
> GET /products/{id}

##### Response
###### Success
```
HTTP/1.1 200 OK
Content-Type: application/json

<JSON-Document-representing-Product>
```

###### Invalid ID
```
HTTP/1.1 400 Bad Request
Content-Type: application/json

Invalid id: <ID>
```

###### Missing product
```
HTTP/1.1 404 Not Found
Content-Type: application/json

Product with ID <ID> does not exist
```


