import React from 'react';
import { Textarea, Space, Group, Button, Alert } from '@mantine/core';
import APIURL from '../../helpers/environment'

interface AddCommentState {
    comment: string,
    loading: boolean,
    notification?: string,
    color?: string
}

interface AddCommentProps {
    app_sessionToken: string | null,
    profileId?: string | null,
    loadComments: () => any
}

class AddComment extends React.Component<AddCommentProps, AddCommentState> {
    constructor(props: AddCommentProps) {
        super(props);
        this.state = {
            comment: '',
            loading: false
        }
    }

    commentChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({ comment: event.target.value })

    submitComment = async () => {
        this.setState({ loading: true })
        await fetch(`${APIURL}/comment/new`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify({
                comment: {
                    forProfile: this.props.profileId,
                    body: this.state.comment
                }
            })
        })
            .then(result => {
                if (result.status === 201) {
                    this.setState({ notification: 'Comment posted!', color: 'green', loading: false })
                    this.props.loadComments();
                }
                else return result
            })
            .then(result => result?.json())
            .then(result => {
                this.setState({ notification: result.message, color: 'red', loading: false });
            })
    }

    render() {
        return (
            <>
                <Space h='xl' />
                <Textarea onChange={this.commentChange} value={this.state.comment} placeholder='add a comment about this player' />
                <Space h='sm' />
                <Group>
                    <Button loading={this.state.loading} color='orange' onClick={this.submitComment}>Submit</Button>
                    {this.state.notification ? <Alert variant='filled' color={this.state.color}>{this.state.notification}</Alert> : ''}
                </Group>

            </>
        )
    }
}

export default AddComment;