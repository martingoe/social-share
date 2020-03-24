import React from "react"
import {MdThumbUp} from "react-icons/md"
import "../../css/buttons.css"


export default class CommentDisplay extends React.Component{
    render(){
        return(
            <div>
                <a href={"/" + this.props.value.userId.username}>{this.props.value.userId.username}</a> - {new Date(this.props.value.date).toLocaleString()}
                <p>{this.props.value.content}</p>
                <button className="likebutton" onClick={() => fetch("http://localhost:2020/api/comment/like/" + this.props.value._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.value.userLiked ? <MdThumbUp color="#056aad"/> : <MdThumbUp color="grey"/>} 
                    <span>{this.props.value.likesCount}</span>
                </button>
            </div>
        )
    }
}