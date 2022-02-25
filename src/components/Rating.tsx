import { useState, useEffect } from 'react';
import APIURL from '../helpers/environment'
import { Group, ActionIcon, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

interface RatingProps {
    app_sessionToken: string | null,
    profileId: string | undefined,
}

const Rating = ({ app_sessionToken, profileId }: RatingProps) => {
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
    const [rating, setRating] = useState(0);
    const [currentFunction, setCurrentFunction] = useState('');

    const getRating = async () => {
        await fetch(`${APIURL}/rating/ratings/${profileId}`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${app_sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => {
                setRating(result.rating);
                setUpvote(result.upvote);
                setDownvote(result.downvote);
            })
    }

    const sendRating = async () => {
        await fetch(`${APIURL}/rating/rate`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${app_sessionToken}`
            }),
            body: JSON.stringify({
                rating: currentFunction,
                forProfileId: profileId
            })
        })
            .then(getRating)
    }

    useEffect(() => {
        if (currentFunction !== '') {
            sendRating();
            setCurrentFunction('');
        }
    }, [currentFunction])

    useEffect(() => {
        if (profileId !== undefined && app_sessionToken !== null)
            setTimeout(getRating, 200);
    }, [app_sessionToken, profileId, currentFunction])

    return (
        <Group spacing='xs' position='center' direction='column'>
            {app_sessionToken ? <ActionIcon variant='light' color={upvote ? 'orange' : 'gray'} size='xs' onClick={() => {
                setCurrentFunction('upvote');
            }}>
                <FontAwesomeIcon icon={faArrowUp} />
            </ActionIcon> : ''}
            <Text align='center'>
                {rating}
            </Text>
            {app_sessionToken ? <ActionIcon variant='light' color={downvote ? 'orange' : 'gray'} size='xs' onClick={() => {
                setCurrentFunction('downvote');
            }}>
                <FontAwesomeIcon icon={faArrowDown} />
            </ActionIcon> : ''}
        </Group>
    )
}

export default Rating;