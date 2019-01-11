# ToKompi

ToKompi is an example online store REST-API project build with express and mongoose

-----------------------
## List of Routes

 authentication routes:



| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /register     | POST      |none  | name:string, email:string, password:string, kota: string | create new  user   | 
| /login| POST | none | email:string, password: string | authenticate user |


User routes:

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /user     | GET        |Token | none | Get all user info (Admins only)     | 
| /user/:id | GET |Token | none |Get single user info (Admins and authenticated users only) |
| /user:id  | DELETE |Token | none |delete a user (Admins only)     |
| /user:id  | PUT |Token | name:string, email:string, password:string, kota: string |update user info  (Admins and authenticated users only)    |
| /user:id  | POST |Token | name:string, email:string, password:string, kota: string |create new user|




cart routes:

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /user/cart/item_id    | GET        |Token | none | Get user cart  (authenticated user only)  | 
| /user/cart/item_id    | POST       |Token | items: Object| Create cart (authenticated user only)  | 
| /user/cart    | UPDATE     |Token | UserId: ObjectId, items: ObjectId  | Update transaction info (admin only)     |
| /user/cart/item_id    | DELETE      |Token | none | Delete cart (authenticated user only)     | 


transaction routes:

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /transaction   | GET        |Token | none | Get all transaction  (admin only) | 
| /transaction    | POST       |Token | UserId: ObjectId, items: ObjectId | checkout transaction    | 
| /transaction:id    | UPDATE     |Token | UserId: ObjectId, items: ObjectId  | Update transaction info (admin only)     |
| /transaction:id    | DELETE      |Token | | Delete transaction |



item routes:

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /item   | GET        |Token | none | Get all item | 
| /item    | POST       |Token | UserId: ObjectId, items: ObjectId | create item (admin only)   | 
| /item:id    | UPDATE     |Token | UserId: ObjectId, items: ObjectId  | Update item info (admin only)     |
| /item:id    | DELETE      |Token | | Delete item (admin only) |

-------------------------------
## 3RD Party API USED

list of 3rd party API USED

```
RajaOngkir:
https://api.rajaongkir.com/

Google-Captcha: https://www.google.com/recaptcha

https://currencylayer.com/ (CURRENCY CONVERTER)


```


