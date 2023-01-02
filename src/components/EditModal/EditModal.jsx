import React, { useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../Todo/Todo";

const EditModal = ({ show }) => {
  const {
    todos,
    setTodos,
    showEditTodo,
    setShowEditTodo,
    selectedTodo,
    setSelectedTodo,
  } = useContext(TodoContext);
  const handleSubmit = (e, id, updateTodo) => {
    e.preventDefault();
    setShowEditTodo(false);
    const updateItem = todos.map((todo) => {
      return todo.id == id ? updateTodo : todo;
    });
    console.log(updateItem);
    setTodos(updateItem);
  };
  const handleEditTodo = (e) => {
    setSelectedTodo({ ...selectedTodo, title: e.target.value });
  };
  if (typeof document === "undefined")
    return <div className="modal-edit"></div>;
  return ReactDOM.createPortal(
    // <StyledModal className={`modal show ${props.isOpen ? "" : "close-modal"}`}>
    <StyledModal className={`modal show ${show ? "" : "close-modal"} `}>
      <div
        onClick={() => setShowEditTodo(false)}
        className="modal-overlay bg-slate-600 bg-opacity-60"
      ></div>
      <div className="max-w-[560px] w-[320px] z-[200] p-3 modal-content">
        <div className="flex flex-col">
          <h4 className="modal-header">Edit #</h4>
          <form
            onSubmit={(e) => handleSubmit(e, selectedTodo.id, selectedTodo)}
            className="flex justify-between items-center mb-4 gap-x-3"
          >
            <div className="relative flex-1 w-full">
              <input
                className="p-2 w-full border-2 border-blue-500 text-white  rounded-md bg-gray-500"
                type="text"
                onChange={(e) => handleEditTodo(e)}
                value={selectedTodo.title}
              />
            </div>
            <button
              type="submit"
              className="text-white rounded-md bg-green-600 p-3 font-medium"
            >
              OK
            </button>
          </form>
        </div>
      </div>
    </StyledModal>,
    document.querySelector("body")
  );
};

export default EditModal;
const StyledModal = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 500;
  &.close-modal {
    display: none;
  }
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    inset: 0;
    z-index: 100;
  }
  .modal-content {
    position: relative;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14),
      0 1px 10px rgba(0, 0, 0, 0.12);
    width: 320px;
    z-index: 200;
    max-height: 100%;
    margin: auto;
    transition: 0.3s all;
    border-radius: 4px;
    opacity: 1;
    transition: all 0.5s ease;
  }
`;
