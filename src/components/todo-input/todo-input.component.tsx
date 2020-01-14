import * as React from 'react';
import styles from './todo-input.module.scss';
import { CircularIconButton } from '../circular-icon-button';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface ITodoInputProps {
    onSave: (text: string) => void;
}

interface ITodoInputState {
    text: string;
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
    public constructor(props: ITodoInputProps) {
        super(props);

        this.state = {
            text: ''
        }
    }

    private inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        this.setState({ text });
    }

    public render(): React.ReactElement<ITodoInputProps> {
        const { text } = this.state;
        const { onSave } = this.props;

        return (
            <div className={styles['input-container']}>
                <input
                    value={text}
                    type={'text'}
                    className={styles['input']}
                    onChange={this.inputChanged}
                    placeholder={'Add a task...'}
                    onKeyUp={e => (e.keyCode === 13 && text !== '') && this.setState({ text: '' }, () => onSave(text))}
                />
                <CircularIconButton
                    icon={faArrowUp}
                    onClick={() => text !== '' && this.setState({ text: '' }, () => onSave(text))}
                />
            </div>
        );
    }
}

export default TodoInput;