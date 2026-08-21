import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Bestiary from "./pages/Bestiary";
import MonsterDetail from "./pages/MonsterDetail";
import Stories from "./pages/Stories";
import StoryReader from "./pages/StoryReader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Bestiary },
      { path: "bestiary/:id", Component: MonsterDetail },
      { path: "stories", Component: Stories },
      { path: "stories/:id", Component: StoryReader },
    ],
  },
]);
