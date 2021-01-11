import React from 'react'
import {connect} from 'react-redux'
import LoginModal from '../../component/loginModal/loginModal'

@connect(
    state => state,
)
export default class AdminLogin extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){

    }
    componentDidUpdate(){

    }
    render(){
        return(
            <div>
                <LoginModal history={this.props.history}/>
            </div>
        )
    }
}