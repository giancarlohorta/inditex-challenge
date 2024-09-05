import { Suspense, lazy } from "react";
import { Route, Routes as RoutesApp } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Home = lazy(() => import("../pages/Home"));

const Routes = () => (
  <RoutesApp>
    <Route
      path={ROUTES.home}
      element={
        <Suspense fallback={<div>Looading...</div>}>
          <Home />
        </Suspense>
      }
    />
  </RoutesApp>
);

export default Routes;
