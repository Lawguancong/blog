import React from 'react'
import {connect} from 'react-redux'
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";



@connect(
    state => state,
)
export default class Music extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    render() {

        return (
            <ReactJkMusicPlayer {...this.props.Option} />
        )

    }

}