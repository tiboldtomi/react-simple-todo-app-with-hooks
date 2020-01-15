import './transition.scss';
import { uuid } from 'uuidv4';
import * as React from 'react';
import { Todo } from '../todo';
import jsCookies from 'js-cookie';
import { ITodo } from '../../interfaces';
import { TodoInput } from '../todo-input';
import { Placeholder } from '../placeholder';
import { TodoCounter } from '../todo-counter';
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
        try {
            const { todos } = jsCookies.getJSON('todos');
            this.setState({ todos });
        }
        catch (e) {
            console.warn('Todos not found.');
        }
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
                    <h2 className={styles['title']}>
                        {'Today todos '}
                        <span className={styles['sub-title']}>
                            <TodoCounter todos={todos} />
                        </span>
                    </h2>
                    <CircularIconButton
                        icon={faTrashAlt}
                        onClick={() => this.setState({ todos: [] }, () => this.updateCookies())}
                    />
                </div>

                <div className={styles['todos-container']}>
                    {!!todos.length ?
                        (
                            <TransitionGroup>
                                {todos.map(todo =>
                                    <CSSTransition key={todo.id} timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
                                        <Todo
                                            key={todo.id}
                                            todo={todo}
                                            setCompleted={id => this.setTodoCompleted(id)}
                                            setDeleted={id => this.setTodoDeleted(id)}
                                        />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        ) : (
                            <TransitionGroup>
                                <CSSTransition timeout={{ enter: 300, exit: 300 }} classNames={'fade'}>
                                    <Placeholder />
                                </CSSTransition>
                            </TransitionGroup>
                        )
                    }
                </div>

                <TodoInput onSave={text => this.setState({ todos: [{ id: uuid(), desc: text, completed: false }, ...todos] }, () => this.updateCookies())} />
            </div >
        );
    }
}

export default TodoContainer;