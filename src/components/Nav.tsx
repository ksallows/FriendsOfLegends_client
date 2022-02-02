import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group } from '@mantine/core';

interface NavState {

}

interface NavProps {
    auth: () => boolean,
    sessionToken: string | null,
    clearToken: () => void
}

class Nav extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Header sx={{ padding: 10 }} height={65}>
                {this.props.sessionToken ?
                    <Group position='apart'>
                        <Group>
                            <Button size='md' variant='gradient' component={Link} to='/search' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Find Friends</Button>
                            <Button color='gray' size='md' component={Link} to='/editprofile'>Profile</Button>
                        </Group>
                        <Button color='gray' size='md' onClick={this.props.clearToken}>Log Out</Button>
                    </Group>

                    :

                    <Group>
                        <Button size='md' variant='gradient' component={Link} to='/register' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Sign Up</Button>
                        <Button color='gray' size='md' component={Link} to='/login'>Log In</Button>
                    </Group>
                }
            </Header>
        )
    }
}

export default Nav;