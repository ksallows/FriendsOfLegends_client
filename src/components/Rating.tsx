import React from 'react';
import APIURL from '../helpers/environment'
import { Group, ActionIcon, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

interface RatingProps {
    app_sessionToken: string | null,
    profileId: string | undefined,
}

interface RatingState {
    upvote?: boolean,
    downvote?: boolean,
    rating?: number,
    currentFunction: string
}

class Rating extends React.Component<RatingProps, RatingState> {
    constructor(props: RatingProps) {
        super(props);
        this.state = {
            upvote: false,
            downvote: false,
            rating: 0,
            currentFunction: ''
        }
    }

    getRating = async () => {
        await fetch(`${APIURL}/rating/ratings/${this.props.profileId}`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({
                upvote: result.upvote,
                downvote: result.downvote,
                rating: result.rating
            }))
    }

    sendRating = async () => {
        await fetch(`${APIURL}/rating/rate`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify({
                rating: this.state.currentFunction,
                forProfileId: this.props.profileId
            })
        })
            .then(this.getRating)
    }

    componentDidMount = () => {
        setTimeout(this.getRating, 500)
    }

    render() {
        return (
            <Group spacing='xs' position='center' direction='column'>
                {this.props.app_sessionToken ? <ActionIcon variant='light' color={this.state.upvote ? 'orange' : 'gray'} size='xs' onClick={() => {
                    this.setState({ currentFunction: 'upvote' }, this.sendRating)
                }}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </ActionIcon> : ''}
                <Text align='center'>
                    {this.state.rating}
                </Text>
                {this.props.app_sessionToken ? <ActionIcon variant='light' color={this.state.downvote ? 'orange' : 'gray'} size='xs' onClick={() => {
                    this.setState({ currentFunction: 'downvote' }, this.sendRating)
                }}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </ActionIcon> : ''}
            </Group>
        )
    }
}

export default Rating;