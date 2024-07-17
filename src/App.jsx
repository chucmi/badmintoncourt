import { useDispatch } from "react-redux";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import React, { useEffect } from "react";
import { removeExpiredItems } from "./redux/cartSlice";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to periodically remove expired items
    const interval = setInterval(() => {
      dispatch(removeExpiredItems());
    }, 1000); // Check every 1 seconds

    // Initial check on component mount
    dispatch(removeExpiredItems());

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
