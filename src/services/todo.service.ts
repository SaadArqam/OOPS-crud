import {ToDoModel} from "../schema/todo.schema"

export class ToDoService{
    async getTask(){
        const task=await ToDoModel.find()
        return task
    }
    create():void{}
    read():void{}
    update():void{}
    delete():void{}
}

