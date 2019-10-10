import React , { Component } from "react";
import { Route ,Switch,  BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

class App extends Component{
    constructor(){
        super()
    }
    render(){
        return(
               <Home/>
        )
    }
}

export default  App
