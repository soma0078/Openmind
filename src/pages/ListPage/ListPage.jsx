import Header from './components/Header';
import AllSubjectsSection from './components/AllSubjectsSection';

function ListPage() {
  return (
    <div className="h-[100vh] flex flex-col bg-[var(--Grayscale-20)]">
      <Header />
      <AllSubjectsSection />
    </div>
  );
}

export default ListPage;
