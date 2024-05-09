import { useEffect, useState } from 'react';
import UserCard from './UserCard.jsx';
import { getSubjects } from '../../../api/api.js';
import PaginationBar from './PaginationBar.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import Loading from './Loading.jsx';

// tailwind media query 적용 시 참고
// md (min-width: 768px)
// xl (min-width: 1280px)

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 6;
  } else if (width < 868) {
    // Tablet-1 viewport
    return 6;
  } else if (width < 1280) {
    // Tablet-2 viewport
    return 8;
  } else {
    // Desktop viewport
    return 8;
  }
};

function AllSubjectsSection() {
  const pageFromStorage = Number(sessionStorage.getItem('page')) || 1;
  const [page, setPage] = useState(pageFromStorage);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [totalPageNum, setTotalPageNum] = useState(0);
  const [subjectList, setSubjectList] = useState([]);
  const [sort, setSort] = useState('createdAt');
  const [limit, setLimit] = useState(getPageSize());
  const [loading, setLoading] = useState(true);

  // 일단 저는 sort, limit만 아규먼트로 전달해주었습니다
  // 페이지네이션 적용 시에 page, pageSize, ... 필요할 것으로 보입니다
  const fetchSortedData = async ({ sort, limit }) => {
    const subjects = await getSubjects({ sort, limit });
    setLoading(false);
    setSubjectList(subjects.results);
    setTotalPageNum(Math.ceil(subjects.count / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setSort(sortOption);
  };

  useEffect(() => {
    // 페이지가 변경될때마다 세션스토리지 업데이트
    sessionStorage.setItem('page', page);

    const handleResize = () => {
      setLimit(getPageSize());
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize);
    fetchSortedData({ sort, limit });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sort, limit, page, pageSize]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-[16px] tablet-1:gap-[40px]">
      <div className="px-[24px] tablet-1:px-[32px] z-20 pt-[30px] flex tablet-1:flex-col tablet-1:gap-[20px] justify-between items-center">
        <p className="w-[214px] tablet-1:w-[341px] text-[24px] tablet-1:text-[40px] font-normal">
          누구에게 질문할까요?
        </p>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="px-[24px] flex justify-center">
          <div
            className="
            grid grid-cols-2 tablet-1:grid-cols-3 tablet-2:grid-cols-4 pc:grid-cols-4 
            gap-[16px] tablet-1:gap-[20px]"
          >
            {subjectList?.map((subject) => (
              <UserCard item={subject} key={subject.id} />
            ))}
          </div>
        </div>
      )}

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
