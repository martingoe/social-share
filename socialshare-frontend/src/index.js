import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './index.css';
import {IndexPage} from "./pages/index"
import UserPage from "./pages/user"
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