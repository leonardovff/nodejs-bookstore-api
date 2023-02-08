import express from 'express';
import { createUser, getUsers } from "../../../controllers/users.controller";

const userRouters = express.Router();

userRouters.get('/', getUsers);
userRouters.post('/', createUser);

export default userRouters;
