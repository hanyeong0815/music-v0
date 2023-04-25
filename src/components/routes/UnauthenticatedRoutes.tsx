import UIPreview from "@components/example/layout/UIPreview";
import SignUp from "@components/signup/SignUp";
import PATH from "@utils/routes/PATH";
import { Navigate, Route, Routes } from "react-router-dom";

const UnauthenticatedRoutes = () => {
  const { LOGIN, SIGNUP } = PATH;
  return (
    <Routes>
      <Route path="ui" element={<UIPreview />} />
      <Route path="*" element={<Navigate replace to={LOGIN} />} />
    </Routes>
  );
};

export default UnauthenticatedRoutes;
