import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PostPage from "./pages/postPage/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
