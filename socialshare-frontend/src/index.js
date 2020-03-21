import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import {IndexPage} from "./pages/index"
import UserPage from "./pages/user"

import './css/index.css';
import "./css/mediaQueries.css"
import "./css/buttons.css"

class Main extends React.Component{
    render() {
        return(
            <Switch>
        <Route exact path='/' component={IndexPage}/>
        <Route exact path='/:user' component={UserPage}/>
        <Route exact path="/search/:searchValue" component={IndexPage} />
        <Route exact path="/account/settings" component={IndexPage} />

      </Switch>
        )
    }
}

ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>, document.getElementById("root"))