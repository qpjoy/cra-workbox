import React, { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import LayoutBox from "@/components/LayoutBox";
import SuspenseBox from "@/components/SuspenseBox";
import NotFound from "@/pages/404";

import Login from "@/pages/landing/login/editorLogin";

function Router() {
  useEffect(() => {});

  return (
    <BrowserRouter>
      <LayoutBox>
        <Suspense fallback={<SuspenseBox />}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/landing/login" />
            </Route>

            <Route path="/landing/login" exact component={Login}></Route>

            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Suspense>
      </LayoutBox>
    </BrowserRouter>
  );
}

export default Router;
