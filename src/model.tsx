
export type ToDo = {id:number;todo:string;done:boolean;}
export type Action = {action:"Submit";todo:string;}|{action:"Delete";id:number}| {action:"ToggleDone";id:number}
    |{action:"Edit",id:number,editText:string};

export const reducer = (todos:ToDo[],action:Action):ToDo[] =>{

  switch(action.action){
    case 'Submit':
      return action.todo!="" ?[...todos,{
        id:Date.now(),
        todo:action.todo,
        done:false,
      }
      ]:todos
    case "Delete":
      return todos.filter(todo => todo.id != action.id)
    case "ToggleDone":
        return todos.map(todo => todo.id == action.id ? {...todo,done:!todo.done}:todo)
    case "Edit":
        return todos.map(todo => todo.id == action.id ? {...todo,todo:action.editText}:todo)
  }  
}

