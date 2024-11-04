import { RouterProvider } from "react-router-dom";
import "./App.css";
// import IatrikosShell from "./pages/IatrikosShell";
import { router } from "./routes/BrowserRoutes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
