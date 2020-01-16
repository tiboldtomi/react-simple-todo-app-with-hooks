import * as React from 'react';
import styles from './placeholder.module.scss';

const Placeholder: React.FC = () => (
    <div className={styles['placeholder']}>{'There are no tasks for today'}</div>
);

export default Placeholder;