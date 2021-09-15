
# Restaurant Api

This is a simple restaurant API built on Express, Node and MongoDb.
All time referred in this API is in minutes. With no authentication.

## Installation

Install project with npm.
Enter MongoDB URL in variable mongoAtlasUri in index.js

```bash
  npm install 
  node index.js
```
    
## API Reference

#### ADD User

```http
  POST /user
  ```
  ```
  Request body eg : 
  {
    "name":"Shivam",
    "email":"shivam.b@gmail.com",
    "password":"hey"
  }
```


#### ADD Restaurant as Owner

```http
  POST /restaurant
  ```
  ```
  Request body eg : 
  {
    "name": "StarBucks",
    "desc": "Welcome to Starbucks",
    "location":"CP, Delhi",
    "owener_id":"613fd51c241e857cb32cb6a3",
    "working_hrs": {
        "sunday": {
            "start": 480,
            "end": 1320
        },
        "monday": {
            "start": 480,
            "end": 1260
        },
        "tuesday": {
           "start": 480,
            "end": 1260
        },
        "wednesday": {
            "start": 480,
            "end": 1260
        },
        "thursday": {
            "start": 480,
            "end": 1260
        },
        "friday": {
           "start": 480,
            "end": 1260
        },
        "saturday": {
            "start": 480,
            "end": 1260
        }
    }
  }
- Enter User ID of Owner in owener_id
```

#### ADD Table as Owner

```http
  POST /table
  ```
  ```
  Request body eg : 
  {
    "restaurant_id":"613fd604ff3154970201c842",
    "capacity":100
  }
- Enter Restaurant ID in restaurant_id
```

#### Book a Table as a user

```http
  POST /book
  ```
  ```
  Request body eg : 
  {
    "user_id": "1",
    "restaurant_id": "613fd604ff3154970201c842",
    "day" : "sunday",
    "capacity":1000,
    "start": 480,
    "end": 900
}
- Enter Restaurant ID in restaurant_id and User ID in user_id
```

#### Get User Details

```http
  GET /user/userid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `string` | **Required**. User ID|

#### Get User Bookings

```http
  GET /user/bookings/userid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `string` | **Required**. User ID|


#### Get Booking Details

```http
  GET /bookings/bookingid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `bookingid` | `string` | **Required**. Booking ID|

#### Get Restaurants of a user(Owner)

```http
  GET /user/restaurants/userid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userid` | `string` | **Required**. User ID|

#### Get Restaurant Details

```http
  GET /restaurant/restaurantid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `restaurantid` | `string` | **Required**. Restaurant ID|