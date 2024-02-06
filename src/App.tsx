import React, {useState,useReducer,useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {reducer,Action,ToDo} from './model'
import { ToDoItem } from './component/ToDoItem';

const App:React.FC = () =>{
  const [name,setName] = useState('')
  const [todos,dispatch] = useReducer(reducer,[])

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    dispatch({action:"Submit",todo:name})
    setName("")
  }
  const inputRef = useRef<HTMLInputElement>(null)


  return (
    <div className="App">
    <header>
      <h1>ToDoList</h1>
    </header>
    <form onSubmit={(e) =>{
        handleSubmit(e)
        inputRef.current?.blur()
    } }>
      <div className='input'>
      <input 
        type="text"
        ref = {inputRef}
        value={name}
        className='input--textbox'
        onChange={e=> setName(e.target.value)}
      />
      <button className='input--btn' type='submit'>Go</button>
      </div>

    </form>
    <div className='List-Containers'>
    <ul className='No-Bullets'>
        {
          
          todos.map((todo) => (
            <li key={todo.id}>
              <ToDoItem todo={todo} dispatch={dispatch}/>
            </li>
          ))
        }
      </ul>
    </div>

    </div>
  )
}

export default App;