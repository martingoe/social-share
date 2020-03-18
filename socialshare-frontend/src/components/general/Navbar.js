import React from "react"
import { Redirect } from "react-router-dom";
import "./navbar.css"


class NavbarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchValue: "", startSearch: false};
        
      }      
      
    render() {
        if(this.state.startSearch){
            return <Redirect to={"/search/" + this.state.searchValue}  />
        }
        return(
            <div>
                <ul>
                    <li className="left">
                        <a href="/" >SocialShare</a>
                    </li>
                    <li className="left">
                        <a href="/account/settings">Settings</a>
                    </li>
                    <li className="right">
                    <form onSubmit={() => this.setState({startSearch: true})}>
                        <input type="text" placeholder="Search" className="mr-sm-2 formControl" onChange={(e) => this.setState({searchValue: e.target.value})} />
                        <input type="submit" value="Search" id="searchbutton"onClick={() => this.setState({startSearch: true})} variant="outline-success" />
                    </form>
                    </li>                    
                </ul>
            </div>
        )
    }
}

export {NavbarClass}