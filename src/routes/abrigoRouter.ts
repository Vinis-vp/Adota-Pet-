import express, { RequestHandler } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controller/AbrigoController";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";

const router = express.Router();
const abrigoRepository = new AbrigoRepository(
    AppDataSource.getRepository("AbrigoEntity")
);
const abrigoController = new AbrigoController(abrigoRepository);

const validateBodyAbrigo:RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next);

const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/",(req, res) =>abrigoController.criaAbrigo(req, res));

router.get("/",(req, res) =>abrigoController.listaAbrigos(req, res));

router.put("/:id", validateBodyAbrigo, (req, res) =>abrigoController.atualizaAbrigo(req, res));

router.delete("/:id", validateBodyAbrigo, (req, res) =>abrigoController.deletaAbrigo(req, res));

router.patch("/:id", validateBodyAbrigo, validateBodyEndereco, (req, res) =>abrigoController.atualizaEnderecoAbrigo(req, res));

export default router;