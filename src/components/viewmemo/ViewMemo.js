import React from 'react';
import {Link} from 'react-router-dom';
import Nav from '../nav/Nav';
import axios from 'axios';
import './ViewMemo.css';

class ViewMemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: [],
        }
    }

    getViewMemo = (id) => {
        console.log(id);
    }

    render() {
        return (
            <section className={"Memo__page"}>
                <Nav />
                <main className={"Memo__display"}>
                    {this.getViewMemo(this.props.location.id)}
                </main>
            </section>
        )
    }
}

export default ViewMemo;