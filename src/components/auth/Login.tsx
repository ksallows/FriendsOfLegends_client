import APIURL from '../../helpers/environment'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEnvelope, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
// <FontAwesomeIcon icon={faCheck} />

type LoginState = {
    email: string,
    password: string,
    notification: string,
    notificationSuccess: boolean
}

type LoginProps = {
    sessionToken: string | null,
    updateToken: (token: string) => void
}

// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"_]).*$/

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            notification: '',
            notificationSuccess: false
        }
    }

    emailChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value })

    passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value })

    loginSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        await fetch(`${APIURL}/account/login`, {
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
            .then(result => {
                this.setState({ notification: result.message });
                this.props.updateToken(result.sessionToken)
            })
    }

    render() {
        return (
            <div className='columns'>
                <div className='
                    column 
                    is-10-mobile
                    is-offset-1-mobile
                    is-8-tablet
                    is-offset-2-tablet
                    is-4-desktop
                    is-offset-4-desktop
                    is-one-third-fullhd
                    is-offset-one-third-fullhd
                '>
                    <div className='block'></div>
                    <div className='box'>
                        <h1 className='title'>Sign Up</h1>

                        {/* EMAIL */}
                        <div className='field'>
                            <label className='label' htmlFor='email'>Email</label>
                            <div className='control has-icons-left has-icons-right'>
                                <input className='input' type='text' id='email' name='email' value={this.state.email} onChange={this.emailChange} />
                                <span className="icon is-small is-left">
                                    <i className='fas'><FontAwesomeIcon icon={faEnvelope} /></i>
                                </span>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className='field'>
                            <label className='label' htmlFor='password'>Password</label>
                            <div className='control has-icons-left has-icons-right'>
                                <input className='input' type='password' id='password' name='password' value={this.state.password} onChange={this.passwordChange} />
                                <span className="icon is-small is-left">
                                    <i className='fas'><FontAwesomeIcon icon={faLock} /></i>
                                </span>
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <button onClick={this.loginSubmit} disabled={this.state.email && this.state.password ? false : true} className={`button is-link `}>Submit</button>
                            </div>
                        </div>
                        <div className={`notification ${this.state.notification ? this.state.notificationSuccess ? 'is-success' : 'is-danger' : 'is-hidden'}`}>{this.state.notification}</div>
                        <div className='block'></div>
                        <Link to='login' className='has-text-centered is-block mx-auto is-size-7'>already have an account?</Link>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;