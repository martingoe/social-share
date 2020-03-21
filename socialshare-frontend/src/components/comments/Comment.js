import React from "react"

export default class CommentDisplay extends React.Component{
    render(){
        return(
            <div>
                {this.props.value.content}
            </div>
        )
    }
}