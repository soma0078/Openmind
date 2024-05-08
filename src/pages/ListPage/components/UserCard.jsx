import React from 'react';
import messageIcon from '../assets/message-icon.png';
import { Link } from 'react-router-dom';

function UserCard({ item }) {
  return (
    <Link to={`/post/${item.id}`}>
      <div
        className="h-[168px] tablet-1:h-[187px]
        max-w-[155.5px] min-w-[155.5px] tablet-1:max-w-[220px] tablet-1:min-w-[220px] tablet-2:max-w-[220px] tablet-2:min-w-[186px] pc:w-[220px]
      hover:border-[#1877F2] relative bg-[#ffffff] border-solid border-[1px] border-[#818181] rounded-2xl p-[20px]"
      >
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={item.imageSource}
          alt={item.name}
        />
        <p className="text-[18px] tablet-1:text-[20px] truncate font-normal text-[#000000] pt-[12px]">
          {item.name}
        </p>
        <div className="mt-[10px] tablet-1:mt-[25px] flex justify-between text-[16px] font-normal text-[#818181]">
          <div className="flex justify-center items-center gap-[4px]">
            <img
              className="w-[18px] h-[18px]"
              src={messageIcon}
              alt="메세지 아이콘"
            />
            <p>받은 질문</p>
          </div>
          <p>{item.questionCount}개</p>
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
