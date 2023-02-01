import {Route, Routes} from "react-router-dom";
import Home from "@components/home/Home";
import UIPreview from "@components/example/layout/UIPreview";
import PATH from "@utils/routes/PATH";
import Loginprogress from "@components/login/Loginprogress";
import SignUp from "@components/signup/SignUp";
import PwChk from "@components/pwchk/PwChk";

function App() {
  const { HOME, LOGIN, SIGNUP, PWCHK, MYPAGE } = PATH;

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={HOME} element={<Home />} />

        {/** unprotected */}
        <Route path={LOGIN} element={<Loginprogress />} />
        <Route path={SIGNUP} element={<SignUp />} />

        <Route path={PWCHK} element={<PwChk />} />

        <Route path="ui" element={<UIPreview />} />
      </Routes>
    </div>
  );
}

export default App;
