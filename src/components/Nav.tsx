import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group } from '@mantine/core';

type NavbarState = {
    burgerActive: boolean
}

class Nav extends React.Component<{}, NavbarState> {
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
            <Header sx={{ padding: 10 }} height={60}>
                <Group>
                    <Button size='md' variant="gradient" component={Link} to='/register' gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Sign Up</Button>
                    <Button size='md' variant="gradient" component={Link} to='/login' gradient={{ from: 'grape', to: 'pink', deg: 35 }}>Log In</Button>
                </Group>
            </Header>
        )
    }
}

export default Nav;