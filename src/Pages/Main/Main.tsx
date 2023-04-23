import React, { useState, useEffect } from "react";
import TodosItem from "../../components/TodosItem/TodosItem";
import "./Main.scss";
import { v4 as uuid } from "uuid";
import { TodoItemType } from "../../type";
import add from "../../img/add.svg";
import addIn from "../../img/addIn.svg";
import search from "../../img/search.svg";
const Main = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [visible, setVisible] = useState<string>("all");
  const [isComposing, setIsComposing] = useState<boolean | null>(null);
  const [searchField, setSearchField] = useState<string>("");
  const [index, setIndex] = useState<Boolean>(false);
  const [todoItem, setTodoItem] = useState<TodoItemType[]>(() => {
    const localStorageData = localStorage.getItem("todoItem");
    if (!localStorageData) {
      return [];
    }
    return JSON.parse(localStorageData);
  });
  const displayOrder =
    sortType === "reverse" ? todoItem.slice().reverse() : todoItem;
  useEffect(() => {
    localStorage.setItem("todoItem", JSON.stringify(todoItem));
  }, [todoItem]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTodoItem = () => {
    if (inputValue === "") return "";
    setTodoItem([
      {
        id: uuid(),
        state: false,
        edit: false,
        content: inputValue,
      },
      ...todoItem,
    ]);
    setInputValue("");
  };
  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (
    event: React.CompositionEvent | HTMLInputElement
  ) => {
    setIsComposing(false);
    if ((event as HTMLInputElement).value) {
      handleTodoItem();
      setInputValue("");
    }
  };
  const handleInputEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isComposing) {
      handleTodoItem();
      setInputValue("");
    }
  };
  return (
    <>
      <main className="container">
        <div className="inner">
          <div className="form-container">
            <input
              className="input-text"
              type="text"
              name="title"
              placeholder="Введите название заметки"
              value={inputValue}
              maxLength={30}
              onChange={handleInputChange}
              onKeyDown={handleInputEnter}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
            <button
              type="submit"
              className="input-submit"
              onClick={handleTodoItem}
            >
              {inputValue.trim() === "" ? (
                <img src={addIn} alt="" width={25} height={25} />
              ) : (
                <img src={add} alt="" width={25} height={25} />
              )}
            </button>
          </div>
          <div className="options">
            <div className="sort">
              <div className="sort-type">
                <ul>
                  <li>
                    <button
                      className={sortType === "" ? "activeSort" : ""}
                      onClick={() => setSortType("")}
                    >
                      Сначала новые
                    </button>
                  </li>
                  <li>
                    <button
                      className={sortType === "reverse" ? "activeSort" : ""}
                      onClick={() => setSortType("reverse")}
                    >
                      Сначала старые
                    </button>
                  </li>
                </ul>
              </div>
              <div className="sort-status">
                <ul>
                  <li>
                    <button
                      className={visible === "all" ? "activeVisible" : ""}
                      onClick={() => setVisible("all")}
                    >
                      Все
                    </button>
                  </li>
                  <li>
                    <button
                      className={visible === "active" ? "activeVisible" : ""}
                      onClick={() => setVisible("active")}
                    >
                      Активные
                    </button>
                  </li>
                  <li>
                    <button
                      className={visible === "done" ? "activeVisible" : ""}
                      onClick={() => setVisible("done")}
                    >
                      Завершенные
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="search">
              <div className="search-left">
                <input
                  placeholder="Поиск"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />

                <img src={search} alt="" />
              </div>
              <div
                onClick={() => setIndex(!index)}
                className={`search-right ${index ? "indexOn" : "indexOf"}`}
              >{`Индексация: ${index ? "Вкл" : "Выкл"}`}</div>
            </div>
          </div>
          <ul className="todoslist">
            {todoItem.length === 0 ? (
              <></>
            ) : (
              <TodosItem
                todoItem={sortType === "reverse" ? displayOrder : todoItem}
                setTodoItem={setTodoItem}
                visible={visible}
                searchField={searchField}
                index={index}
              />
            )}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Main;
