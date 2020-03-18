import React from "react"
import { PostContainer } from "../components/posts/PostContainer"

import {NavbarClass} from "../components/general/Navbar"

class IndexPage extends React.Component{
    render() {
        return(
            <div>
                <NavbarClass/>
                <div className="index">
                    <PostContainer url="http://localhost:2020/api/post/" />
                </div>
            </div>
        )
    }
}

export {IndexPage}