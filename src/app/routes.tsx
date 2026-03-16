import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { RecentPage } from "./pages/RecentPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { SharedPage } from "./pages/SharedPage";
import { AdminPage } from "./pages/AdminPage";
import { WorkspacePage } from "./pages/WorkspacePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: RecentPage },
      { path: "recent", Component: RecentPage },
      { path: "favorites", Component: FavoritesPage },
      { path: "shared", Component: SharedPage },
      { path: "admin", Component: AdminPage },
      { path: "workspace/:workspaceId", Component: WorkspacePage },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});