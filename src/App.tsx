import { Route, Routes } from "react-router-dom";
import PrivateUserPage from "./components/PrivateUserPage/PrivateUserPage";
import MainPage from "./components/HomePage/MainPage";
import PublicUserPage from "./components/PublicUserPage/PublicUserPage";
import EventPage from "./components/EventPage/EventPage";
import EventListPage from "./components/EventListPage/EventListPage";
import SearchContextProvider from "./components/EventListPage/SearchContextProvider";

function App() {
  // const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <>
      <Routes>
        <Route path="/" Component={MainPage} />
        <Route path="/users/:id" Component={PublicUserPage} />
        <Route path="/profile" Component={PrivateUserPage} />
        <Route path="/profile/:sectionId" Component={PrivateUserPage} />
        <Route path="/events/:id" Component={EventPage} />
        <Route path="/search" Component={EventListPage} />
      </Routes>
    </>
  );
}

export default App;
