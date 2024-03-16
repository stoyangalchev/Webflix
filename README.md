
# Webflix

Webflix is a Single Page Application about sharing favorite movies and comment it.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The application will automatically reload if you change any of the source files.

# Server

Run `npm start` for starting REST-api server.
The application uses REST-api for Angular course in SoftUni.
For more information read the README.md in folder "server".

## Home page

Dynamic page with welcome, short description of the Application and 3 recent movies added.

## Movies page

Movie page is the collection of all created movies by the users. Contains breef information
about every movie and a Details button for more information about the chosen movie.

## Login page

Guest can login with username and password.

## Register page

Guest can register with username, email, age and password. Required to repeat the password for validation.

## About Page
Instruction to use the Application .

## Add Movie page

It's only accessible for Registered users. They can add movie thrue input fields. All fields are required!

## Details page

Accessible both guests and register users. Guest can only see details of the movie and movie comments.
Register users can posts comments. Register user and owner of the created movie can Edit and Delete the movie.

## Edit page

Only Registed users and owners of the movie can edit the information about the movie.

## Logout

Logged users can logout from their session.
