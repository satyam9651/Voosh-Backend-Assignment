
# Voosh Backend Assignment

## Introduction

This repository contains source code for the assignment given by Voosh hiring team. 

Name - Satyam Mishra \
Email - mishrasatyam9651@gmail.com\
Phone - +91 9935611735

## Installation and Setup

Clone this repository and run `npm install`. Make sure you have latest version Node.js installed in your device.

Download **metadata.txt** file from **[here](https://drive.google.com/file/d/1bUv-9lijWId8qugp3ewxrCT0KrmYhii1/view?usp=sharing)**. Copy and paste the content of the file into `configs/index.js` file.

Now to run the backend server type this command after navigating to the root directory of the repository.

`npm run dev`

This will start the server and PORT information will be available in the console. 

Now download all the postman related json files from **[here](https://drive.google.com/drive/folders/1X1uLWl5-N1DF3hxrpk3StiLhivRWsbtN?usp=sharing)**. Import it to postman client and hit all the below mentioned APIs.

## API Documentations

### Auth APIs

- register 
    - method - POST
    - endpoint - `localhost:5000/api/auth/register`
    - payload - `{"name": "", "phone": "", "email": "", password: ""q}`
- login
    - method - POST
    - endpoint - `localhost:5000/api/auth/login`
    - payload - `{"email": "", "password": ""}`

### Listing APIs

- get all listings
    - method - GET
    - endpoint - `localhost:5000/api/listings`
- get single listing
    - method - GET
    - endpoint - `localhost:5000/api/listings/:id`
- create listing
    - method - POST
    - endpoint - `localhost:5000/api/listings`
    - payload - `{"name": "", "phone": "", "address": "", "images": []}` 
- update listing
    - method - PUT
    - endpoint - `localhost:5000/api/listings/:id`
    - payload - `{"name": "", "phone": "", "address": "", "images": []}` 
- delete listing
    - method - DELETE
    - endpoint - `localhost:5000/api/listings/:id`

### Review APIs

- get all reviews
    - method - GET
    - endpoint - `localhost:5000/api/reviews`
- create review
    - method - POST
    - endpoint - `localhost:5000/api/reviews`
    - payload - `{"content": "", "listingId": ""}` 
- update review
    - method - PUT
    - endpoint - `localhost:5000/api/reviews/:id`
    - payload - `{"content": ""}`  
- delete review
    - method - DELETE
    - endpoint - `localhost:5000/api/reviews/:id`
