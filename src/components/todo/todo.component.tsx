import * as React from 'react';
import { Checkbox } from '../checkbox';
import styles from './todo.module.scss';
import { ITodo } from '../../interfaces';

interface ITodoProps {
    todo: ITodo;
    setCompleted: (id: string) => void;
}

const Todo: React.FC<ITodoProps> = ({ todo, setCompleted }) => {
    const { desc, completed, id } = todo;
    return (
        <div className={styles['container']}>
            <Checkbox checked={completed} onChanged={() => setCompleted(id)} />
            <div className={styles['description']}>{desc}</div>
        </div>
    );
}

export default Todo;