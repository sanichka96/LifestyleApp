import React from 'react';
import User from './User';
const Url = "http://localhost:8080/api";

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        fetch(Url + "/users").then(response => response.json())
            .then(data => this.setState({users: data}));
    }

    render() {
        var users = this.state.users.map(user => <User key = {user._links.self.href} data = {user}/>);
        return (
            <div className="users" id="users">
                <ul>{users}</ul>
            </div>
        )
    }
}