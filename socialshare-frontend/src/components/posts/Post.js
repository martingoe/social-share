import React from "react"

import {LikesPanel} from "./LikesPanel"
import Overlay from "../general/Overlay"
import CommentDisplay from "../comments/CommentDisplay"

class Post extends React.Component{
    constructor(props){
        super(props)
        this.closeHandler = this.closeHandler.bind(this)
        this.state = {
            displayOverlay: false
        }
    }

    closeHandler = () => {
        this.setState({displayOverlay: false})
    }
    openOverlay = () => this.setState({displayOverlay: true})

    render() {
        return(
            <div>
                <div className="post">
                    <p><a href={"/" + this.props.value.userId.username}>{this.props.value.userId.username}</a>&nbsp;&nbsp; {this.props.value.creationDate}</p>
                    <h2 onClick={this.openOverlay}>{this.props.value.title}</h2>
                    <img src={this.props.value.data} alt=""></img>
                    <LikesPanel value={this.props.value} />
                </div>

                {this.state.displayOverlay && 
                    <Overlay closeHandler={this.closeHandler}>
                        <div className="post">
                            <p><a href={"/" + this.props.value.userId.username}>{this.props.value.userId.username}</a>&nbsp;&nbsp; {this.props.value.creationDate}</p>
                            <h2>{this.props.value.title}</h2>
                            <img src={this.props.value.data} alt=""></img>
                            <LikesPanel value={this.props.value} />
                            <CommentDisplay url={"http://localhost:2020/api/post/" + this.props.value._id + "/comments"} />
                        </div>
                    </Overlay>
                }
            </div>
        )
    }
}

export {Post}