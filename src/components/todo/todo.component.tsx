import * as React from 'react';
import { Checkbox } from '../checkbox';
import styles from './todo.module.scss';
import { ITodo } from '../../interfaces';
import { FilteredText } from '../filtered-text';
import { useGesture } from 'react-with-gesture';
import { useSpring, animated, OpaqueInterpolation, interpolate, config } from 'react-spring';

interface ITodoProps {
    todo: ITodo;
    y: OpaqueInterpolation<number>;
    setDeleted: (id: string) => void;
    setCompleted: (id: string) => void;
    opacity: OpaqueInterpolation<number>;
}

const Todo: React.FC<ITodoProps> = ({ todo, setCompleted, setDeleted, y, opacity: wrapperOpacity }) => {
    const { desc, completed, id } = todo;
    const [bind, { delta, down }] = useGesture();
    const { opacity, borderColor, textDecoration, boxShadow } = useSpring({
        opacity: completed ? 0.4 : 1,
        boxShadow: completed ? '0 0 0px rba(0,0,0,0)' : '0 0 10px rgba(0,0,0,0.3)',
        borderColor: completed ? 'rgba(136,136,136,0.6)' : 'rgba(107,188,201,1)',
        textDecoration: completed ? 'line-through' : 'none',
    });

    const { x } = useSpring({
        x: down ? delta[0] : (delta[0] < -200 ? -350 : (delta[0] > 200) ? 350 : 0),
        onFrame: ({ x }: any) => {
            if ((x < -300 || x > 300) && !down) {
                setDeleted(id);
            }
        },
        config: config.wobbly
    });

    return (
        <animated.div
            className={styles['wrapper']}
            {...bind()}
            style={{
                opacity: !down ? wrapperOpacity : x.interpolate({ range: [-350, -160, -100, 0, 100, 160, 350], output: [0.3, 0.6, 1, 1, 1, 0.6, 0.3] }),
                transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
            }}
        >
            <animated.div
                style={{ opacity, borderColor, boxShadow }}
                className={styles['container']}
            >
                <Checkbox checked={completed} onChanged={() => setCompleted(id)} />
                <FilteredText className={styles['description']} style={{ textDecoration }}>{desc}</FilteredText>
            </animated.div>
        </animated.div>
    );
}

export default Todo;