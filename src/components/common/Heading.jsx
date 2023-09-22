import React, { ReactNode } from 'react';


const Heading = ({ type, text, ...args }) => {
  return (
    <>
      {type == 'h1' && (
        <h1 className="text-4xl font-bold pt-4" {...args}>
          {text}
        </h1>
      )}
    </>
  );
};

export default Heading;
