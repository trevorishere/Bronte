import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { RecentPage } from "./pages/RecentPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { SharedPage } from "./pages/SharedPage";
import { AdminPage } from "./pages/AdminPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { WorkspacesPage } from "./pages/WorkspacesPage";
import { AccountDetailPage } from "./pages/AccountDetailPage";
import { TeamDetailPage } from "./pages/TeamDetailPage";
import { AccountPage } from "./pages/AccountPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: RecentPage },
      { path: "recent", Component: RecentPage },
      { path: "favorites", Component: FavoritesPage },
      { path: "shared", Component: SharedPage },
      { path: "workspaces", Component: WorkspacesPage },
      { path: "account", Component: AccountPage },
      { path: "admin", Component: AdminPage },
      { path: "admin/account/:accountId", Component: AccountDetailPage },
      { path: "admin/team/:teamId", Component: TeamDetailPage },
      { path: "admin/workspace/:workspaceId", Component: WorkspacePage },
      { path: "workspace/:workspaceId", Component: WorkspacePage },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});