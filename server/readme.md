# REST-api for Angular course in SoftUni

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://localhost:3001/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "REST-api for back-end of Angular course workshop in SoftUni",
    "main": "index.js",
}
```

If your response looks slightly different don't panic. This is probably because more data has been added to the API since I made this documentation.

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:3001/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/register``` -- signing up;
* ```/login``` -- signing in;
* ```/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/register```

### Method --> ```POST```

### Body -->

```
{
    "username":"John",
    "email":"john@email.com",
    "username":"Johny",
    "age":23
    "password":"12345",
    "rePassword":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```age``` : [number] -- The age of the person is required, also there is a minimum value of 1 and maximum value of 105;

Not Required

```imageUrl``` : [string] -- the client adds default profile picture ;

### Success Response:

Code: 200

Content: 
``` 
{
    "movies": [],
    "_id": "5f1875690916010017964978",
    "email": "john@email.com",
    "username": "John",
    "age": 23,
    "imageUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/login```

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "movies": [],
    "_id": "5f1875690916010017964978",
    "email": "john@email.com",
    "username": "John",
    "age": 23,
    "imageUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: Movies

* ```/movies```
* ```/movie-details/:movieId```

## Get Movies
Returns all Movies4 as json.

### URL --> ```/```

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "comments": [],
        "_id": "64ad048d38e5ad0bc4ef27d8",
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "ownerId": "64acf0cd87cc0b3b002886c6",
        "created_at": "2023-07-11T07:28:13.118Z",
        "updatedAt": "2023-07-11T07:28:13.118Z",
        "__v": 0
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Get Movie
Returns a single movie as json.

### URL --> ```/movie-details/:movieId

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
    {
        "comments": [],
        "_id": "64ad048d38e5ad0bc4ef27d8",
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "ownerId": "64acf0cd87cc0b3b002886c6",
        "created_at": "2023-07-11T07:28:13.118Z",
        "updatedAt": "2023-07-11T07:28:13.118Z",
        "__v": 0
    }
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```


## Post Movie
Creates new Movie and returns the movie as json.

### URL --> ```/```

### Method --> ```POST```

### Body -->

```{
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
    }
```

Required:

```title``` : [string] -- The Title of your new Movie, which you want to create.
```director``` : [string] -- The director of the Movie.
```genre``` : [string] -- The genre of the Movie.
```year``` : [number] -- The year, the Movie was released.
```imageUrl``` : [string] -- Image Url of the Movie.
```plot``` : [string] -- The plot of the Movie.

### Success Response:

Code: 200

Content: 
``` 
{
        "comments": [],
        "_id": "64ad048d38e5ad0bc4ef27d8",
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "ownerId": "64acf0cd87cc0b3b002886c6",
        "created_at": "2023-07-11T07:28:13.118Z",
        "updatedAt": "2023-07-11T07:28:13.118Z",
        "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Create Comment
Creates new Comment for Movie returns the movie as json.

### URL --> ```/:movieId/comments```

### Method --> ```POST```

### Body -->

```
{
            "text": "Nice movie"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
            "_id": "64acfb80cec1db4734183a67",
            "text": "Nice movie",
            "userId": "64acf0cd87cc0b3b002886c6",
            "movieId": "64acf1df87cc0b3b002886c8",
            "created_at": "2023-07-11T06:49:36.075Z",
            "updatedAt": "2023-07-11T06:49:36.075Z",
            "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

# Endpoints: Edit Movie

Edit already created Movie and returns the movie as json. The user must be the creator of the Movie.

### URL --> ```/:movieId/edit```

### Method --> ```POST```

### Body -->

```{
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
    }
```

Required:

```title``` : [string] -- The Title of your new Movie, which you want to create.
```director``` : [string] -- The director of the Movie.
```genre``` : [string] -- The genre of the Movie.
```year``` : [number] -- The year, the Movie was released.
```imageUrl``` : [string] -- Image Url of the Movie.
```plot``` : [string] -- The plot of the Movie.

### Success Response:

Code: 200

Content: 
``` 
{
        "comments": [],
        "_id": "64ad048d38e5ad0bc4ef27d8",
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "ownerId": "64acf0cd87cc0b3b002886c6",
        "created_at": "2023-07-11T07:28:13.118Z",
        "updatedAt": "2023-07-11T07:28:13.118Z",
        "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Delete Movie
Deletes Movie if the user is the author of the Movie and returns the deleted Movie.

### URL --> ```/:movieId/delete```

### Method --> ```DELETE```

### Success Response:

Code: 200

Content: 
``` 
{
        "comments": [],
        "_id": "64ad048d38e5ad0bc4ef27d8",
        "title": "The Terminator",
        "director": "James Cameron",
        "genre": "Action",
        "year": 1984,
        "imageUrl": "https://resizing.flixster.com/4QRPo96rNUmXp8lA2LqMBfZBvMQ=/300x300/v2/https://flxt.tmsimg.com/assets/p7764_i_h9_ad.jpg",
        "plot": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
        "ownerId": "64acf0cd87cc0b3b002886c6",
        "created_at": "2023-07-11T07:28:13.118Z",
        "updatedAt": "2023-07-11T07:28:13.118Z",
        "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

