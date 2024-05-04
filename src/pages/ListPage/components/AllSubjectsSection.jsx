import { useEffect, useState } from "react";
import UserCard from "./UserCard.jsx";
import { getSubjects } from "../../../api/api.jsx";
import DropdownMenu from "./DropdownMenu.jsx";

// tailwind media query 적용 시 참고
// md (min-width: 768px)
// xl (min-width: 1280px)

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 6;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 8;
  }
};

function AllSubjectsSection() {
  // 안 쓰는 부분은 일단 주석 처리 해두겠습니다
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(getPageSize());

  const [subjectList, setSubjectList] = useState([]);
  const [sort, setSort] = useState("name");
  const [limit, setLimit] = useState(getPageSize());

  // 일단 저는 sort, limit만 아규먼트로 전달해주었습니다
  // 페이지네이션 적용 시에 page, pageSize, ... 필요할 것으로 보입니다
  const fetchSortedData = async ({ sort, limit }) => {
    const subjects = await getSubjects({ sort, limit });
    setSubjectList(subjects.results);
  };

  const handleSortSelection = (sortOption) => {
    setSort(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      // setPageSize(getPageSize());
      setLimit(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ sort, limit });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sort, limit]);

  // const onPageChange = (pageNumber) => {
  //   setPage(pageNumber);
  // };

  return (
    <div className="flex flex-col gap-[16px] md:gap-[40px]">
      <div className="z-20 pt-[40px] flex md:flex-col gap-[20px] justify-center items-center">
        <p className="w-[341px] h-[48px] text-[24px] md:text-[40px] font-normal">
          누구에게 질문할까요?
        </p>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
      gap-[16px] md:gap-[20px]"
      >
        {subjectList?.map((subject) => (
          <UserCard item={subject} key={subject.id} />
        ))}
      </div>
    </div>
  );
}

export default AllSubjectsSection;
