// import React, { useState } from "react";
// import arrowUp from "../assets/arrow-up.png";

// function DropdownMenu({ onSortSelection }) {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(!isDropdownVisible);
//   };

//   const [sortSelection, setSortSelection] = useState("이름순");

//   return (
//     <div
//       className="w-[79px] h-[34px] rounded-lg border-[1px] bg-[#ffffff]
//      border-[#000000] text-[14px] font-medium"
//     >
//       <button
//         className="flex gap-[4px] justify-center items-center px-[11px] py-[5px]"
//         onClick={toggleDropdown}
//       >
//         {sortSelection}
//         <img className="w-[14px] h-[14px]" src={arrowUp} alt="^" />
//       </button>

//       {isDropdownVisible && (
//         <div
//           className="mt-[15px] w-[79px] h-[68px] rounded-lg border-[1px] bg-[#ffffff]
//         border-[#8c8c8c] text-[14px] font-medium text-center cursor-pointer z-99 text-[#515151]"
//         >
//           <div
//             className="w-[79px] h-[30px] py-[5px]"
//             onClick={() => {
//               onSortSelection("name");
//               setSortSelection("이름순");
//               setIsDropdownVisible(false);
//             }}
//           >
//             이름순
//           </div>
//           <div
//             className="w-[79px] h-[30px] py-[5px]"
//             onClick={() => {
//               onSortSelection("createdAt");
//               setSortSelection("최신순");
//               setIsDropdownVisible(false);
//             }}
//           >
//             최신순
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default DropdownMenu;
