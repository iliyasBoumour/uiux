const express = require("express");
const dotenv = require("dotenv");
const { catchErrors, routeNoteFound } = require("./server/errors/error");
const connecDb = require("./server/models/db");
dotenv.config();
const app = express();
connecDb();

app.use(express.json());

app.use("/api/products", require("./server/routes/product.routes"));
app.use(
  "/api/orders",
  require("./server/utils/parseJwt"), // il vaut mieux éviter les require comme ça, mettez tout en haut du fichier
  require("./server/routes/order.routes")
);
app.use("/api/auth", require("./server/routes/user.routes"));
app.use(routeNoteFound); // bonne gestion d'erreur
app.use(catchErrors);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
