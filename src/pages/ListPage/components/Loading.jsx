import spinnerIcon from '../assets/spinner.png';

function Loading() {
  return (
    <div className="h-[536px] tablet-1:h-[394px] flex justify-center items-center">
      <img
        className="animate-spin w-[20px] h-[20px]"
        src={spinnerIcon}
        alt="loading spinner"
      />
    </div>
  );
}

export default Loading;
