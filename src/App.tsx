import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignupPage from "./pages/SignupPage";
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
          <Route path="/select" element={<SelectDatePage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/my-plan" element={<MyPlanListPage />} />
          <Route path="/select-region" element={<SelectRegionPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
