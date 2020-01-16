import * as React from 'react';
import { animated } from 'react-spring';
import styles from './placeholder.module.scss';

const Placeholder: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style }) => (
    <animated.div style={style} className={styles['placeholder']}>{'There are no tasks for today'}</animated.div>
);

export default Placeholder;