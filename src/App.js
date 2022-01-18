import React, { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "./shared/components/Spinner/Spinner";
import { PAGES } from "./shared/constants/navigation";

const routes = (
  <Suspense fallback={<Spinner show />}>
    <Switch>
      {PAGES.map((page) => (
        <Route
          exact
          key={page.path}
          path={page.path}
          render={(p) => <page.render {...p} />}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

const App = () => {
  return <Layout>{routes}</Layout>;
};

export default App;
