import * as React from 'react';
import styles from './checkbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ICheckboxProps {
    checked: boolean;
    onChanged: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked, onChanged }) => (
    <div
        className={`${styles['container']}`}
        onClick={e => {
            e.stopPropagation();
            onChanged();
        }}
    >
        <FontAwesomeIcon className={`${styles['icon']} ${checked ? styles['checked'] : null}`} icon={faCheckCircle} />
    </div>
);

export default Checkbox;