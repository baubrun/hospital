import { lazy } from "react";

export const HOME_PAGE = {
  path: "/",
  // render: lazy(() => import("../../pages/Home/Home")),
  render: lazy(() => import("../../components/patient/WaitingRoom")),
};

export const SEARCH_PAGE = {
  path: "/",
  render: lazy(() => import("../../components/patient/Search")),
};

export const PAGES = [HOME_PAGE, SEARCH_PAGE];
