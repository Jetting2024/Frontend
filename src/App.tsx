import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import RecoverPwdPage from "./pages/RecoverPwdPage";
import InviteFriendsPage from "./pages/InviteFriendsPage";
import SelectDatePage from "./pages/SelectDatePage";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/recover" element={<RecoverPwdPage />} />
          <Route path="/invite" element={<InviteFriendsPage />} />
          <Route path="/select" element={<SelectDatePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
