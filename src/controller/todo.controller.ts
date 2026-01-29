import { ToDoService } from "../services/todo.service";

import {Router} from "express"

const router=Router()
const todoSercice=new ToDoService
router.get("/task",todoSercice.getTask)