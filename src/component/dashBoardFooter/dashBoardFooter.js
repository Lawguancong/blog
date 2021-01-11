import './dashBoardFooter.css'

import React from 'react'
import {connect} from 'react-redux'



@connect(
    state => state,
)
export default class DashBoardFooter extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        return (
            <div className="footer">
                footer
            </div>
        )
    }
}