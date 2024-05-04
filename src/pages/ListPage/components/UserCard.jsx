import React from "react";
import messageIcon from "../assets/message-icon.png";
import { Link } from "react-router-dom";

function UserCard({ item }) {
  return (
    <Link to={`/post/${item.id}`} className="w-[220px] h-[187px]">
      <div className="w-[220px] h-[187px] bg-[#ffffff] border-solid border-[1px] border-[#818181] rounded-2xl p-[20px]">
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={item.imageSource}
          alt={item.name}
        />
        <p className="text-[20px] font-normal text-[#000000] pt-[12px] pb-[25px]">
          {item.name}
        </p>
        <div className="flex justify-between text-[16px] font-normal text-[#818181]">
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
