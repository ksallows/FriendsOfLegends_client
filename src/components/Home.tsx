import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group, Image, Grid } from '@mantine/core';
import SplashPicture from '../assets/teemoamumu.png'
import logo from '../assets/logo.svg'

interface HomeProps {
    app_sessionToken: string | null,
}

class Home extends React.Component<HomeProps, {}> {
    constructor(props: HomeProps) {
        super(props)
    }

    render() {
        return (
            <Grid sx={{ marginTop: '2rem' }}>
                <Grid.Col xs={10} md={8} lg={4} xl={4} offsetXs={1} offsetMd={2} offsetLg={4} offsetXl={4}>
                    <Image src={logo} />
                    <Image src={SplashPicture} />
                </Grid.Col>
            </Grid>
        )
    }
}

export default Home;