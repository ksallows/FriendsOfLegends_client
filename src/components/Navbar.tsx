import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component<{}, {}> {
    // constructor(props: any) {
    //     super(props)
    // }

    render() {
        return (
            <nav className='navbar is-dark' role='navigation'>
                <div className='navbar-brand'>
                    <Link to='/' className='navbar-item'>
                        <img alt='Friends of Legends logo' src=' https://via.placeholder.com/112x28/363636/808080?text=LOGO' />
                    </Link>
                </div>

                <div className='navbar-menu'>
                    <div className='navbar-start'>
                        <a className='navbar-item' href='/'>Link</a>
                    </div>
                </div>

                <div className='navbar-end'>
                    <div className='navbar-item'>
                        <div className='buttons'>
                            <Link to='/register' className='button is-primary'>Sign Up</Link>
                            <Link to='/login' className='button is-light'>Log In</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;