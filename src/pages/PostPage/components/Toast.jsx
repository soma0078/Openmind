import React from 'react';

function Toast({ show }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {show && (
        // animation fade out 처리할 것
        <span className="absolute animate-pulse bg-[var(--Grayscale-60)] rounded-lg py-2 px-5 text-sm text-[#FFFFFF] font-medium">
          URL이 복사되었습니다.
        </span>
      )}
    </div>
  );
}

export default Toast;
