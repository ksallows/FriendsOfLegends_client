import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group, Image, Menu, MediaQuery, Text, Divider, Burger } from '@mantine/core';
import logo from '../assets/logo.svg'

interface NavState {
    menuOpened: boolean,
    menu: any
}

interface NavProps {
    app_sessionToken: string | null,
    app_clearToken: () => void,
    app_admin: boolean | null
}

class Nav extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
        this.state = {
            menuOpened: false,
            menu: this.props.app_sessionToken ? this.loggedInMenu : this.notLoggedInMenu
        }
    }

    setMenu = (value: boolean): void => {
        this.setState({ menu: this.props.app_sessionToken ? this.loggedInMenu : this.notLoggedInMenu },
            () => this.setState({ menuOpened: value }))

    }

    loggedInMenu = [
        <Menu.Item color='orange' component={Link} to='/search'>Find Friends</Menu.Item>,
        <Menu.Item component={Link} to='/editprofile'>Profile</Menu.Item>,
        <Divider />,
        <Menu.Item component={Link} to='/' onClick={this.props.app_clearToken}>Log Out</Menu.Item>
    ]

    notLoggedInMenu = [
        <Menu.Item component={Link} to='/register'>Sign Up</Menu.Item>,
        <Menu.Item component={Link} to='/login'>Log In</Menu.Item>
    ]

    render() {
        return (
            <Header sx={{ padding: 10, backgroundColor: 'transparent', border: '0' }} height={65}>
                <MediaQuery styles={{ display: 'none' }} largerThan={'md'}>
                    <Group position='apart'>
                        <Link to='/'><Image src={logo} width={200} /></Link>
                        <Menu opened={this.state.menuOpened} onOpen={() => this.setMenu(true)} onClose={() => this.setMenu(false)} closeOnItemClick control={<Burger opened={this.state.menuOpened} />}>
                            {this.state.menu}
                        </Menu>
                    </Group>

                </MediaQuery>

                <MediaQuery styles={{ display: 'none' }} smallerThan={'lg'}>
                    {this.props.app_sessionToken ?
                        <Group position='apart'>
                            <Group>
                                <Link to='/'><Image src={logo} width={280} /></Link>
                                <Button size='md' variant='gradient' component={Link} to='/search' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Find Friends</Button>
                                <Button color='gray' size='md' component={Link} to='/editprofile'>Profile</Button>
                            </Group>
                            <Group>
                                {this.props.app_admin ? <Button component={Link} to='/admin' variant='subtle' color='red' size='md'>Admin</Button> : ''}
                                <Button component={Link} to='/' variant='subtle' color='gray' size='md' onClick={this.props.app_clearToken}>Log Out</Button>
                            </Group>
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
                </MediaQuery>

            </Header>
        )
    }
}

export default Nav;