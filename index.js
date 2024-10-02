import express from "express";
import router from "./src/routes/recetteRoutes.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.DB_PORT;

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
