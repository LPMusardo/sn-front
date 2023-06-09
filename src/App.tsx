import { Route, Routes } from "react-router-dom";
import Login from "./components/AuthPage/Login";
import Register from "./components/AuthPage/Register";
import EventListPage from "./components/EventListPage/EventListPage";
import EventPage from "./components/EventPage/EventPage";
import MainPage from "./components/HomePage/MainPage";
import PrivateUserPage from "./components/PrivateUserPage/PrivateUserPage";
import PublicUserPage from "./components/PublicUserPage/PublicUserPage";
import TestPageRouting from "./components/TestPage/TestPageRouting";
import { QAPage } from "./components/QAPage/QAPage";
import { AboutUsPage } from "./components/AboutUsPage/AboutUsPage";
import Error404 from "./components/ErrorPages/Error404";


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
        <Route path="aboutus" Component={AboutUsPage} />
        <Route path="404" Component={Error404} />


        <Route path="/profile/*" element={<PrivateUserPage />} />

        <Route path="/test/*" element={<TestPageRouting />} />
        <Route path="*" Component={MainPage} />
      </Routes>
    </>
  );
}

export default App;
