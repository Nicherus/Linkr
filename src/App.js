import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import "./reset.css";
import LoginPage from "./pages/LoginPage";
import TimeLinePage from "./pages/TimeLinePage";
import { UserContextProvider } from "./contexts/UserContext";
import FilteredPostsPage from "./pages/FilteredPostsPage";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <UserContextProvider>
          <Route path="/" exact component={LoginPage} />
          <Route path="/timeline" component={TimeLinePage} />
          <Route path="/my-posts" component={FilteredPostsPage} />
          <Route path="/hashtag/:hashtag" component={FilteredPostsPage} />
          <Route path="/user/:id" component={FilteredPostsPage} />
        </UserContextProvider>
      </Switch>
    </Router>
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
`;
