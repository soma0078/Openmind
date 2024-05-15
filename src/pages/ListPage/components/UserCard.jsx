import React from 'react';
import { Link } from 'react-router-dom';
import messageIcon from '../assets/message-icon.png';

function UserCard({ item }) {
  return (
    <Link to={`/post/${item.id}`}>
      <div
        className="h-[168px] tablet-1:h-[187px]
        max-w-[155.5px] min-w-[155.5px] tablet-1:max-w-[220px] tablet-1:min-w-[220px] tablet-2:max-w-[220px] tablet-2:min-w-[186px] pc:w-[220px]
      hover:border-[var(--Blue-50)] relative bg-[var(--Grayscale-10)] border-solid border-2 border-[var(--Grayscale-40)] rounded-2xl p-5"
      >
        <img
          className="rounded-full w-14 h-14 tablet-1:w-16 tablet-1:h-16"
          src={item.imageSource}
          alt={item.name}
        />
        <p className="text-lg tablet-1:text-xl truncate font-normal text-[var(--Grayscale-60)] pt-3">
          {item.name}
        </p>
        <div className="mt-3 tablet-1:mt-6 flex justify-between text-base font-normal text-[var(--Grayscale-40)]">
          <div className="flex items-center justify-center gap-1">
            <img
              className="w-4 h-4 tablet-1:w-5 tablet-1:h-5"
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
