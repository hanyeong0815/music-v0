import UIPreview from "@components/example/layout/UIPreview";
import Home from "@components/home/Home";
import PATH from "@utils/routes/PATH";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoutes = () => {
  const { HOME } = PATH;

  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path="ui" element={<UIPreview />} />
      <Route path="*" element={<Navigate replace to={HOME} />} />
    </Routes>
  );
};

export default ProtectedRoutes;
