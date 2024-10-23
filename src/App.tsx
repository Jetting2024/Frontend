import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import RecoverPwdPage from "./pages/RecoverPwdPage";
import TestPage from "./pages/TestPage";
import LoginForm from "./components/signin/LoginForm";
import RegisterForm from "./components/signup/RegisterForm";
import Navbar from "./components/Navbar"; // NavBar 가져오기
import SchedulePage from "./pages/SchedulePage";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/recover" element={<RecoverPwdPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
