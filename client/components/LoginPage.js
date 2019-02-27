import React from 'react';

import makeAxios from './axios-config.js';

class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
        error: ''
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = e => {
        e.preventDefault();

        const user = { username, password };

        makeAxios()
            .post('login', user)
            .then( res => console.log(res))
            .catch( err => console.log(error));
    }

    render() {
        return(
            <div className="login-wrapper">
                <form onSubmit={this.login}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
                    <button>Login</button>
                    <button onClick={(e) => this.props.history.push('/register')}>Register</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;

