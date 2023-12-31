import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");


  const handleSubmit = (e) => {
    //클릭 하면 페이지가 새로고침 되는 것을 방지해줌
    e.preventDefault();

    //새로운 할 일 데이터 추가하기
    let newTodo = {
      id: Date.now(), //고유 키값을 얻기위해 그냥 Date.now() 메서드사용
      title: value,
      completed: false
    }

    //원래 있던 할 일에 새로운 할 일 더해주기
    // 기존에있던 데이터들에서 newTodo 를 추가하는 것이기때문에 전개연산자 사용
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");

  }

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }, [todoData]);

  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-200">    {/* 이와 같이 함수 안에 html 문법을 작성 하는것을 jsx라고 한다. */}
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">  {/* 리액트의 barbel이 이러한 jsx문법을 createElement 형식으로 변환해줌 */}
        <div className="flex justify-between mb-3">   {/* jsx에서는 className이라고 명시해야 한다. */}
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>모두 지우기</button>
        </div>

        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData} />

        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />

      </div>
    </div>
  )
}