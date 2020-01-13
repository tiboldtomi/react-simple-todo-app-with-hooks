import { uuid } from 'uuidv4';
import * as React from 'react';
import { Todo } from '../todo';
import { ITodo } from '../../interfaces';
import styles from './todo-container.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface ITodoContainerProps { }

interface ITodoContainerState {
    todos: ITodo[];
}

class TodoContainer extends React.Component<ITodoContainerProps, ITodoContainerState> {
    public constructor(props: ITodoContainerProps) {
        super(props);

        this.state = {
            todos: [{
                id: uuid(),
                desc: 'Frontend kometencia meetingre készülni',
                completed: false
            },
            {
                id: uuid(),
                desc: 'Számlákat feladni',
                completed: true
            },
            {
                id: uuid(),
                desc: 'Tejet venni',
                completed: false
            }]
        };
    }

    private setTodoCompleted(id: string): void {
        this.setState(({ todos }) => ({
            todos: todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }));
    }

    public render(): React.ReactElement<ITodoContainerProps> {
        const { todos } = this.state;

        return (
            <div className={styles['container']}>
                <div className={styles['title-container']}>
                    <h2 className={styles['title']}>{'Today todos'}</h2>
                    <button className={styles['circle-btn']} onClick={() => this.setState({ todos: [] })}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>

                <div className={styles['todos-container']}>
                    {todos.map(todo => <Todo key={todo.id} todo={todo} setCompleted={id => this.setTodoCompleted(id)} />)}
                </div>

                <div className={styles['input-container']}>
                    <input className={styles['input']} type={'text'} placeholder={'Add a task...'} />
                    <button
                        className={styles['circle-btn']}
                        onClick={() => this.setState({
                            todos: [
                                ...todos,
                                {
                                    id: uuid(),
                                    desc: 'teszt egy ketto harom',
                                    completed: false
                                }
                            ]
                        })}
                    >
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                </div>

            </div>
        );
    }
}

export default TodoContainer;