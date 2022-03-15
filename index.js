const express = require("express");
const dotenv = require("dotenv");
const { catchErrors, routeNoteFound } = require("./server/errors/error");
const connecDb = require("./server/models/db");
dotenv.config();
const app=express()
connecDb();

app.use("/api/products", require(".server/routes/product.routes"));
app.use(routeNoteFound);
app.use(catchErrors);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});