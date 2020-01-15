import * as React from 'react';
import { ITodo } from '../../interfaces';

interface ITodoCounterProps {
    todos: ITodo[];
}

const TodoCounter: React.FC<ITodoCounterProps> = ({ todos }) => {
    const todosCount: number = todos.length;
    const completedTodosCount: number = todos.filter(todo => todo.completed).length;

    return <>{`(${todosCount}/${completedTodosCount})`}</>;
}

export default TodoCounter;