import React from 'react';
import messageIcon from '../assets/message-icon.png';
import { Link } from 'react-router-dom';

function UserCard({ item }) {
  return (
    <Link to={`/post/${item.id}`}>
      <div className="hover:border-[#1877F2] relative w-[155.5px] h-[168px] tablet-1:w-[220px] tablet-2:w-[220px] tablet-2:min-w-[186px] tablet-1:h-[187px] bg-[#ffffff] border-solid border-[1px] border-[#818181] rounded-2xl p-[20px]">
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={item.imageSource}
          alt={item.name}
        />
        <p className="w-[113.5px] tablet-1:w-[178px] text-[18px] tablet-1:text-[20px] truncate font-normal text-[#000000] pt-[12px]">
          {item.name}
        </p>
        <div className="absolute bottom-[16px] tablet-1:bottom-[20px] flex gap-[10px] tablet-1:gap-[70px] text-[16px] font-normal text-[#818181]">
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
