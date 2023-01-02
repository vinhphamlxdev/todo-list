import React, { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditModal from "../EditModal/EditModal";
export const TodoContext = createContext(null);

const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [showEditTodo, setShowEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});
  const values = {
    todos,
    setTodos,
    value,
    setValue,
    showEditTodo,
    setShowEditTodo,
    selectedTodo,
    setSelectedTodo,
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: value,
        completed: false,
      },
    ]);
    setValue("");
  };
  const handleDelete = (id) => {
    console.log(todos.filter((todo) => todo.id !== id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item, index) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleShowEditModal = (item) => {
    setSelectedTodo(item);
    setShowEditTodo(true);
  };
  return (
    <TodoContext.Provider value={values}>
      <div className="p-3 h-[400px] max-h-full w-[400px] bg-slate-800 rounded-md">
        <h3 className="text-white font-medium mb-4 text-center text-3xl">
          Todo List
        </h3>
        <form
          onSubmit={onSubmit}
          className="flex justify-between items-center mb-4 gap-x-3"
        >
          <div className="relative flex-1 w-full">
            <input
              value={value}
              required
              onChange={(e) => setValue(e.target.value)}
              className="p-2 w-full border-2 border-blue-500 text-white  rounded-md bg-gray-500"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="text-white rounded-md bg-pink-600 p-3 font-medium"
          >
            ADD TODO
          </button>
        </form>
        <div className="flex flex-col gap-y-3">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className="rounded-md border border-pink-500 p-3 flex justify-between items-center"
              >
                <span className="text-white text-sm">{todo.title}</span>
                <div className="flex px-3 items-center gap-x-3">
                  <i
                    onClick={() => handleComplete(todo)}
                    className={`bi leading-[0px] text-lg cursor-pointer bi-check-circle ${
                      todo.completed ? "text-green-600" : "text-yellow-600"
                    }`}
                  ></i>
                  <i
                    onClick={() => handleShowEditModal(todo)}
                    className="bi leading-[0px] text-green-500 text-lg cursor-pointer bi-pencil-fill"
                  ></i>
                  <i
                    onClick={() => handleDelete(todo.id)}
                    className="bi leading-[0px] text-lg text-red-600 cursor-pointer bi-trash"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <EditModal show={showEditTodo} />
      </div>
    </TodoContext.Provider>
  );
};

export default Todo;
