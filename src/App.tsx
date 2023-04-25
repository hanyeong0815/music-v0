import { Route, Routes } from "react-router-dom";
import Home from "@/page/Home";
import UIPreview from "@components/example/layout/UIPreview";
import PATH from "@utils/routes/PATH";

function App() {
  const { HOME, LOGIN, SIGNUP, PW_CHK, MYPAGE } = PATH;

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={HOME} element={<Home />} />

        {/** unprotected */}
        <Route path="ui" element={<UIPreview />} />
      </Routes>
    </div>
  );
}

export default App;
