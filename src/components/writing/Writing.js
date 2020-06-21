import React from "react";
import {Link} from 'react-router-dom';
import Nav from '../nav/Nav';
import axios from 'axios';
import "./Writing.css";

class Writing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      content: ""
    }
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
        <label className="content_label" for="content">오늘의 메모:</label>

        <textarea id="content" name="content" className="pad_content" placeholder="내용을 입력하세요"
          onChange={this.handlechange}
          value={this.state.content}
          rows="50" >
        </textarea>
        <Link to="/">
        <button className="pad_addBtn" onClick={this.createMemo}>
          post
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
              <Nav />
              <main className={"Memo__display"}>
                {this.getPost()}
              </main>
          </section>
    )
  }
}

export default Writing;
