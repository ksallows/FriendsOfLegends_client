import React from 'react';
import APIURL from '../../helpers/environment'
import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

interface RefreshProps {
    editProfile_refresh: () => any,
    editProfile_refreshLoading: boolean
}

class Refresh extends React.Component<RefreshProps, {}> {
    constructor(props: RefreshProps) {
        super(props);
    }
    render() {
        return (
            <Button loading={this.props.editProfile_refreshLoading} onClick={this.props.editProfile_refresh} color='orange' leftIcon={<FontAwesomeIcon icon={faSync} />}> Refresh</Button>
        )
    }
}

export default Refresh;