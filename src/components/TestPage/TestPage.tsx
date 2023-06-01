import { Outlet } from "react-router-dom";


const TestPage = () => {
  return (
    <>
      <div>La page de test </div>
      <Outlet />
    </>
  );
};

export default TestPage;
