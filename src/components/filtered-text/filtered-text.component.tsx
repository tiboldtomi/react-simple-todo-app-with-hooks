import * as React from 'react';

interface IFilteredTextProps { }

const FilteredText: React.FC<IFilteredTextProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
    let rawText: string = (children?.toString() as string);
    const text: string = rawText.length > 32 ? rawText.slice(0, 32).concat('...') : rawText;

    return <div {...props} title={rawText.length > 32 ? rawText : ''}>{text}</div>;
};

export default FilteredText;