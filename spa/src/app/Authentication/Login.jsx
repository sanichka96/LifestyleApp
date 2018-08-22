import React from 'react';

const URL = 'http://localhost:8080';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false,
            username: '',
            password: ''
        };
    }

    componentDidMount() {

    }

    login() {
        fetch(URL + "/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
            .then(response => {
                console.log("response", response);
                response.json();
                if(response.status === 200) {
                    this.setState({isAuthorized: true})
                }
            })
            .catch(error => console.log(error));
    }

    static isAuthorized() {
        return this.state.isAuthorized;
    }

    render() {

        return (
            <div className="loginContainer">
                <p>Musisz się zalogować</p>
                <form>
                    <div>
                        <label>Username* :</label>
                        <input type="text" onChange={e => this.setState({username: e.target.value})} required/>
                    </div>
                    <div>
                        <label>Hasło* :</label>
                        <input type="password" onChange={e => this.setState({password: e.target.value})} required/>
                    </div>
                    <button className="addNew" onClick={() => this.login}>Zaloguj</button>
                </form>
            </div>
        );
    }
}