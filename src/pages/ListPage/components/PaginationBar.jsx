import Pagination from "react-js-pagination";
import "./PaginationBar.css";

const PaginationBar = ({ subjectTotalCount, onPageChange, page, pageSize }) => {
  const handlePageChange = (pageNumber) => {
    console.log("Page changed to: ", pageNumber); // 로그 추가
    onPageChange(pageNumber);
  };
  return (
    <Pagination
      innerClass="Pagination"
      activePage={page} // 현재 페이지
      itemsCountPerPage={pageSize} // 한 페이지에 보여줄 아이템 갯수
      totalItemsCount={subjectTotalCount} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // 이전
      nextPageText={"›"} // 다음
      firstPageText={""} // 맨 앞 버튼 제거
      lastPageText={""} // 맨 끝 버튼 제거
      onChange={handlePageChange} // 페이지 변경 핸들링
    />
  );
};

export default PaginationBar;
