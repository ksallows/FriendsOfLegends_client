import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Image, Grid, Title, Center, Group, Button } from '@mantine/core';
import SplashPicture from '../assets/teemoamumu.png'
import logo from '../assets/logo.svg'
import video from '../assets/bgVideo.mp4'

interface HomeProps {
    app_sessionToken: string | null,
}

class Home extends React.Component<HomeProps, {}> {

    render() {
        return (
            <>
                <Grid gutter={0} sx={{ marginTop: '20vh' }}>
                    <Grid.Col xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                        <Image src={logo} sx={{ marginBottom: '2rem' }} />
                        <Paper sx={{ backgroundColor: 'rgba(31,32,35,0.8)', marginBottom: '2rem' }} padding='md' shadow='sm'>
                            <Group position='apart'>
                                <div>
                                    <Title sx={{ color: '#fff' }} order={3}>Find friends in League of Legends</Title>
                                    <ul className='white'>
                                        <li>Everyone is welcome!</li>
                                        <li>Find ranked duos, aram buddies, or anything in between</li>
                                        <li>Search by rank, role, top champions, and more</li>
                                    </ul>
                                </div>
                                {this.props.app_sessionToken ?
                                    ''
                                    :
                                    <Group direction='column'>
                                        <Button fullWidth size='md' variant='gradient' component={Link} to='/register' gradient={{ from: 'orange', to: 'yellow', deg: 105 }}>Sign Up</Button>
                                        <Button fullWidth color='gray' size='md' component={Link} to='/login'>Log In</Button>
                                    </Group>
                                }
                            </Group>

                        </Paper>
                        {/* <Center><Image src={SplashPicture} sx={{ width: '50%' }} /></Center> */}
                    </Grid.Col>
                </Grid>
                <video autoPlay muted loop id='bgVideo'>
                    <source src={video} type='video/mp4' />
                </video>
            </>
        )
    }
}

export default Home;