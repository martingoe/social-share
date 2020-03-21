import React from "react"
import "./overlay.css"

export default class Overlay extends React.Component{
    close = (e, isOverlay) => {
        e.stopPropagation(); 
        if(!isOverlay){
            this.props.closeHandler()
        }
    }

    render(){
        return(
            <div className="overlayWrapper" onClick={(e) => this.close(e, false)}>
                <div className="overlay" onClick={(e) => this.close(e, true)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}