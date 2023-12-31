import React, { useState } from 'react'

const List = React.memo(({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    // 버튼 클릭했을때 textDecoration 속성을 line-through 로 바꿔주기 위한 이벤트함수
    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {  // 고유 key id와 일치한다면
                data.completed = !data.completed; //누를때 마다 true or false로 변경
            }
            return data;
        })

        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newTodoData = todoData.map((data) => {
            if(data.id === id) {
                data.title = editedTitle;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
        setIsEditing(false);
    }



    if (isEditing) {
        return (
            <div className="bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded">
                {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
                  jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}

                <div className='items-center'>
                    <form onSubmit={handleSubmit}>
                        <input className="mr-4 w-full px-3 py-2 text-gray-500 rounded" 
                        value={editedTitle}
                        onChange={handleEditChange} />
                    </form>
                </div>
                <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => setIsEditing(false)}>취소</button>
                    <button onClick={handleSubmit} className='px-4 py-2 float-right' type="submit">저장</button>
                </div>
            </div>
        )
    } else {
        return (
            <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>
                {/* 리액트에서 요소의 리스트를 나열 할 때는 key를 넣어줘야한다.
                  jsx key를 명시함으로써 변경, 추가 및 제거 된 항목을 식별하는데 도움이 됨. */}

                <div className='items-center'>
                    <input type="checkbox" className="mr-2" defaultChecked={false} onChange={() => handleCompleteChange(id)} />
                    <span className={completed ? "line-through" : undefined}>{title}</span>
                </div>
                <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => handleClick(id)}>x</button>
                    <button className='px-4 py-2 float-right' onClick={() => setIsEditing(true)}>수정하기</button>
                </div>
            </div>
        );
    }
});

export default List