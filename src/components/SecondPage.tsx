import React from 'react';
import Component1 from './Component1';
import Component2 from './Component2';

const SecondPage: React.FC = () => {
    return (
        <div className=' h-full w-full flex flex-col space-y-10'>
            <Component1 />
            <Component2 />
        </div>
    );
};

export default SecondPage;
