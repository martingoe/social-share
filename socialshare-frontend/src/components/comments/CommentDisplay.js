import React from "react"
import Comment from "./Comment"

export default class CommentDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          comments: [],
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
                this.setState({error: "The requested post does not exist"})
            }
            this.setState({
                isLoaded: true, 
                comments: result
            })
        })
    }

    render(){
        if(!this.state.isLoaded){
            return <div style={{paddingTop: "100px"}}><div className="spinner"/> <p>Loading ...</p></div>
        } else if (this.state.error){
            return <div style={{paddingTop: "100px"}}><h1>The requested post could not be found</h1></div>
        } else {
            if(this.state.comments != "[]"){
                return(
                    <div>
                    {this.state.comments.map(comment => (
                        <Comment value={comment} key={comment._id}></Comment>
                    ))}
                    </div>
                )
            }
            else{
                return(<div />)
            }
        }
    }
}
