//ES7+ React/Redux/React-Native snippets << extention 설치 후 rfc만 입력하면 코드 스니펫 입력해줌.
import React from 'react'

export default function List({ todoData, setTodoData }) {

  const btnStyle = {
    color: "fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };

  // 버튼 클릭했을때 textDecoration 속성을 line-through 로 바꿔주기 위한 이벤트함수
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if(data.id === id) {  // 고유 key id와 일치한다면
        data.completed = !data.completed; //누를때 마다 true or false로 변경
      }
      return data;
    })

    setTodoData(newTodoData);
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
  };

  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none" // 신기하다.
    }
  };

  return (
    <div>
        {todoData.map((data) => (
            <div style={getStyle(data.completed)} key={data.id}> 
            {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
              jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}
              <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
              {data.title}
              <button style={btnStyle} onClick={() => handleClick(data.id)}>x</button>
            </div>

          ))}
    </div>
  )
}
