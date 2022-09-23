import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Colaborador } from "../entities/Colaborador"

export default class ColaboradorController {

    async selectColaboradores(req: Request, res: Response) {
        try {
            const colaboradores = await AppDataSource.manager.find(Colaborador, {
                relations: {
                    cr: true,
                    lancamentos_colaborador: true,
                    lancamentos_gestor: true
                },
                order: {
                    nome: "ASC"
                },
                }
            )
            return res.json(colaboradores)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async selectGestores(req: Request, res: Response){
        try {
            const colaboradores = await AppDataSource.manager.find(Colaborador, {
                relations: {
                    cr: true,
                    lancamentos_colaborador: true,
                    lancamentos_gestor: true
                },
                order: {
                    nome: "ASC"
                },
                where: {
                    perfil: "gestor"
                }
                }
            )
            return res.json(colaboradores)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}