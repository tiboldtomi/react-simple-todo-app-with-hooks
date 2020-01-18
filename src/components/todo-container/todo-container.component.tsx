import { uuid } from 'uuidv4';
import { Todo } from '../todo';
import jsCookies from 'js-cookie';
import { ITodo } from '../../interfaces';
import { TodoInput } from '../todo-input';
import useMeasure from 'react-use-measure';
import { useTransition } from 'react-spring';
import { Placeholder } from '../placeholder';
import { TodoCounter } from '../todo-counter';
import styles from './todo-container.module.scss';
import React, { useState, useEffect } from 'react';
import { CircularIconButton } from '../circular-icon-button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface ITodoContainerProps { }

const TodoContainer: React.FC<ITodoContainerProps> = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [todoRef, { height: todoHeight, width: todoWidth }] = useMeasure();

    const todoTransitions = useTransition(
        todos.map((t, index) => ({ ...t, y: index * todoHeight * 1.3 })),
        todo => todo.id,
        {
            from: { opacity: 0 },
            leave: { opacity: 0 },
            enter: ({ y }) => ({ y, opacity: 1 }),
            update: ({ y }) => ({ y, opacity: 1 }),
        }
    );

    const switchAnimations = useTransition(todos.length > 0, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    useEffect(() => {
        try {
            const { todos } = jsCookies.getJSON('todos');
            setTodos(todos);
        }
        catch (e) {
            console.warn('Todos not found.');
        }
    }, []);

    // eslint-disable-next-line
    useEffect(() => updateCookies(), [todos]);

    const updateCookies = () => {
        jsCookies.set('todos', { todos }, { expires: 1 });
    }

    const setTodoCompleted = (id: string) => {
        let selectedTodo: ITodo = { ...todos[todos.findIndex(todo => todo.id === id)] };
        selectedTodo = {
            ...selectedTodo,
            completed: !selectedTodo.completed
        }
        let updatedTodos: ITodo[];
        if (selectedTodo.completed) {
            updatedTodos = [...todos.filter(todo => todo.id !== id), selectedTodo];
        }
        else {
            updatedTodos = [selectedTodo, ...todos.filter(todo => todo.id !== id)];
        }
        setTodos(updatedTodos);
    }

    const setTodoDeleted = (id: string) => {
        setTodos(todos.filter(t => t.id !== id));
    }

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
                    onClick={() => setTodos([])}
                />
            </div>

            <div className={styles['todos-container']}>
                {switchAnimations.map(({ item, props }) =>
                    item
                        ? (
                            <React.Fragment key={'_todos-fragment'}>
                                {todoTransitions.map(({ item, props }) => {
                                    const { y, opacity } = props as any;
                                    return <Todo
                                        y={y}
                                        todo={item}
                                        ref={todoRef}
                                        key={item.id}
                                        width={todoWidth}
                                        opacity={opacity}
                                        setDeleted={setTodoDeleted}
                                        setCompleted={setTodoCompleted}
                                    />
                                })}
                            </React.Fragment>
                        )
                        : <Placeholder key={'_placeholder'} style={{ ...props }} />
                )}
            </div>

            <TodoInput onSave={desc => setTodos([{ id: uuid(), desc, completed: false }, ...todos])} />
        </div>
    );
}

export default TodoContainer;