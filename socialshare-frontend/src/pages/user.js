import React from "react"
import UserDisplay from "../components/users/UserDisplay"

import {NavbarClass} from "../components/general/Navbar"
import { PostContainer } from "../components/posts/PostContainer"

export default class IndexPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nameUrl: "http://localhost:2020/api/user/name/" + this.props.match.params.user,
            getPosts: false,
            user: null
        };
    }

    componentDidMount() {
        fetch(this.state.nameUrl, {
            method: "GET",
            credentials: "include",
            mode: "cors"
        }).then(response => response = response.json())
        .then((result) => {
            this.setState({
                getPosts: true, 
                user: result
            })
        })

    }

    render() {
            if(this.state.getPosts){
                return (
                    <div>
                        <NavbarClass/>
                        <div className="index" style={{paddingTop: "80px"}}>
                            <UserDisplay user={this.state.user}/>
                            <PostContainer url={"http://localhost:2020/api/user/" + this.state.user._id + "/posts"}/>
                        </div>
                    </div>
                )
            }
            return(
                <div>
                    <NavbarClass/>
                    <div className="index" style={{paddingTop: "80px"}}>
                        <div className="spinner" /> <p>Loading...</p>
                    </div>
                </div>
            )
    }
}
