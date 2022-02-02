import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group, Title, Grid } from '@mantine/core';
import Verify from './Verify'

interface EditProfileState {
}

interface EditProfileProps {
    auth: () => boolean,
    sessionToken: string | null,
    verified: boolean
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
    constructor(props: EditProfileProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Title>Edit Profile</Title>
                    <Verify verified={this.props.verified} sessionToken={this.props.sessionToken} />
                </Grid.Col>
            </Grid>
        )
    }
}

export default EditProfile;