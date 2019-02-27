import React from 'react';

import makeAxios from './axios-config.js';

class RegisterPage extends React.Component {
    state = {
        username: '',
        password: '',
        department: '',
        error: ''
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    register = e => {
        e.preventDefault();

        const user = { username: this.state.username, password: this.state.password, department: this.state.department };

        makeAxios()
            .post('register', user)
            .then( res => {
                localStorage.setItem('AuthToken', res.data.token)
                this.props.history.push('/users');
                alert('Account Created!');
            })
            .catch( err => console.log(err));
    }

    render() {
        return(
            <div className="register-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.register}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
                    <input type="text" name="department" placeholder="Department" value={this.state.department} onChange={this.handleInput} />
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterPage;