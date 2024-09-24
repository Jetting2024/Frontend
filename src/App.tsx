import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil"; // RecoilRoot 추가
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import RecoverPwdPage from "./pages/RecoverPwdPage";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/recover" element={<RecoverPwdPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
