import React, { useState, useImperativeHandle, forwardRef} from 'react';
import Button from '@mui/material/Button';

interface Props {
    buttonLabel: string;
    children: React.ReactNode;
}

const Togglable = forwardRef(({ buttonLabel, children }: Props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible)
    };

    useImperativeHandle(ref, () => {
        return {toggleVisibility};
    });
    return (
        <div>
            <div>
                <Button variant='contained' onClick={toggleVisibility}>{buttonLabel}</Button>
            </div>
            <div>
                {children}
                <Button variant='contained' color='error' onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    );
});

export default Togglable;