import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group } from '@mantine/core';

type NavState = {

}

type NavProps = {
    auth: () => boolean
}

class Nav extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Header sx={{ padding: 10 }} height={60}>
                {!this.props.auth() ?

                    <Group>
                        <Button size='md' variant='gradient' component={Link} to='/register' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Sign Up</Button>
                        <Button color='gray' size='md' component={Link} to='/login'>Log In</Button>
                    </Group>
                    :
                    <Group>
                        <Button size='md' variant='gradient' component={Link} to='/search' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Find Friends</Button>
                        <Button color='gray' size='md' component={Link} to='/login'>Profile</Button>
                    </Group>}
            </Header>
        )
    }
}

export default Nav;