import React from "react";
import "./style.css";
import { useState , useEffect} from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [displayTodo, setDisplayTodo] = useState(todos)

  const handleDelete = (id) => {
    let lists = [...todos];
    const i = lists.findIndex((t) => t.id === id)

    lists.splice(i, 1);
    setTodos(lists);

  };

  const handleKey = (event) => {
    if (event.key == "Enter") {
      let lists = [...todos];
      const newTodo = {
        lists,
        name: event.target.value,
        id: Date.now(),
        isDone: false,
      };
      setTodos(todos.concat(newTodo));
      setInputText("");
    }
  };

  const handleCheck = (id) => {
    let lists = [...todos];
const i = lists.findIndex((t) => t.id === id)

    lists.splice(i, 1, { ...lists[i], isDone: !lists[i].isDone });
    setTodos(lists);
  };

  const handleAll = () => {
    setDisplayTodo(todos);
  };

  const handleActive = () => {
      const lists = [...todos]
   const activeTodo = lists.filter((todo, i) => {
      if (todo.isDone != true) {
        return todo;
      }
    });
    setDisplayTodo(activeTodo);
  };

  const handleCompleted = () => {
      const lists = [...todos]
   const completedTodo = lists.filter((todo, i) => {
      if (todo.isDone == true) {
        return todo;
      }
    });
    setDisplayTodo(completedTodo);
  };
  
  const handleRemoveCompleted = () => {
    const removeCompleted = todos.filter((todo, i) => {
      if (todo.isDone != true) {
        return todo;
      }
    });
    setTodos(removeCompleted);
  };

  useEffect( () => {
    setDisplayTodo(todos)
  }, [todos])
 

  return (
    <div className="container">
      <h1>Todos</h1>
      <div>
        <center>
          <div>
            <input
              className="search-box"
              type="search"
              placeholder="Enter a todo"
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              onKeyUp={(event) => handleKey(event)}
            />
          </div>

          <div>
            {displayTodo.map(({id, name, isDone}) => {
              return (
                <li key={id}>
                  <input type="checkbox" checked= {isDone} onClick={() => handleCheck(id)} />
                  <h2>{name}</h2>
                  <h3 onClick={() => handleDelete(id)}>X</h3>
                </li>
              );
            })}
          </div>

          <div className="buttons">
            <button onClick={handleAll}>All</button>
            <button onClick={handleActive}>Active</button>
            <button onClick={handleCompleted}>Completed</button>
            <button onClick={handleRemoveCompleted}>Remove completed</button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default App;
