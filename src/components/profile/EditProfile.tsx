import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Group } from '@mantine/core';

interface EditProfileState {

}

interface EditProfileProps {
    auth: () => boolean,
    sessionToken: string | null,
    clearToken: () => void
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
    constructor(props: EditProfileProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <></>
        )
    }
}

export default EditProfile;