import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

type NavbarState = {
    burgerActive: boolean
}

class Navbar extends React.Component<{}, NavbarState> {
    constructor(props = {}) {
        super(props);
        this.state = {
            burgerActive: false
        }
    }

    burgerToggle = () => {
        this.setState({ burgerActive: !this.state.burgerActive })
    }

    render() {
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Friends of Legends
                    </Typography>
                </Toolbar>
            </AppBar>
            // <nav className='navbar is-dark' role='navigation'>
            //     <div className='navbar-brand'>
            //         <Link to='/' className='navbar-item'>
            //             <img alt='Friends of Legends logo' src=' https://via.placeholder.com/112x28/363636/808080?text=LOGO' />
            //         </Link>
            //         {
            //             // eslint-disable-next-line
            //         }  <a role="button" className={`navbar-burger ${this.state.burgerActive ? 'is-active' : ''}`} data-target="navbar" onClick={this.burgerToggle}>
            //             <span aria-hidden="true"></span>
            //             <span aria-hidden="true"></span>
            //             <span aria-hidden="true"></span>
            //         </a>
            //     </div>
            //     <div id='navbar' className={`navbar-menu ${this.state.burgerActive ? 'is-active' : ''}`}>
            //         <div className='navbar-start'>
            //             <a className='navbar-item' href='/'>Link</a>
            //         </div>
            //     </div>

            //     <div className='navbar-end'>
            //         <div className='navbar-item'>
            //             <div className='buttons'>
            //                 <Link to='/register' className='button is-primary'>Sign Up</Link>
            //                 <Link to='/login' className='button is-light'>Log In</Link>
            //             </div>
            //         </div>
            //     </div>
            // </nav>
        )
    }
}

export default Navbar;