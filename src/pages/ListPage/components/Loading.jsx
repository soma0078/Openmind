import spinnerIcon from '../assets/spinner.png';

function Loading() {
  return (
    <div className="h-[536px] tablet-1:h-[394px] flex justify-center items-center">
      <img
        className="w-5 h-5 animate-spinw"
        src={spinnerIcon}
        alt="loading spinner"
      />
    </div>
  );
}

export default Loading;
