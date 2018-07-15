import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", basicWeight: 0.0};
    }

    render() {
        return (
            <li>
                Imię: {this.props.user.name}, email: {this.props.user.email}, 
                waga początkowa: {this.props.user.basicWeight}
            </li>
        )
    }
}