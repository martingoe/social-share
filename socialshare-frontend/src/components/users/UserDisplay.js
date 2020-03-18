import React from "react"
import {FaHeart} from "react-icons/fa"

export default class UserDisplay extends React.Component{
    render() {
        return(
            <div className="likesPanel">
                <h1>{this.props.user.username}</h1>

                {!this.props.user.message &&
                <button className="likebutton" onClick={() => fetch("http://localhost:2020/api/user/follow/" + this.props.user._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.user.isFollowing ? <FaHeart color="#056aad"/> : <FaHeart color="grey"/>}
                    
                    <span> {this.props.user.followercount}</span>
                </button>
    }

            </div>
        )
    }
}