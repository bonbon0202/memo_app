import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Writing.css";
import "../main/Nav.css";
import {FaBloggerB} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {GrNote} from "react-icons/gr"

class Writing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: ""
    }
  }

  navList = () => {
    return(
        <nav className={"Memo__nav"}>
          <header className={"logo"}>
            <span>Memo</span>
          </header>
          <main>
           <ul>
             <li><GrNote style={{fontSize: 35}}/>note</li>
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

  getPost = () => {
    return (
      <form className="Writing__pad">
        <input className="pad_title"
          name="title"
          placeholder="제목을 입력하세요"
          onChange={this.handlechange}
          value={this.state.title}
        />
        <label for="content">Tell us your story:</label>

        <textarea id="content" name="content" className="pad_content" placeholder="내용을 입력하세요"
          onChange={this.handlechange}
          value={this.state.content}
          rows="5" cols="33" >
        </textarea>
        <Link to="/">
        <button className="addBtn" onClick={this.createMemo}>
          추가
        </button>
        </Link>
      </form>
    )
  }

  handlechange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }


  createMemo = (e) => {
    axios.put('http://localhost:3001/create',{
      title: this.state.title,
      content: this.state.content
    })
    .then((response)=> {
      console.log('good', response)
    })
    .catch((error)=> {
      console.log('err', error)
    })
  }


  render() {
    return (
    <section className={"Memo__page"}>
      {this.navList()}
      <main className={"Memo__display"}>
        {this.getPost()}
      </main>
    </section>
    )
  }
}

export default Writing;
