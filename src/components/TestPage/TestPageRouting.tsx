import { Route, Routes } from "react-router-dom";
import TestNestedComposant from "./TestNestedComposant";
import TestPage from "./TestPage";

const TestPageRouting = () => {
  return (
    <Routes>
      {/* <Route path="" element={<TestPage />} /> */}
      <Route index element={<TestPage />} />
      <Route path="nested" element={<TestNestedComposant />} />
    </Routes>
  );
};

export default TestPageRouting;
