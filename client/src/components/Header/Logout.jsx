import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(logout());
  };

  return (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
