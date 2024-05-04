import { useEffect, useState } from "react";
import UserCard from "./UserCard.jsx";
import { getSubjects } from "../../../api/api.jsx";
import PaginationBar from "./PaginationBar.jsx";
import DropdownMenu from './DropdownMenu.jsx';

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

  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [subjectList, setSubjectList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(0);

  const fetchSortedData = async ({ sort, page, pageSize }) => {
    const subjects = await getSubjects({ sort, page, pageSize });
    setSubjectList(subjects.results);
    setTotalPageNum(Math.ceil(subjects.count / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setSort(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize);
    fetchSortedData({ sort, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sort, page, pageSize]);

  // const onPageChange = (pageNumber) => {
  //   setPage(pageNumber);
  // };

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="z-20 pt-[40px] flex flex-col gap-[20px] justify-center items-center">
        <p className="w-[341px] h-[48px] text-[40px] font-normal">
          누구에게 질문할까요?
        </p>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>
      <div className="w-[940px] h-[394px] grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-[20px]">   
        {subjectList?.map((subject) => (
          <UserCard item={subject} key={subject.id} />
        ))}
      </div>
      <div className="pt-[40px] pb-[80px]">
        <PaginationBar
          activePageNum={page}
          totalPageNum={totalPageNum}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default AllSubjectsSection;
