import React from "react";
import {Link} from 'react-router-dom';
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

  handlechange=(e)=>{
    console.log(e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  createMemo=(e)=>{
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
    <div className={"Writing__pad"}>
      <form>
        <input className="title"
          name="title"
          placeholder="제목을 입력하세요"
          onChange={this.handlechange}
          value={this.state.title}
        />
        <input className="content"
          name="content"
          placeholder="내용을 입력하세요"
          onChange={this.handlechange}
          value={this.state.content}
        />
      </form>
      <Link to="/">
        <button className="addBtn" onClick={this.createMemo}>
          추가
        </button>
      </Link>
    </div>
    )
  }
}

export default Writing;
