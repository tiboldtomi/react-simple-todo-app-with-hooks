import * as React from 'react';
import { animated } from 'react-spring';

interface IFilteredTextProps { }

const FilteredText: React.FC<IFilteredTextProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    let rawText: string = (children?.toString() as string);
    const maxCharCount: number = 34;
    const text: string = rawText.length > maxCharCount ? rawText.slice(0, maxCharCount - 3).concat('...') : rawText;

    return <animated.div {...props} title={rawText.length > maxCharCount ? rawText : ''}>{text}</animated.div>;
};

export default FilteredText;