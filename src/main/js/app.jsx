import React from 'react';
import ReactDOM from 'react-dom';
import UserList from './UserList';

class App extends React.Component {
    render() {
        return (<UserList />)
    }
}

ReactDOM.render(
	<App />,document.getElementById('react')
)