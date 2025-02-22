import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAbrigo } from "../../tipos/tiposAbrigo";
import * as yup from "yup";
import {pt} from 'yup-locale-pt'
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";


const esquemaBodyAbrigo:yup.ObjectSchema<
    Omit<TipoRequestBodyAbrigo, "endereco">
        > = yup.object({
            nome:yup.string().defined().required(),
            email:yup.string().email().defined().required(),
            senha:yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "senha inválida"),
            celular:yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,"celular inválido"),

        })


const middlewareValidadorBodyAbrigo = async (req: Request, res: Response, next: NextFunction) => {
    tratarErroValidacaoYup(esquemaBodyAbrigo, req, res, next)
}
export {middlewareValidadorBodyAbrigo}