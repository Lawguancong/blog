
import React from 'react'
import {connect} from 'react-redux'



@connect(
    state => state,
)
export default class Test extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        return (
            <div>
               test
            </div>
        )

    }

}