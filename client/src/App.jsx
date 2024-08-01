import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { getCurrentUser } from "./actions/authActions";
import Header from "./components/Header/Header";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch current user to check if user is logged in.
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-grow flex-col bg-gray-300">
      <Header />
      <div className="mt-[55px] flex h-full gap-4">
        <Sidebar />
        <div className="mr-52"></div>
        <main className="w-full">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default App;
