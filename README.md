
# MB e-Commerce

This is my capstone project for the Web Development 
Bootcamp at BrainStation. It is a fully functional e-commerce,
with a payment and invoice system.



## Tech Stack

**Client:** React, SASS

**Server:** Node, Express, MySql


## Features

- comment section for each product
- dynamic timestamp
- jwt authentication
- payment system
- email system
- invoice system
- add/delete products in cart


## Installation

Install my-project with:
- npm i
- create a database called capstone
    
## How to Run

### Development Mode
Type the following commands:
- npm run migrate
- npm run seed
- npm run rollback is set if necessary
- in order for the payment to be successful, use the card number  4242 4242 4242 4242
- The postal code follows the canadian pattern (e.g. X0X-0X0)

### Production Mode
URL: https://mbecommerce.vercel.app/

## API Reference

### STRIPE API
- Payment System
- Requires an API_KEY

### SEND IN BLUE API
- emailing System
- requires an API_KEY

### EASY INVOICE API
- invoice generator



