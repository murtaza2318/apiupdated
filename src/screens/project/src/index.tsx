import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Notifications } from "./screens/Notifications";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Notifications />
  </StrictMode>,
);
