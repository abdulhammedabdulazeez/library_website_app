import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";
import { HomePage } from "./pages/HomePage";
import { TeamPage } from "./pages/TeamPage";
import { CreativeWritingPage } from "./pages/CreativeWritingPage";
import { ResearchSupportPage } from "./pages/ResearchSupportPage";
import { Events } from "./pages/Events";
import { GcgoDetailPage } from "./pages/GcgoDetailPage";
import { Gcgo } from "./pages/Gcgo";

const router = createBrowserRouter([
  {
    path: "/library",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "team",
        Component: TeamPage,
      },
      {
        path: "events",
        Component: Events,
      },
      {
        path: "services/research-support",
        Component: ResearchSupportPage,
      },
      {
        path: "services/creative-writing",
        Component: CreativeWritingPage,
      },
      {
        path: "gcgo",
        children: [
          { index: true, Component: Gcgo },
          { path: ":slug", Component: GcgoDetailPage },
        ],
      },
    ],
  },
]);

export default router;