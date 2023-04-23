import React, { useState } from "react";
import "./TodosItem.scss";
import { TodoItemType } from "../../type";
import done from "../../img/done.svg";
import edit from "../../img/edit.svg";
import trash from "../../img/trash.svg";
const TodosItem = ({
  searchField,
  visible,
  todoItem,
  index,
  setTodoItem,
}: {
  index: Boolean;
  searchField: string;
  visible: string;
  todoItem: any;
  setTodoItem: (value: any) => void;
}) => {
  const [editValue, setEditValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTodoState = (id: string | number) => {
    setTodoItem(
      todoItem.map((item: TodoItemType) => {
        if (item.id !== id) return item;
        return {
          ...item,
          state: !item.state,
        };
      })
    );
  };
  const handleDeleteTodoItem = (id: string | number, content: string) => {
    setTodoItem(
      todoItem.filter((item: TodoItemType) => {
        return item.id !== id;
      })
    );
  };
  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };
  const handleEditTodoItem = (id: string | number) => {
    if (isEditing) return;
    setIsEditing(true);
    setTodoItem(
      todoItem.map((item: TodoItemType) => {
        if (item.id !== id) {
          return {
            ...item,
            edit: false,
          };
        }
        return {
          ...item,
          edit: true,
        };
      })
    );
  };
  const handleCompletedEdit = (id: string | number) => {
    setTodoItem(
      todoItem.map((item: TodoItemType) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          edit: false,
          content: editValue.length === 0 ? item.content : editValue,
        };
      })
    );
    setEditValue("");
    setIsEditing(false);
  };
  const handelEditInputKeyDown = (
    event: React.KeyboardEvent,
    id: string | number
  ) => {
    event.key === "Enter" && handleCompletedEdit(id);
  };
  return (
    <>
      {todoItem.map((item: TodoItemType) => {
        if (
          index
            ? !item.content.toLowerCase().indexOf(searchField.toLowerCase())
            : item.content.toLowerCase().includes(searchField.toLowerCase())
        ) {
          return (
            <li
              className={`todo-item ${
                item.state
                  ? visible === "active"
                    ? "hide"
                    : ""
                  : visible === "done"
                  ? "hide"
                  : ""
              }`}
              key={item.id}
            >
              <div>
                <button
                  className="todo-item-button"
                  onClick={() => handleDeleteTodoItem(item.id, item.content)}
                >
                  <img src={trash} alt="" width={20} height={20} />
                </button>
                {!item.edit ? (
                  <>
                    <span
                      className={item.state ? "todo-item-content-done" : ""}
                      onClick={() => handleTodoState(item.id)}
                    >
                      {item.content}
                    </span>
                    {!item.state ? (
                      <button
                        className="todo-item-button"
                        onClick={() => handleEditTodoItem(item.id)}
                      >
                        <img src={edit} alt="" width={20} height={20} />
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      maxLength={30}
                      className="todo-item-edit"
                      placeholder={item.content}
                      onChange={handleEditInputChange}
                      onKeyDown={(event) =>
                        handelEditInputKeyDown(event, item.id)
                      }
                      autoFocus
                    />
                    <button
                      className="todo-item-button"
                      onClick={() => handleCompletedEdit(item.id)}
                    >
                      <img src={done} alt="" width={20} height={20} />
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        }
      })}
    </>
  );
};

export default TodosItem;
