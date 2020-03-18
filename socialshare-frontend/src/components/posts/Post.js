import React from "react"

import {LikesPanel} from "./LikesPanel"
class Post extends React.Component{
    render() {
        return(
            <div className="post">
                <p><a href={"/" + this.props.value.userId.username}>{this.props.value.userId.username}</a>&nbsp;&nbsp; {this.props.value.creationDate}</p>
                <h2>{this.props.value.title}</h2>
                <img src={this.props.value.data} alt=""></img>
                <LikesPanel value={this.props.value} />
            </div>
        )
    }
}

export {Post}