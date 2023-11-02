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
  };
  
  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none"
    }
  };
  
  
  state = { //React State
            //리액트에서는 화면 렌더링이 변경될 수 있게 state를 사용함.
    todoData: [
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
    ],

    value: ""
  };
  
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id);
    console.log('newTodoData', newTodoData);
    this.setState({todoData: newTodoData});
  };

  handleChange = (e) => {
    //console.log('e', e.target.value);
    this.setState({value: e.target.value});
  };

  handleSubmit = (e) => {
    //클릭 하면 페이지가 새로고침 되는 것을 방지해줌
    e.preventDefault();
    
    //새로운 할 일 데이터 추가하기
    let newTodo = {
      id: Date.now(), //고유 키값을 얻기위해 그냥 Date.now() 메서드사용
      title: this.state.value,
      completed: false
    }

    //원래 있던 할 일에 새로운 할 일 더해주기
    this.setState({ todoData: [...this.state.todoData, newTodo]});
    // 기존에있던 데이터들에서 newTodo 를 추가하는 것이기때문에 전개연산자 사용

  }


  render() {  // Class Component에서는 render() 함수 안에서 ui를 작성해야 한다.
    return(
      <div className="container">    {/* 이와 같이 함수 안에 html 문법을 작성 하는것을 jsx라고 한다. */}
        <div className="todoBlock">  {/* 리액트의 barbel이 이러한 jsx문법을 createElement 형식으로 변환해줌 */}
          <div className="title">   {/* jsx에서는 className이라고 명시해야 한다. */}
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle()} key={data.id}> 
            {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
              jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}
              <input type="checkbox" defaultChecked={false} />
              {data.title}
              <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
            </div>

          ))}

          <form style={{ display: "flex"}} onSubmit={this.handleSubmit}>
              <input 
              type="text" 
              name="value" 
              style={{ flex: "10", padding: "5px"}} 
              placeholder="해야 할 일을 입력해주세요."
              value={this.state.value}
              onChange={this.handleChange}
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
}