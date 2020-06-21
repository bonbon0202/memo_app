import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";
import {FaBloggerB} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {GrNote} from "react-icons/gr"

class Nav extends React.Component{
    render(){
        return (
        <nav className={"Memo__nav"}>
            <header className={"logo"}>
              <span>Memo</span>
            </header>
            <main>
             <ul>
               <li><GrNote style={{fontSize: 35, marginRight: 20}}/>note</li>
             </ul>
            </main>
            <footer>
              <FaGithub />
              <FaBloggerB />
              <FaInstagram />
            </footer>
        </nav>
  
        )
    }
}


export default Nav;