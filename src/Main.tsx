import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
