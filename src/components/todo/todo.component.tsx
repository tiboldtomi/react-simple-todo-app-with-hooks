import * as React from 'react';
import { Checkbox } from '../checkbox';
import styles from './todo.module.scss';
import { ITodo } from '../../interfaces';
import { FilteredText } from '../filtered-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ITodoProps {
    todo: ITodo;
    setDeleted: (id: string) => void;
    setCompleted: (id: string) => void;
}

const Todo: React.FC<ITodoProps> = ({ todo, setCompleted, setDeleted }) => {
    const { desc, completed, id } = todo;
    return (
        <div className={styles['wrapper']}>
            <div className={styles['delete-icon']} onClick={() => setDeleted(id)}>
                <FontAwesomeIcon icon={faTimesCircle} color={'#999'} />
            </div>
            <div className={`${styles['container']} ${completed ? styles['completed'] : null}`}>
                <Checkbox checked={completed} onChanged={() => setCompleted(id)} />
                <FilteredText className={styles['description']}>{desc}</FilteredText>
            </div>
        </div>
    );
}

export default Todo;