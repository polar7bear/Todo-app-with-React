//ES7+ React/Redux/React-Native snippets << extention 설치 후 rfc만 입력하면 코드 스니펫 입력해줌.
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) {



  // 버튼 클릭했을때 textDecoration 속성을 line-through 로 바꿔주기 위한 이벤트함수
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {  // 고유 key id와 일치한다면
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

  const handleEnd = (result) => {
    if(!result.destination) return;

    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워준다.
    // 2. return 값으로 지워진 아이템을 잡아준다.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    //원하는 자리에 reorderedItem를 추가하기
    newTodoData.splice(result.destination.index, 0, reorderedItem);

    setTodoData(newTodoData);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
                      {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
              jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}

                      <div className='items-center'>
                        <input type="checkbox" className="mr-2" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
                        <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                      </div>
                      <div className='items-center'>
                        <button className='px-4 py-2 float-right' onClick={() => handleClick(data.id)}>x</button>
                      </div>
                    </div>

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
