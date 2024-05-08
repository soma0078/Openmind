import React from 'react';

function Question({question}) {
  
  return (
    <div className='text-[18px] text-[400]'>
      {question.content}
    </div>
  );
}

export default Question;
