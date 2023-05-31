import { Route, Routes } from "react-router-dom";
import PrivateUserPage from "./components/PrivateUserPage/PrivateUserPage";
import MainPage from "./components/HomePage/MainPage";
import PublicUserPage from "./components/PublicUserPage/PublicUserPage";
import EventPage from "./components/EventPage/EventPage";
import EventListPage from "./components/EventListPage/EventListPage";
import Register from "./components/AuthPage/Register";
import Login from "./components/AuthPage/Login";
import TestPageRouting from "./components/TestPage/TestPageRouting";
import { QAPage } from "./components/QAPage/QAPage";

function App() {
  // const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <>
      <Routes>
        <Route index Component={MainPage} />
        <Route path="login" Component={Login} />
        <Route path="signup" Component={Register} />
        <Route path="users/:id" Component={PublicUserPage} />
        <Route path="events/:id" Component={EventPage} />
        <Route path="search" Component={EventListPage} />
        <Route path="Q&A" Component={QAPage} />

        <Route path="/profile/*" element={<PrivateUserPage />}/>

        <Route path="/test/*" element={<TestPageRouting />}/>
        <Route path="*" Component={MainPage} />
      </Routes>
    </>
  );
}

export default App;
