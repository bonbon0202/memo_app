import React from "react";
import {Link} from "react-router-dom";
import "./Main.css";
import Writing from "../writing/Writing";
import axios from "axios";
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import {FaBloggerB} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textList: [],
    };
  }

  getPostList = () => {
    return(
      this.state.textList.map((data) =>   //key 값 주기
      
          <section className={"Memo__container"}>
              <header className={"Container_head"}>
                  <div style={{fontSize: "15px"}}>
                      {data.category}
                  </div>
                  <div style={{fontSize: "15px"}}>
                      {data.reg_date.split("T")[0]+" " + data.reg_date.split("T")[1].split(".")[0]}
                  </div>
              </header>
              <main className={"Container_body"}>
                  <div style={{fontSize: "30px"}}>
                      <Link to={"/view/id="+data.id}>
                      {data.title}
                      </Link>
                      <button name="delBtn" onClick={(e) => this.deleteMemo(data.id)}><span role="img" aria-label="delete">❌</span></button>
                  </div>
                  <div style={{fontSize: "15px"}}>
                      {data.nickname}
                  </div>
              </main>
          </section>

     
  )

    )
    
  };

  deleteMemo = (id) => {
    axios.delete('http://localhost:3001/delete', {
      data:{
        id
      }
    })
    .then((response)=> {
      console.log('good', response)
      this.getData();
    })
    .catch((error)=>{
      console.log('err', error)
    })
  }

  getData(){
    axios.get('http://localhost:3001/list')
    .then((response)=> {
      this.setState({
        textList:response.data
      })
      console.log("xx", this.state.textList);
    })
    .catch(function(error){
      console.log("getPost error", error);
    })
  }


  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    this.getPostList();
  }

  render() {
    return (
      <section className={"Memo__page"}>
        <nav className={"Memo__nav"}>
          <header className={"logo"}>
            <span>Memo</span>
          </header>
          <main>
           <ul>
             <li><NoteOutlinedIcon style={{fontSize: 40}}/>note</li>
           </ul>
          </main>
          <footer>
            <FaGithub />
            <FaBloggerB />
            <FaInstagram />
          </footer>
        </nav>
        <main className="Memo__display">
          {this.getPostList()}
          <Link to="/writing">
            <button className={"Main__Add_btn"} onClick={Writing}>
            +
            </button>
          </Link>
        </main>
      </section>
    );
  }
}

export default Main;
