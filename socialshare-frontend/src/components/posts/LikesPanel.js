import React from "react"
import {MdThumbUp, MdThumbDown} from "react-icons/md"

class LikesPanel extends React.Component{

    render(){
        return(
            <div className="likesPanel">
                
                <button className="likebutton" onClick={() => fetch("http://localhost:2020/api/post/like/" + this.props.value._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.value.userLiked ? <MdThumbUp color="#056aad"/> : <MdThumbUp color="grey"/>}
                    <span>{this.props.value.likes}</span>
                </button>

                <button className="likebutton" onClick={() => fetch("http://localhost:2020/api/post/dislike/" + this.props.value._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.value.userDisliked ? <MdThumbDown color="#056aad"/> : <MdThumbDown color="grey"/>}
                    <span>{this.props.value.dislikes}</span>

                </button>
            </div>
        )
    }
}

export {LikesPanel}