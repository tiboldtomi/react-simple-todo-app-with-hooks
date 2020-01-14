import './transition.scss';
import { uuid } from 'uuidv4';
import * as React from 'react';
import { Todo } from '../todo';
import jsCookies from 'js-cookie';
import { ITodo } from '../../interfaces';
import { TodoInput } from '../todo-input';
import styles from './todo-container.module.scss';
import { CircularIconButton } from '../circular-icon-button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ITodoContainerProps { }

interface ITodoContainerState {
    todos: ITodo[];
}

class TodoContainer extends React.Component<ITodoContainerProps, ITodoContainerState> {
    public constructor(props: ITodoContainerProps) {
        super(props);

        this.state = {
            todos: []
        };
    }

    public componentDidMount() {
        const { todos } = jsCookies.getJSON('todos');
        this.setState({ todos });
    }

    private updateCookies(): void {
        const { todos } = this.state;
        jsCookies.set('todos', { todos }, { expires: 1 });
    }

    private setTodoCompleted(id: string): void {
        this.setState(({ todos }) => ({
            todos: todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }), () => this.updateCookies());
    }

    private setTodoDeleted(id: string): void {
        this.setState(({ todos }) => ({
            todos: todos.filter(t => t.id !== id)
        }), () => this.updateCookies());
    }

    public render(): React.ReactElement<ITodoContainerProps> {
        const { todos } = this.state;

        return (
            <div className={styles['container']}>
                <div className={styles['title-container']}>
                    <h2 className={styles['title']}>{'Today todos'}</h2>
                    <CircularIconButton
                        icon={faTrashAlt}
                        onClick={() => this.setState({ todos: [] }, () => this.updateCookies())}
                    />
                </div>

                <TransitionGroup className={styles['todos-container']}>
                    {todos.map(todo =>
                        <CSSTransition key={todo.id} timeout={300} classNames={'item'}>
                            <Todo
                                key={todo.id}
                                todo={todo}
                                setCompleted={id => this.setTodoCompleted(id)}
                                setDeleted={id => this.setTodoDeleted(id)}
                            />
                        </CSSTransition>
                    )}
                </TransitionGroup>

                <TodoInput onSave={text => this.setState({ todos: [{ id: uuid(), desc: text, completed: false }, ...todos] }, () => this.updateCookies())} />
            </div>
        );
    }
}

export default TodoContainer;