import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #283e4a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  margin-right: 2rem;
  text-decoration: none;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #1abc9c;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #283e4a;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const{user, logout} = useAuth()
  const handleLogout = () => {
    logout()
    navigate("/login");
  };

  return (
    <Nav>
      <NavLeft>
        <Brand to="/">Events</Brand>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
      </NavLeft>
      <NavRight>
        {user ? <div>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton> 
          <span style={{ color: "#fff", margin: "0 1rem" }}>Logged in as {user.username}</span>
        </div>: <LogoutButton onClick={() => navigate("/login")}>Log in</LogoutButton>} 
      </NavRight>
    </Nav>
  );
}

export default Navbar;
