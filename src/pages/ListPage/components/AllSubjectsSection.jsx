import { useEffect, useState } from "react";
import UserCard from "./UserCard.jsx";
import { getSubjects } from "../../../api/api.jsx";
import PaginationBar from "./PaginationBar.jsx";

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
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [subjectList, setSubjectList] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(0);

  const fetchSortedData = async ({ orderBy, page, pageSize }) => {
    const subjects = await getSubjects({ orderBy, page, pageSize });
    setSubjectList(subjects.results);
    setTotalPageNum(Math.ceil(subjects.count / pageSize));
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    fetchSortedData({ orderBy, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [orderBy, page, pageSize]);

  const onPageChange = (pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    fetchSortedData(
      `https://openmind-api.vercel.app/6-13/subjects/?limit=${pageSize}&offset=${offset}`
    );
    setPage(pageNumber);
  };

  return (
    <>
      <div className="w-[940px] h-[394px] grid grid-cols-4 gap-[20px]">
        {subjectList?.map((subject) => (
          <UserCard item={subject} key={subject.id} />
        ))}
      </div>
      <PaginationBar
        activePageNum={page}
        totalPageNum={totalPageNum}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default AllSubjectsSection;
