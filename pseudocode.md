1. server side call to database
2. build html template and make a get request from ex: api/groceries
   a. make an ajax call off the api

GET - SELECT
POST - INSERT
PUT - UPDATE
DELETE - DELETE

When you click:

1. app.put("api/groceries/id", function() {
   UPDATE quantity WHERE ? = ?
   // decrease the quantity by 1
   })

2. app.get("api/cart-items")

every user can have a cart table
each time they click on an item they are INSERTing items into their database
each time they delete item they are removing rows from their table
"HAS AND BELONGS TO MANY RELATIONSHIP"

a table of carts
a table of groceries
need a table in between to connect them
