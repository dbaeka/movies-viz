/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.1.0";
import "./assets/demo/demo.css";

// import Index from "./views/Index.js";
import LandingPage from "./views/examples/LandingPage.js";
// import RegisterPage from "./views/examples/RegisterPage.js";
// import ProfilePage from "./views/examples/ProfilePage.js";
import WriteUp from "./views/examples/WriteUp";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/writeup" render={props => <WriteUp {...props} />} />
      <Route
        path="/"
        render={props => <LandingPage {...props} />}
      />
      {/*<Route*/}
      {/*  path="/write-up"*/}
      {/*  render={props => <WriteUp {...props} />}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  path="/profile-page"*/}
      {/*  render={props => <ProfilePage {...props} />}*/}
      {/*/>*/}
      {/*<Redirect from="/" to="/components" />*/}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});