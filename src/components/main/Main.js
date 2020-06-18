import React from "react";
import {Link} from "react-router-dom";
import "./Main.css";
import Writing from "../writing/Writing";
import axios from "axios";


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
      
          <section style={{width: '500px'}}>
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
    })
    .catch((error)=>{
      console.log('err', error)
    })
  }

  componentDidMount(){
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

  render() {
    return (
      <section className={"Memo__Container"}>
        {this.getPostList()}
        <Link to="/writing">
          <button className={"Main__Add_btn"} onClick={Writing}>
            +
          </button>
        </Link>
      </section>
    );
  }
}

export default Main;
