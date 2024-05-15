import { useEffect, useState } from 'react';
import { getSubjects } from '../../../api/api.js';
import UserCard from './UserCard';
import PaginationBar from './PaginationBar';
import DropdownMenu from './DropdownMenu';
import Loading from './Loading';

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
  const [loading, setLoading] = useState(true);

  const handleSortSelection = (sortOption) => {
    setSort(sortOption);
  };

  useEffect(() => {
    // 페이지가 변경될때마다 세션스토리지 업데이트
    sessionStorage.setItem('page', page);

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize);

    // 기존의 fetchSortData가 useEffect 밖에 있고 호출만 안에 있었는데 같이 넣었습니다.
    const fetchData = async () => {
      const subjects = await getSubjects({ sort, page, pageSize });
      setLoading(false);
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
    <div className="flex flex-col gap-4 tablet-1:gap-8 bg-[var(--Grayscale-20)]">
      <div className="z-20 flex items-center justify-between px-6 pt-8 tablet-1:px-8 tablet-1:flex-col tablet-1:gap-5">
        <p className="text-2xl font-normal tablet-1:text-5xl">
          누구에게 질문할까요?
        </p>
        <DropdownMenu onSortSelection={handleSortSelection} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col items-center gap-6 justify-evenly">
          <div className="grid grid-cols-2 gap-4 tablet-1:grid-cols-3 tablet-2:grid-cols-4 pc:grid-cols-4 tablet-1:gap-5">
            {subjectList?.map((subject) => (
              <UserCard item={subject} key={subject.id} />
            ))}
          </div>
          <div className="flex justify-center">
            <PaginationBar
              activePageNum={page}
              totalPageNum={totalPageNum}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSubjectsSection;
