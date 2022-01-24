import React from 'react';

type RegisterValues = {

}

class Register extends React.Component<{}, RegisterValues> {
    constructor(props: any) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='columns'>
                <div className='column is-2 is-offset-5'>
                    <h1>Register</h1>
                    <div className='field'>
                        <div className='control'>
                            <label className='label' htmlFor='email'>Email</label>
                            <input className='input' type='text' id='email' name='email' />
                            <label className='label' htmlFor='password'>Password</label>
                            <input className='input' type='password' id='password' name='password' />
                            <label className='label' htmlFor='passwordMatch'>Retype Password</label>
                            <input className='input' type='passwordMatch' id='passwordMatch' name='passwordMatch' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;