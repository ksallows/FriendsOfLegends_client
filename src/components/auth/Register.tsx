import APIURL from '../../helpers/environment'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEnvelope, faExclamationTriangle, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
// <FontAwesomeIcon icon={faCheck} />

type RegisterValues = {
    email: string,
    emailIsValid: boolean,
    emailStarted: boolean,
    emailError: string,
    alias: string,
    aliasIsValid: boolean,
    aliasStarted: boolean,
    aliasError: string,
    password: string,
    passwordIsValid: boolean,
    passwordStarted: boolean,
    passwordError: string,
    passwordCheck: string,
    passwordCheckIsValid: boolean,
    passwordCheckStarted: boolean,
    passwordCheckError: string,
    notification: string,
    notificationSuccess: boolean
}

const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"_]).*$/

const aliasRegex = /^[a-zA-Z0-9]*$/;

class Register extends React.Component<{}, RegisterValues> {
    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            emailIsValid: false,
            emailStarted: false,
            emailError: '',

            alias: '',
            aliasIsValid: false,
            aliasStarted: false,
            aliasError: '',

            password: '',
            passwordIsValid: false,
            passwordStarted: false,
            passwordError: '',

            passwordCheck: '',
            passwordCheckIsValid: false,
            passwordCheckStarted: false,
            passwordCheckError: '',

            notification: '',
            notificationSuccess: false
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

    aliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.aliasStarted)
            this.setState({ aliasStarted: true })
        this.setState({ alias: event.target.value },
            () => {
                if (this.state.alias.match(aliasRegex) && this.state.alias.length > 2)
                    this.setState({ aliasIsValid: true, aliasError: '' })
                else
                    this.setState({ aliasIsValid: false, aliasError: 'Alias must consist only of letters and numbers and be at least 3 characters long' })
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

    registerSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        await fetch(`${APIURL}/account/register`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                account: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((result) => {
            result.status === 201 ? this.setState({ notificationSuccess: true }) : this.setState({ notificationSuccess: false })
            return result
        }).then(result => result.json())
            .then(result => this.setState({ notification: result.message }))
    }

    render() {
        return (
            <div className='columns'>
                <div className='column is-2 is-offset-5'>
                    <h1 className='title'>Sign Up</h1>

                    {/* EMAIL */}
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

                    {/* ALIAS */}
                    <div className='field'>
                        <label className='label' htmlFor='alias'>Alias <span className="tag is-white">(you can change this later)</span></label>
                        <div className='control has-icons-left has-icons-right'>
                            <input className={`input ${this.state.aliasIsValid && this.state.aliasStarted ? 'is-success' : !this.state.aliasStarted ? '' : 'is-danger'}`} type='text' id='alias' name='alias' value={this.state.alias} onChange={this.aliasChange} />
                            <span className="icon is-small is-left">
                                <i className='fas'><FontAwesomeIcon icon={faUser} /></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className={`fas ${this.state.aliasStarted ? '' : 'is-hidden'}`}>
                                    {this.state.aliasIsValid ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faExclamationTriangle} />}
                                </i>
                            </span>
                        </div>
                        <p className={`help is-danger ${this.state.aliasStarted ? '' : 'is-hidden'}`}>{this.state.aliasError}</p>
                    </div>

                    {/* PASSWORD */}
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

                    {/* PASSWORD CHECK */}
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
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button onClick={this.registerSubmit} disabled={this.state.emailIsValid && this.state.passwordCheckIsValid && this.state.passwordIsValid ? false : true} className={`button is-link `}>Submit</button>
                        </div>
                    </div>
                    <div className={`notification ${this.state.notification ? this.state.notificationSuccess ? 'is-success' : 'is-danger' : 'is-hidden'}`}>{this.state.notification}</div>
                </div>
            </div>

        )
    }
}

export default Register;