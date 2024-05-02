import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<ListPage />} />
        <Route path="/" element={<Navigate to="/list" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
