import { createRoot } from "react-dom/client";
import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/plus-jakarta-sans/latin-800.css";
import { initI18n } from "@/i18n/i18n";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

void initI18n().then(() => {
  createRoot(root).render(<App />);
});
