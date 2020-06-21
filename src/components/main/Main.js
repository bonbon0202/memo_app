import React from "react";
import {Link} from "react-router-dom";
import { Route } from 'react-router-dom';
import axios from "axios";
import "./Main.css";
import Writing from "../writing/Writing";
import Nav from "../nav/Nav";
import ViewMemo from "../viewmemo/ViewMemo";


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
              <header className={"Container_header"}>
                  <span className={"Containner_title"}>
                   <Link to={{pathname: "/view/id="+data.id,
                    state: {
                      id: data.id
                    }}} >
                        {data.title}
                   </Link>
                  </span>
                  <span className={"Containner_date"}>
                      {data.reg_date.split("T")[0]}
                  </span>
              </header>
              <main className={"Container_body"}>
                  <div style={{fontSize: "30px"}}>
                      <button className={"Container_deleteBtn"} name="delBtn" onClick={(e) => this.deleteMemo(data.id)}>
                        <span role="img" aria-label="delete">❌</span>
                      </button>
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
        <Nav />
        <main className="Memo__display">
          {this.getPostList()}
          <Link to="/writing">
            <button className={"Main__Add_btn"} onClick={Writing}>
            add
            </button>
          </Link>
        </main>
        <Route path="/writing" component={Writing} />
        <Route path="{'/view/id='+data.id}" component={ViewMemo} />
      </section>
    );
  }
}

export default Main;
