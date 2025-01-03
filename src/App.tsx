import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import RecoverPwdPage from "./pages/RecoverPwdPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar"; // NavBar 가져오기
import SchedulePage from "./pages/SchedulePage";
import InviteFriendsPage from "./pages/InviteFriendsPage";
import SelectDatePage from "./pages/SelectDatePage";
import MyProfilePage from "./pages/MyProfilePage";
import MyPlanListPage from "./pages/MyPlanListPage";
import SelectRegionPage from "./pages/SelectRegionPage";
import OAuth2RedirectHandler from "./auth/OAuth2RedirectHandler";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recover" element={<RecoverPwdPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/invite" element={<InviteFriendsPage />} />
          <Route path="/select-date" element={<SelectDatePage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/my-plan" element={<MyPlanListPage />} />
          <Route path="/select-region" element={<SelectRegionPage />} />
          
          <Route path="/member/kakao/callback" element={<OAuth2RedirectHandler />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
