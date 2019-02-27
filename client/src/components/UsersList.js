import React from 'react';

import makeAxios from './axios-config.js';

class UsersList extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        makeAxios()
            .get('/users')
            .then( res => this.setState({ users: res.data }))
            .catch( err => console.log(err));

        if(!localStorage.getItem('AuthToken')){
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="users-list-wrapper">
                {this.state.users.map( user => {
                    return (
                        <div className="user-wrapper" key={user.id}>
                            <h1>Username: {user.username}</h1>
                            <p>ID: {user.id}</p>
                            <p>Department: {user.department}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default UsersList;