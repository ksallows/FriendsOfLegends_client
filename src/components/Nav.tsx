import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group, Image } from '@mantine/core';
import logo from '../assets/logo.svg'

interface NavState {

}

interface NavProps {
    app_auth: () => boolean,
    app_sessionToken: string | null,
    app_clearToken: () => void
}

class Nav extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Header sx={{ padding: 10, backgroundColor: '#151619' }} height={65}>

                {this.props.app_sessionToken ?
                    <Group position='apart'>
                        <Group>
                            <Link to='/'><Image src={logo} width={280} /></Link>
                            <Button size='md' variant='gradient' component={Link} to='/search' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Find Friends</Button>
                            <Button color='gray' size='md' component={Link} to='/editprofile'>Profile</Button>
                        </Group>
                        <Button component={Link} to='/' variant='subtle' color='gray' size='md' onClick={this.props.app_clearToken}>Log Out</Button>
                    </Group>

                    :

                    <Group position='apart'>
                        <Link to='/'><Image src={logo} width={280} /></Link>
                        <Group>
                            <Button size='md' variant='gradient' component={Link} to='/register' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Sign Up</Button>
                            <Button color='gray' size='md' component={Link} to='/login'>Log In</Button>
                        </Group>

                    </Group>
                }
            </Header>
        )
    }
}

export default Nav;