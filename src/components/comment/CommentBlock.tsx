import React from 'react';
import { Paper, Title, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import DeleteComment from './DeleteComment';

interface CommentBlockState {

}

interface CommentBlockProps {
    body: string,
    fromSummonerName: string,
    fromProfileId: string,
    loadComments: () => any,
    commentId: string,
    app_sessionToken: string | null,
    app_profileId: string | null
}

class CommentBlock extends React.Component<CommentBlockProps, CommentBlockState> {
    constructor(props: CommentBlockProps) {
        super(props);
        this.state = {
            rankClass: undefined
        }
    }

    render() {
        return (
            <Paper sx={{ backgroundColor: '#222326' }} padding='md' shadow='sm' withBorder>
                <Group position='apart'>
                    <Title order={5}><Link className='white' to={`/p/${this.props.fromProfileId}`}>{this.props.fromSummonerName}</Link></Title>
                    <DeleteComment app_profileId={this.props.app_profileId} app_sessionToken={this.props.app_sessionToken} loadComments={this.props.loadComments} commentId={this.props.commentId} />
                </Group>
                <p>{this.props.body}</p>
            </Paper>
        )
    }
}

export default CommentBlock;