import React from 'react';
import APIURL from '../../helpers/environment'
import { Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

interface RefreshProps {
    refresh: () => any,
    refreshLoading: boolean
}

class Refresh extends React.Component<RefreshProps, {}> {
    constructor(props: RefreshProps) {
        super(props);
    }
    render() {
        return (
            <Button loading={this.props.refreshLoading} onClick={this.props.refresh} color='orange' leftIcon={<FontAwesomeIcon icon={faSync} />}> Refresh</Button>
        )
    }
}

export default Refresh;