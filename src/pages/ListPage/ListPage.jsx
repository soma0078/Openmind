import Header from './components/Header';
import AllSubjectsSection from './components/AllSubjectsSection';

function ListPage() {
  return (
    <div className="h-[100vh] flex flex-col bg-[#F9F9F9]">
      <Header />
      <AllSubjectsSection />
    </div>
  );
}

export default ListPage;
