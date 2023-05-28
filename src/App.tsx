import { Route, Routes } from "react-router-dom";
import PrivateUserPage from "./components/PrivateUserPage/PrivateUserPage";
import MainPage from "./components/HomePage/MainPage";
import PublicUserPage from "./components/PublicUserPage/PublicUserPage";
import EventPage from "./components/EventPage/EventPage";
import EventListPage from "./components/EventListPage/EventListPage";
import Register from "./components/AuthPage/Register";
import Login from "./components/AuthPage/Login";
import PanelApplications from "./components/PrivateUserPage/Panels/PanelApplications/PanelApplications";
import TestPage from "./components/TestPage/TestPage";
import TestNestedComposant from "./components/TestPage/TestNestedComposant";
import PanelInformations from "./components/PrivateUserPage/Panels/PanelInformations";
import PanelGivenNotes from "./components/PrivateUserPage/Panels/PanelGivenNotes";
import PanelEvents from "./components/PrivateUserPage/Panels/PanelEvents/PanelEvents";
import PanelReceivedNotes from "./components/PrivateUserPage/Panels/PanelReceivedNotes";
import TestPageRouting from "./components/TestPage/TestPageRouting";
import PanelContainer from "./components/PrivateUserPage/PanelContainer";

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

        <Route path="/profile/*" element={<PrivateUserPage />}/>

        <Route path="/test/*" element={<TestPageRouting />}/>
        <Route path="*" Component={MainPage} />
      </Routes>
    </>
  );
}

export default App;
