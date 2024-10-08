import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import RecoverPwdPage from "./pages/RecoverPwdPage";
<<<<<<< HEAD
import InviteFriendsPage from "./pages/InviteFriendsPage";
=======
import TestPage from "./pages/TestPage";
>>>>>>> cff0e1a8ff203420c1815a78e1ef1653c6748f7c

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/recover" element={<RecoverPwdPage />} />
<<<<<<< HEAD
          <Route path="/invite" element={<InviteFriendsPage />} />
=======
          <Route path="/test" element={<TestPage />} />
>>>>>>> cff0e1a8ff203420c1815a78e1ef1653c6748f7c
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
