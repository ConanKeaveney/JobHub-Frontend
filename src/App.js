// React
import styled from "@emotion/styled";
import Background from "assets/img/dots.png";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Components & Hooks
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import {
  StitchAuthProvider,
  useStitchAuth,
} from "./components/login/StitchAuth";
import Banner from "./components/navbar/Banner";
import Navbar from "./components/navbar/Navbar";
import NoNavbar from "./components/navbar/NoNavbar";
// Router
import PrivateRoute from "./components/routes/PrivateRoute";
import { storeUserData } from "./redux/actions/bannerActions";
import Boards from "./views/board/board_list_page/Boards";
import Board from "./views/board/board_page/Board";
import JobsPage from "./views/jobs/job_list_page/JobsPage";
import LandingPage from "./views/LandingPage/LandingPage";

// eslint-disable-next-line no-use-before-define

require("dotenv").config();
App.propTypes = {};
export default function App() {
  return (
    <StitchAuthProvider>
      <AppUI />
    </StitchAuthProvider>
  );
}

// eslint-disable-next-line no-use-before-define
AppUI.propTypes = {};

function AppUI() {
  const {
    isLoggedIn,
    currentUser,
    actions: { handleLogout },
  } = useStitchAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeUserData(currentUser, isLoggedIn));
  }, []);

  return (
    <Router>
      <Layout>
        {isLoggedIn ? (
          <Banner
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        ) : (
          <NoNavbar />
        )}

        {isLoggedIn ? <Navbar /> : <NoNavbar />}

        <Route exact path="/" component={LandingPage}>
          {isLoggedIn ? <Redirect to="/boards" /> : <LandingPage />}
        </Route>
        {/* boards */}
        <PrivateRoute
          exact
          path="/boards"
          currentUser={currentUser}
          component={Boards}
        />
        <PrivateRoute
          path="/boards/:boardid"
          currentUser={currentUser}
          component={Board}
        />
        {/* Jobs */}
        <PrivateRoute
          exact
          path="/jobs"
          currentUser={currentUser}
          component={JobsPage}
        />
      </Layout>
    </Router>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background: #1c0a29;
  background-image: url(${Background});
  background-size: contain;
  width: 100vw;
  height: 100vh;
  GridItem {
    font-family: sans-serif;
  }
`;
