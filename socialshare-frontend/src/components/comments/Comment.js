import React from "react"

export default class CommentDisplay extends React.Component{
    render(){
        return(
            <div>
                <a href={"/" + this.props.value.userId.username}>{this.props.value.userId.username}</a>
                <p>{this.props.value.content}</p>
            </div>
        )
    }
}