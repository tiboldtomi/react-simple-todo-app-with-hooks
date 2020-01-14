import * as React from 'react';
import styles from './circular-icon-button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ICircularIconButtonProps {
    icon: IconDefinition;
    onClick: () => void;
}

const CircularIconButton: React.FC<ICircularIconButtonProps> = ({ icon, onClick }) => (
    <button className={styles['btn']} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
    </button>
);

export default CircularIconButton;