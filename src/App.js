import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
  render() {  // Class Component에서는 render() 함수 안에서 ui를 작성해야 한다.
    return(
      <div className="container">    {/* 이와 같이 함수 안에 html 문법을 작성 하는것을 jsx라고 한다. */}
        <div className="todoBlock">  {/* 리액트의 barbel이 이러한 jsx문법을 createElement 형식으로 변환해줌 */}
          <div className="title">   {/* jsx에서는 className이라고 명시해야 한다. */}
            <h1>할 일 목록</h1>
          </div>
        </div>
      </div>
    )
  }
}