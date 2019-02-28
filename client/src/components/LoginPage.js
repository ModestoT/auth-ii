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

        const user = { username: this.state.username, password: this.state.password };

        makeAxios()
            .post('login', user)
            .then( res => {
                localStorage.setItem('AuthToken', res.data.token);
                this.props.history.push('/users');
                alert(res.data.message);
            })
            .catch( err => this.setState({error: err.response.data.error }));
    }

    render() {
        return(
            <div className="login-wrapper">
                <h1>Login</h1>
                <form onSubmit={this.login}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
                    <button>Login</button>
                    <button className="register" onClick={(e) => this.props.history.push('/register')}>Register</button>
                    <div style={{color: 'red'}}>{this.state.error ? this.state.error: null}</div>
                </form>
            </div>
        );
    }
}

export default LoginPage;

