import Food from "../../Images/Food.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Title = ()=>{
    return (
        <div className="logo">
            <img src={Food}/>
        </div>
    )
};

const Header = () =>{

const [btnName, setbtnName] = useState("login");

    return (
      <div className="header">
          <Title/>
          <div className="nav-items">
              <ul>
                  <li className="link"><Link to="/">Home</Link></li>
                  <li className="link"><Link to="/about">About us</Link></li>
                  <li className="link"><Link to="/contact">Contact us</Link></li>
                  <li className="link"><Link to="/">Cart</Link></li>
                  <button className="login" 
                  onClick={()=>{
                     (btnName === "login") ? setbtnName("logout") : setbtnName("login");
                  }}
                  >{btnName}</button>
              </ul>
          </div>
      </div>
    ) 
  };

  export default Header;