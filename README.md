# MERN-Stack-MongoDB-Express-React-Node

MERN Stack (MongoDB, Express, React, Node)

Realized by : iliyas, imad, hamza

# Structure

Frontend (React)

Backend (NodeJS with Express)

DataBase (MongoDB)

# Installation

The project can be easily installed and runned.

To install:

Backend

```
npm install // npm ci est plus intéressant pour installer les packages à la même version
```

![Capture d’écran 2022-03-16 081822](https://user-images.githubusercontent.com/67969827/158537017-f0748112-180e-4a12-b8cf-f1c826991a51.png)

Frontend

```
cd client
```

```
npm install
```

![2Capture d’écran 2022-03-16 082133](https://user-images.githubusercontent.com/67969827/158537279-b4c38d61-adc4-4b14-aa3c-dcc3c8430455.png)

# Run

In package.json there is a script dev that will run the backend and the frontend both

```
npm run dev
```

![3Capture d’écran 2022-03-16 082318](https://user-images.githubusercontent.com/67969827/158537602-43890199-a3d8-4909-bfbc-424af0d8b8ea.png)

# Database

The database already contains data for testing.
You can fill your database with dummy data if there is no product by running :

```
npm run seed
```

# Functionalities

- User can register, login and logout
- User can add products to cart even if he is not logged in
- User can remove products from cart
- User can change the quantity of product before making an order
- User can make an order if he is logged and has an address
- Once the order is made by the user it's not valid by default
- Orders can be validated by an administrator, credentials of admin : (email : admin@gmail.com | password : 123456)

# Final Message

Hope You Enjoy the project!
