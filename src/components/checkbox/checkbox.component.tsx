import * as React from 'react';
import styles from './checkbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ICheckboxProps {
    checked: boolean;
    onChanged: () => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked, onChanged }) => (
    <div className={`${styles['container']}`} onClick={onChanged}>
        {checked && <FontAwesomeIcon icon={faCheckCircle} color={'#999'} />}
    </div>
);

export default Checkbox;