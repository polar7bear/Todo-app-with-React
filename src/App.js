import React, {Component} from "react";
import "./App.css";

export default class App extends Component {

  btnStyle = {
    color: "fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none"
    }
  }

  todoData = [
    {
      id: "1",
      title: "공부하기",
      completed: true
    },
    {
      id: "2",
      title: "청소하기",
      completed: false
    }
  ]
  render() {  // Class Component에서는 render() 함수 안에서 ui를 작성해야 한다.
    return(
      <div className="container">    {/* 이와 같이 함수 안에 html 문법을 작성 하는것을 jsx라고 한다. */}
        <div className="todoBlock">  {/* 리액트의 barbel이 이러한 jsx문법을 createElement 형식으로 변환해줌 */}
          <div className="title">   {/* jsx에서는 className이라고 명시해야 한다. */}
            <h1>할 일 목록</h1>
          </div>

          {this.todoData.map((data) => (
            <div style={this.getStyle()} key={data.id}> 
            {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
              jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}
              <input type="checkbox" defaultChecked={false} />
              {data.title}
              <button style={this.btnStyle}>x</button>
            </div>

          ))}
        </div>
      </div>
    )
  }
}