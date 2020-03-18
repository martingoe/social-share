import React from "react"

import {Post} from "./Post.js"

class PostContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          posts: [],
          error: null
        };
      }

    componentDidMount() {
        fetch(this.props.url, {
            method: "GET",
            credentials: "include",
            mode: "cors"
        }).then(response => response = response.json())
        .then((result) => {
            if(this.message != null){
                this.setState({error: "The requested user does not exist"})
            }
            this.setState({
                isLoaded: true, 
                posts: result
            })
        })
    }

    render(){
        if(!this.state.isLoaded){
            return <div style={{paddingTop: "100px"}}><div className="spinner"/> <p>Loading ...</p></div>
        } else if (this.state.error){
            return <div style={{paddingTop: "100px"}}><h1>The requested user could not be found</h1></div>
        } else {
            return (
                <div>
                {this.state.posts.map(post => (
                    <Post value={post} key={post._id}></Post>
                ))}
                </div>
            )
        }
    }
}

export {PostContainer}