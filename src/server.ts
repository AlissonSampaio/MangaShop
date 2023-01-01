import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  return res.status(200).json("Comer cu de curioso");
});

app.listen(3000, () => {
  console.log("Rodando");
});
