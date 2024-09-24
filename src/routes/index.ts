import express from "express";
import petRouter from "../routes/petRouter";
import adotanteRouter from "../routes/adotanteRouter";
import abrigoRouter from "./abrigoRouter";
const router = (app: express.Router) => {
  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter); //linha adicionada
  app.use("/abrigo", abrigoRouter)
};
export default router;