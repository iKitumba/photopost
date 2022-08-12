import { BrowserRouter } from "react-router-dom";
import Router from "./Routes";

import AuthContextProvider from "./contexts/authContext";

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
