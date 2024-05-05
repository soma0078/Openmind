import { useEffect, useState } from 'react';
import UserCard from './UserCard.jsx';
import { getSubjects } from '../../../api/api.js';
import PaginationBar from './PaginationBar.jsx';
import DropdownMenu from './DropdownMenu.jsx';

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

// limit가 기존의 pageSize와 역할이 같은것 같아서 다시 교체하겠습니다.
function AllSubjectsSection() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [subjectList, setSubjectList] = useState([]);
  const [sort, setSort] = useState('createdAt');

  const handleSortSelection = (sortOption) => {
    setSort(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize);

    // 기존의 fetchSortData가 useEffect 밖에 있고 호출만 안에 있었는데 같이 넣었습니다.
    const fetchData = async () => {
      const subjects = await getSubjects({ sort, page, pageSize });
      setSubjectList(subjects.results);
      setTotalPageNum(Math.ceil(subjects.count / pageSize));
    };

    fetchData();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sort, page, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

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
      <div className="pt-[40px] pb-[80px]">
        <PaginationBar
          activePageNum={page}
          totalPageNum={totalPageNum}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default AllSubjectsSection;
