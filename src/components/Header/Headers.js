import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";



const Header = ({ token }) => {
  const [tokens, settokens] = useState(token)
  const navigate = useNavigate()


  useEffect(() => {
    settokens(localStorage.getItem('token'))

    console.log("::::::authToken", token)
  }, [])


  const logoutUser = () => {
    localStorage.clear();
    navigate("/")
  }




  return (
    <>
      {/* <header> */}


      <Nav style={{ justifyContent: "center" }} variant="tabs" defaultActiveKey="/home">
        <div className='Header-tab'>
          <Nav.Item style={{ padding: "5px" }}>
            <DropdownButton id="dropdown-item-button" title="Logout from here">
              <Dropdown.Item as="button" onClick={() => logoutUser()}>Logout</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => logoutUser()}>User Profile</Dropdown.Item>
            </DropdownButton>
          </Nav.Item>
          <Nav.Item style={{ padding: "5px" }}>
            {/* <Nav.Link > */}
            <Link to="/list-itme" style={{ textDecorationLine: "none" }}>
              List Item
            </Link>
            {/* </Nav.Link> */}
          </Nav.Item>
          <Nav.Item style={{ padding: "5px" }}>
            {/* <Nav.Link> */}
            <Link to="/add-item" style={{ textDecorationLine: "none" }}>
              Add Item
            </Link>
            {/* </Nav.Link> */}
          </Nav.Item>
        </div>
      </Nav>
      {/* </header> */}
    </>
  );
};

export default Header;
