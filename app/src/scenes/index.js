import React , { Component } from "react";
import { Route ,Switch,  BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

class App extends Component{
    constructor(){
        super()
    }
    render(){
        return(
                <Router>
                    <Switch>
                        <Route exact path={"/"} component={Home}></Route>
                    </Switch>
                </Router>
        )
    }
}

export default  App
