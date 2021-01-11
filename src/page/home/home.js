import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'



import './home.css'

import Loadable from 'react-loadable';
import Loading from '../../component/loading/loading'

const HomeBody = Loadable({loader: () => import('../../component/homeBody/homeBody'),loading: Loading});


@withRouter
@connect(
    state => state,
)
export default class Home extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        return (
            <div className="home">
                <HomeBody history={this.props.history}/>
            </div>
        )

    }

}