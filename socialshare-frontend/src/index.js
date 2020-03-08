import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import './index.css';

class Post extends React.Component{
    render() {
        return(
            <div className="post">
                <p><a href={this.props.value.userId.username}>{this.props.value.userId.username}</a> - {this.props.value.creationDate}</p>
                <h2>{this.props.value.title}</h2>
                <img src={this.props.value.data} alt=""></img>
                <LikesPanel value={this.props.value} />
            </div>
        )
    }
}

class LikesPanel extends React.Component{

    render(){
        return(
            <div className="likesPanel">
                {this.props.value.likes} - 
                <button onClick={() => fetch("http://localhost:2020/api/post/like/" + this.props.value._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.value.userLiked ? "unlike" : "like"}
                </button>

                {this.props.value.dislikes} - 
                <button onClick={() => fetch("http://localhost:2020/api/post/dislike/" + this.props.value._id, 
                {method: "POST", credentials: "include"}).then(() => window.location.reload())}>
                    {this.props.value.userDisliked ? "undislike" : "dislike"}
                </button>
            </div>
        )
    }
}

class PostContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          posts: []
        };
      }

    componentDidMount() {
        fetch(this.props.url, {
            method: "GET",
            credentials: "include",
            mode: "cors"
        }).then(response => response = response.json())
        .then((result) => {
            this.setState({
                isLoaded: true, 
                posts: result
            })
        })
    }

    render(){
        
        if(!this.state.isLoaded){
            return <div>LOADING ...</div>
        } else {
            return (
                <div className="index">
                {this.state.posts.map(post => (
                    <Post value={post}></Post>
                ))}
                </div>
            )
        }
    }
}


class User extends React.Component{


    render(){
            return (
                <div>
                {this.props.match.params.user}
                </div>
            )
    }
}

class Main extends React.Component{
    render() {
        return(
            <Switch>
        <Route exact path='/' component={() => <PostContainer url="http://localhost:2020/api/post/" />}/>
        <Route exact path='/:user' component={User}/>

      </Switch>
        )
    }
}

ReactDOM.render(<BrowserRouter><Main/></BrowserRouter>, document.getElementById("root"))