# Coupon generator

Coupon generator app made with Angular 14 and Node 18.3 with Typescript and Express.

Generates a list of coupons based on user preferences.

Current modes available:
- Random mode
- Sequence mode

## Installation

### Client
Once you downloaded the repo just type

    npm install

On both the client and server folders.

To run the client you can do a new build or launch the dev server with

    ng serve

### Server
To run the server type

    npm run dev

You can also transpile the server TS code into JS code with

    npm run build

## Usage

<p align="center">
    <img src="https://i.imgur.com/bezHmhz.png">
</p>

- The change button alters the output and can be modified by the user.
- The generate button does what it says.
- Inputs are controlled to not be 0 or empty.
- Responsive ish design.