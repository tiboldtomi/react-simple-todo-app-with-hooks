import * as React from 'react';
import styles from './app.module.scss';
import reactLogo from '../../assets/logo192.png';
import { TodoContainer } from '../todo-container';

interface IAppProps { }

const App: React.FC<IAppProps> = () => {

    return (
        <div className={styles['app-container']}>
            <img alt={'React Logo'} className={styles['app-logo']} src={reactLogo} />
            <div className={styles['app-title']}>{'React Simple TODO App'}</div>

            <TodoContainer />
        </div>
    );
}

export default App;