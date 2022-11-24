import { Request, Response } from "express";

import User from "../models/user";


export const getUsers = async(req: Request, res: Response) => {
    const users = await User.findAll();

    res.json(users);
};

export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
        res.json(user);        
    }else{
        res.json({
            msg: `User does't exit with id: ${id}`
        });
    }
};

export const postUser = async(req: Request, res: Response) => {
    const { body } = req;

    try {
        const userExist = await User.findOne({
            where:{
                email: body.email
            }
        });

        if (userExist) {
            return res.status(400).json({
                msg: `Already exist an user with the email: ${body.email}`
            });
        }

        const user = await User.create(body);

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg: "Contact the system administrator"
        });
    }
};

export const putUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `Doesn't exist a user with the id: ${id}`
        });
    }

    await user.update(body);
    res.json(user);
};

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `Doesn't exist a user with the id: ${id}`
        });
    }

    await user.update({state:0});
    

    // await user.destroy();

    res.json(user);
};