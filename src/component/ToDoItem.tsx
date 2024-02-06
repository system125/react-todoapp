import React,{useState,useRef,useEffect} from "react"
import {Action,ToDo,reducer} from "../model"
import "../App.css"

type Props = {todo:ToDo,dispatch:React.Dispatch<Action>}
export const ToDoItem:React.FC<Props> = ({todo,dispatch}:Props)=>{
    const [edit,setEdit] = useState(false)
    const [editText,setEditText] = useState(todo.todo)

    const handleTextEdit = (isDone:boolean) =>{
        if (!isDone){
            setEdit(true);
        }
      }

      const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch({action:"Edit",id:todo.id,editText:editText})
        setEdit(false);
      }

      const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
          // Clicked outside the input text box
          setEdit(false);
        }
      };

      const inputRef = useRef<HTMLInputElement>(null);
      useEffect(()=>{
        inputRef.current?.focus();
   
    },[edit])

    return (
        <form className="container" onSubmit={(e)=>handleSubmit(e)}>
            <span className="row">
              {
                edit?(<input  
                    className='todo--text' 
                    type='text' 
                    value={editText}
                    ref={inputRef}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={()=> {
                    dispatch({action:"Edit",id:todo.id,editText:editText})
                    setEdit(false)}
                }
                />
                
                ):
                (<p className="todo--text" 
                onClick={()=> handleTextEdit(todo.done)}>
                  {todo.todo}
                </p>
                
                )
              }

              <p className="check--btn" onClick={() => dispatch({action:'ToggleDone',id:todo.id})}>
                {todo.done?<span>✅</span>:<span>❌</span>}
              </p>
              <p className="check--btn" onClick={() => dispatch({action: "Delete",id:todo.id})}>🗑️</p>
            </span>
          </form>
    )

}