import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./reset.css";
import LoginPage from "./pages/LoginPage";
import TimeLinePage from "./pages/TimeLinePage";
import { UserContextProvider } from "./contexts/UserContext";
import FilteredPostsPage from "./pages/FilteredPostsPage";

function App() {
  let location = useLocation();

  return (
    <>
      <UserContextProvider>
        <GlobalStyle />
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames={"fade"}
          >
            <section className="route-section">
              <Switch location={location}>
                <Route path="/" exact component={LoginPage} />
                <Route path="/timeline" component={TimeLinePage} />
                <Route path="/explore" component={TimeLinePage} />
                <Route path="/my-posts" component={FilteredPostsPage} />
                <Route path="/my-likes" component={FilteredPostsPage} />
                <Route path="/hashtag/:hashtag" component={FilteredPostsPage} />
                <Route path="/user/:id" component={FilteredPostsPage} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </UserContextProvider>
    </>
  );
}
export default App;

const GlobalStyle = createGlobalStyle`
:root {
  --backgroundBlack: #151515;
  --backgroundGray: #333333;
  --buttonBlue: #1877F2;
  --fontLogo: 'Passion One', cursive;
  --fontOswald: 'Oswald', sans-serif;
  --fontLato: 'Lato', sans-serif;
}

body {
  font-family: var(--fontOswald);
}

// transition effect

.fade-enter {
  opacity: 0.01;
}
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.fade-exit {
  opacity: 1;
}
.fade-exit.fade-exit-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
div.transition-group {
  position: relative;
}
section.route-section {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}


`;
