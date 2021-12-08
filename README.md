# Ledn Token - REST API

## Setup

#### Requirements:

- [Node and NPM](https://nodejs.org/en/)
- [MongoDB (Version 5.0+)](https://docs.mongodb.com/manual/installation/)
  - The Community Edition server is all we require for demonstration purposes
  - To pre-load the sample datasets (./sample-data), we can use `mongoimport` to import the collections
  - `mongoimport` and other database tools are included if MongoDB is installed on MacOS with homebrew, but will need to be manually added on [Windows](https://www.mongodb.com/try/download/database-tools)

### Pre-load Datasets

This step is not mandatory to run the app.

Run the following commands individually to import the included sample datasets:

```
mongoimport --db ledndb --collection users --file accounts-api-large.json --jsonArray
```

```
mongoimport --db ledndb --collection transactions --file transactions-api-large.json --jsonArray
```

### Install

```
npm install
```

### Run Locally

```
npm run dev
```

### Run Tests

```
npm test
```

## Get a users account

### Request

`GET /api/user/:email`

```
http://localhost:3000/api/user/:email
```

### Response

```
Status: 200 OK

{
  _id: ObjectId("61a45df10374604265678313"),
  firstName: 'fname',
  lastName: 'lname',
  country: 'CA',
  email: 'email_address@gmail.com',
  dob: '1990-12-12T02:37:18.520Z',
  mfa: 'TOTP',
  createdAt: '2018-12-21T06:15:59.911Z',
  updatedAt: '2018-12-21T06:15:59.911Z',
  referredBy: null
}
```

## Get a users balance

### Request

`GET /api/user/:email/balance`

```
http://localhost:3000/api/user/:email/balance
```

### Response

```
Status: 200 OK

{
    "balance": 12345678
}
```

## Create a user

### Request

`POST /api/user/`

```
http://localhost:3000/api/user/
```

#### Request Body

```
{
  firstName: 'fname',
  lastName: 'lname',
  country: 'CA',
  email: 'email_address@gmail.com',
  dob: '2001-01-01',
  mfa: null | 'TOTP' | 'SMS',
  referredBy: null | <existing user email>
}
```

### Response

```
Status: 201 Created

{
  firstName: 'fname',
  lastName: 'lname',
  country: 'CA',
  email: 'email_address@gmail.com',
  dob: "2001-01-01T00:00:00.000Z",
  mfa: null,
  referredBy: null,
  _id: '61ad8ee63296af6ab389cddf',
  createdAt: '2021-12-06T04:17:42.267Z',
  updatedAt: '2021-12-06T04:17:42.267Z'
}
```

## Update a user

### Request

`PUT /api/user/:email`

```
http://localhost:3000/api/user/:email
```

#### Request Body

```
{
  firstName: 'fname',
  lastName: 'lname',
  country: 'US',
  email: 'email_address@gmail.com',
  dob: '2001-01-01',
  mfa: null | 'TOTP' | 'SMS',
  referredBy: null | <existing user email>
}
```

### Response

```
Status: 200 OK

{
  firstName: 'fname',
  lastName: 'lname',
  country: 'US',
  email: 'email_address@gmail.com',
  dob: "2001-01-01T00:00:00.000Z",
  mfa: null,
  referredBy: null,
  _id: '61ad8ee63296af6ab389cddf',
  createdAt: '2021-12-06T04:17:42.267Z',
  updatedAt: '2021-12-07T05:17:42.267Z'
}
```

## Get a users transactions

### Request

`GET /api/transactions/:email`

```
http://localhost:3000/api/transactions/:email
```

### Response

```
Status: 200 OK

[
  {
    _id: "61a411265527048981255b1c",
    userEmail: "email_address@gmail.com",
    amount: 628551685,
    type: "send",
    createdAt: "2020-09-04T04:25:21.018Z"
  },
  {
    _id: "61a411265527048981255b1d",
    userEmail: "email_address@gmail.com",
    amount: 109219925,
    type: "receive",
    createdAt: "2019-05-09T14:41:59.007Z"
  },
  {
    _id: "61a411265527048981255b1e",
    userEmail: "email_address@gmail.com",
    amount: 934721668,
    type: "send",
    createdAt: "2020-11-15T17:53:15.463Z"
  }
]
```

## Debit a users account

### Request

`POST /api/transactions/:email/debit`

```
http://localhost:3000/api/transactions/:email/debit
```

#### Request Body

```
{
  "amount": 123456
}
```

### Response

```
Status: 201 Created

{
  _id: "61a411265527048981255b1e",
  userEmail: "email_address@gmail.com",
  amount: 123456,
  type: "send",
  createdAt: "2020-11-15T17:53:15.463Z"
}
```

## Credit a users account

### Request

`POST /api/transactions/:email/credit`

```
http://localhost:3000/api/transactions/:email/credit
```

#### Request Body

```
{
  "amount": 123456
}
```

### Response

```
Status: 201 Created

{
  _id: "61a411265527048981255b1e",
  userEmail: "email_address@gmail.com",
  amount: 123456,
  type: "receive",
  createdAt: "2020-11-15T17:53:15.463Z"
}
```

## Transfer amount between users

### Request

`POST /api/transactions/transfer`

```
http://localhost:3000/api/transactions/transfer
```

#### Request Body

```
{
  fromEmail: "email_address_from@gmail.com",
  toEmail: "email_address_to@gmail.com",
  amount: 2000
}
```

### Response

```
Status: 201 Created

[
  {
    "userEmail": "email_address_from@gmail.com",
    "amount": 2000,
    "type": "send",
    "_id": "61a9a986e0685a3991d15968",
    "createdAt": "2021-12-03T05:22:14.936Z"
  },
  {
    "userEmail": "email_address_to@gmail.com",
    "amount": 2000,
    "type": "receive",
    "_id": "61a9a986e0685a3991d15969",
    "createdAt": "2021-12-03T05:22:14.937Z"
  }
]
```
