import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import WeddingDay from "./pages/WeddingDay";
import Venues from "./pages/Venues";
import Registry from "./pages/Registry";
import RSVP from "./pages/RSVP";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/our-story", element: <OurStory /> },
      { path: "/wedding-day", element: <WeddingDay /> },
      { path: "/venues", element: <Venues /> },
      { path: "/registry", element: <Registry /> },
      { path: "/rsvp", element: <RSVP /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
