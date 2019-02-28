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

        if(e.target.name === 'username' && this.state.username.length < 2){
            this.setState({ nameError: 'Username must be atleast 3 characters long' }); 
        } else{
            this.setState({ nameError: '' });
        }

        if(e.target.name === 'password' && this.state.password.length < 7){
            this.setState({ passwordError: 'Password must be atleast 8 characters long' });
        } else {
            this.setState({ passwordError: '' });
        }

    }

    register = e => {
        e.preventDefault();

        const user = { username: this.state.username, password: this.state.password, department: this.state.department };
        
        if(this.state.nameError || this.state.passwordError){
          return null;
        } else {
            makeAxios()
            .post('register', user)
            .then( res => {
                localStorage.setItem('AuthToken', res.data.token);
                this.props.history.push('/users');
                alert('Account Created!');
            })
            .catch( err => this.setState({ error: err.response.data.error }));
        }
    }


    render() {
        return(
            <div className="register-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.register}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput} />
                    <p style={{ color:'red' }}>{this.state.nameError ? this.state.nameError : null}</p>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
                    <p style={{ color:'red' }}>{this.state.passwordError ? this.state.passwordError : null}</p>
                    <input type="text" name="department" placeholder="Department" value={this.state.department} onChange={this.handleInput} />
                    <p style={{ color:'red' }}>{this.state.departmentError ? this.state.departmentError : null}</p>
                    <button>Register</button>
                    <div style={{ color:'red' }}>{this.state.error ? this.state.error : null }</div>
                </form>
            </div>
        );
    }
}

export default RegisterPage;