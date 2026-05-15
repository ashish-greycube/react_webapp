import { FrappeProvider, useFrappeGetDocList } from "frappe-react-sdk";
import Login from "./pages/Login";
import { Outlet } from "react-router";

function App() {
  
  return (
    <div>
      <FrappeProvider>
        <Outlet />
      </FrappeProvider>
    </div>
  );
}

export default App;
