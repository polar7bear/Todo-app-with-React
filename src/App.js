import React, {useState} from "react";
import "./App.css";

export default function App() {


  const btnStyle = {
    color: "fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };
  
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none" // 신기하다.
    }
  };

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");
  
  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleChange = (e) => {
    //console.log('e', e.target.value);
    setValue(e.target.value);
  };

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
    setValue("");

  }

  // 버튼 클릭했을때 textDecoration 속성을 line-through 로 바꿔주기 위한 이벤트함수
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if(data.id === id) {  // 고유 key id와 일치한다면
        data.completed = !data.completed; //누를때 마다 true or false로 변경
      }
      return data;
    })

    setTodoData(newTodoData);
  }


  
    return(
      <div className="container">    {/* 이와 같이 함수 안에 html 문법을 작성 하는것을 jsx라고 한다. */}
        <div className="todoBlock">  {/* 리액트의 barbel이 이러한 jsx문법을 createElement 형식으로 변환해줌 */}
          <div className="title">   {/* jsx에서는 className이라고 명시해야 한다. */}
            <h1>할 일 목록</h1>
          </div>

          {todoData.map((data) => (
            <div style={getStyle(data.completed)} key={data.id}> 
            {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
              jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}
              <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
              {data.title}
              <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
            </div>

          ))}

          <form style={{ display: "flex"}} onSubmit={handleSubmit}>
              <input 
              type="text" 
              name="value" 
              style={{ flex: "10", padding: "5px"}} 
              placeholder="해야 할 일을 입력해주세요."
              value={value}
              onChange={handleChange}
              />
              <input
              type="submit"
              value="입력"
              className="btn"
              style={{flex: "1"}}
              />
          </form>
        </div>
      </div>
    )
  }