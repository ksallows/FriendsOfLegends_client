import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEnvelope, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons'
// <FontAwesomeIcon icon={faCheck} />

type RegisterValues = {
    email: string,
    emailIsValid: boolean,
    emailStarted: boolean,
    emailError: string,
    password: string,
    passwordIsValid: boolean,
    passwordStarted: boolean,
    passwordError: string,
    passwordCheck: string,
    passwordCheckIsValid: boolean,
    passwordCheckStarted: boolean,
    passwordCheckError: string
}

const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"_]).*$/

class Register extends React.Component<{}, RegisterValues> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            emailIsValid: false,
            emailStarted: false,
            emailError: '',
            password: '',
            passwordIsValid: false,
            passwordStarted: false,
            passwordError: '',
            passwordCheck: '',
            passwordCheckIsValid: false,
            passwordCheckStarted: false,
            passwordCheckError: ''
        }
    }

    emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.emailStarted)
            this.setState({ emailStarted: true })
        this.setState({ email: event.target.value },
            () => {
                if (this.state.email.match(emailRegex))
                    this.setState({ emailIsValid: true, emailError: '' })
                else
                    this.setState({ emailIsValid: false, emailError: 'Invalid email address' })
            })

    }

    passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordStarted)
            this.setState({ passwordStarted: true })
        this.setState({ password: event.target.value },
            () => {
                if (this.state.password.match(passwordRegex))
                    this.setState({ passwordIsValid: true, passwordError: '' })
                else
                    this.setState({ passwordIsValid: false, passwordError: 'Password must be at least 8 characters and include at least 1 letter and 1 number, and 1 symbol (!#$%&?"_)' })
            })
    }

    passwordCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordCheckStarted)
            this.setState({ passwordCheckStarted: true })
        this.setState({ passwordCheck: event.target.value },
            () => {
                if (this.state.password === this.state.passwordCheck)
                    this.setState({ passwordCheckIsValid: true, passwordCheckError: '' })
                else
                    this.setState({ passwordCheckIsValid: false, passwordCheckError: 'Passwords must match' })
            })
    }

    render() {
        return (
            <div className='columns'>
                <div className='column is-2 is-offset-5'>
                    <h1 className='title'>Sign Up</h1>
                    <div className='field'>
                        <label className='label' htmlFor='email'>Email</label>
                        <div className='control has-icons-left has-icons-right'>
                            <input className={`input ${this.state.emailIsValid && this.state.emailStarted ? 'is-success' : !this.state.emailStarted ? '' : 'is-danger'}`} type='text' id='email' name='email' value={this.state.email} onChange={this.emailChange} />
                            <span className="icon is-small is-left">
                                <i className='fas'><FontAwesomeIcon icon={faEnvelope} /></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className={`fas ${this.state.emailStarted ? '' : 'is-hidden'}`}>
                                    {this.state.emailIsValid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faExclamationTriangle} />}
                                </i>
                            </span>
                        </div>
                        <p className={`help is-danger ${this.state.emailStarted ? '' : 'is-hidden'}`}>{this.state.emailError}</p>
                    </div>
                    <div className='field'>
                        <label className='label' htmlFor='password'>Password</label>
                        <div className='control has-icons-left has-icons-right'>
                            <input className={`input ${this.state.passwordIsValid && this.state.passwordStarted ? 'is-success' : !this.state.passwordStarted ? '' : 'is-danger'}`} type='password' id='password' name='password' value={this.state.password} onChange={this.passwordChange} />
                            <span className="icon is-small is-left">
                                <i className='fas'><FontAwesomeIcon icon={faLock} /></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className={`fas ${this.state.passwordStarted ? '' : 'is-hidden'}`}>
                                    {this.state.passwordIsValid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faExclamationTriangle} />}
                                </i>
                            </span>
                        </div>
                        <p className={`help is-danger ${this.state.passwordStarted ? '' : 'is-hidden'}`}>{this.state.passwordError}</p>
                    </div>
                    <div className='field'>
                        <label className='label' htmlFor='passwordCheck'>Re-type Password</label>
                        <div className='control has-icons-left has-icons-right'>
                            <input className={`input ${this.state.passwordCheckIsValid && this.state.passwordCheckStarted ? 'is-success' : !this.state.passwordCheckStarted ? '' : 'is-danger'}`} type='password' id='passwordCheck' name='passwordCheck' value={this.state.passwordCheck} onChange={this.passwordCheckChange} />
                            <span className="icon is-small is-left">
                                <i className='fas'><FontAwesomeIcon icon={faLock} /></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className={`fas ${this.state.passwordCheckStarted ? '' : 'is-hidden'}`}>
                                    {this.state.passwordCheckIsValid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faExclamationTriangle} />}
                                </i>
                            </span>
                        </div>
                        <p className={`help is-danger ${this.state.passwordCheckStarted ? '' : 'is-hidden'}`}>{this.state.passwordCheckError}</p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register;