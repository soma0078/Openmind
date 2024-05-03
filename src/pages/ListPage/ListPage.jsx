import Header from "./components/Header";
import AllSubjectsSection from "./components/AllSubjectsSection";

function ListPage() {
  return (
    <div className="h-[100vh] bg-[#F9F9F9]">
      <Header />
      <div className="pt-[20px] flex justify-center items-center">
        <AllSubjectsSection />
      </div>
    </div>
  );
}

export default ListPage;
