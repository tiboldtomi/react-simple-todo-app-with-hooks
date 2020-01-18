import * as React from 'react';
import { Checkbox } from '../checkbox';
import styles from './todo.module.scss';
import { ITodo } from '../../interfaces';
import { FilteredText } from '../filtered-text';
import { useGesture } from 'react-with-gesture';
import { useSpring, animated, OpaqueInterpolation, interpolate, config } from 'react-spring';

interface ITodoProps {
    todo: ITodo;
    width: number;
    y: OpaqueInterpolation<number>;
    setDeleted: (id: string) => void;
    setCompleted: (id: string) => void;
    opacity: OpaqueInterpolation<number>;
}

const Todo: React.FC<ITodoProps> = ({ todo, setCompleted, setDeleted, y, opacity: wrapperOpacity, width }, ref) => {
    const { desc, completed, id } = todo;
    const [bind, { delta, down }] = useGesture();
    const { opacity, borderColor, textDecoration, boxShadow } = useSpring({
        opacity: completed ? 0.4 : 1,
        boxShadow: completed ? '0 0 0px rba(0,0,0,0)' : '0 0 10px rgba(0,0,0,0.3)',
        borderColor: completed ? 'rgba(136,136,136,0.6)' : 'rgba(107,188,201,1)',
        textDecoration: completed ? 'line-through' : 'none',
    });

    const swipeLimitToDelete: number = width * 0.7;
    const deletedXPosition: number = width * 1.6;

    const { x } = useSpring({
        x: down ? delta[0] : (delta[0] < -swipeLimitToDelete ? -deletedXPosition : (delta[0] > swipeLimitToDelete ? deletedXPosition : 0)),
        onFrame: ({ x }: any) => {
            if ((x < -swipeLimitToDelete || x > swipeLimitToDelete) && !down) {
                setDeleted(id);
            }
        },
        config: config.stiff
    });

    return (
        <animated.div
            ref={ref}
            {...bind()}
            className={styles['wrapper']}
            style={{
                opacity: delta[0] === 0
                    ? wrapperOpacity
                    : x.interpolate({
                        range: [-deletedXPosition, -(deletedXPosition * 0.6), -(deletedXPosition * 0.3), 0, (deletedXPosition * 0.3), (deletedXPosition * 0.6), deletedXPosition],
                        output: [0, 0.25, 0.35, 1, 0.35, 0.25, 0]
                    }),
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
};

export default React.forwardRef(Todo);