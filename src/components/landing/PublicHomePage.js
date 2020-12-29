import React, { Component } from 'react'
import Login from '../login/Login'


export default class PublicHomePage extends Component {
    render() {
        return (
            <div>
                <Login />
                <p>this is the homepage</p>
                
            </div>
        )
    }
}
