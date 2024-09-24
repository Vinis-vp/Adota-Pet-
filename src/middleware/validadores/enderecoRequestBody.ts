import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import EnderecoEntity from "../../entities/endereco";
import {pt} from 'yup-locale-pt'
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";

yup.setLocale(pt);

const esquenaBodyEndereco
:yup.ObjectSchema<
    Omit<EnderecoEntity, "id">
        > = yup.object({
            cidade:yup.string().defined().required(),
            estado:yup.string().defined().required().min(6),
});

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
   tratarErroValidacaoYup(esquenaBodyEndereco, req, res, next)
}
export {middlewareValidadorBodyEndereco}