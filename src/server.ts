import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json("Comer cu de curioso");
});

app.listen(3000, () => {
  console.log("Rodando");
});