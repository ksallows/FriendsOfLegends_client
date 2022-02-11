import React from 'react';
import { Paper, Title, Group, ActionIcon, Textarea, Space, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import DeleteComment from './DeleteComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import APIURL from '../../helpers/environment';

interface CommentBlockState {
    editMode: boolean,
    editComment: string,
    loading: boolean
}

interface CommentBlockProps {
    body: string,
    fromSummonerName: string,
    fromProfileId: string,
    loadComments: () => any,
    commentId: string,
    app_sessionToken: string | null,
    app_profileId: string | null,
    app_admin: boolean
}

class CommentBlock extends React.Component<CommentBlockProps, CommentBlockState> {
    constructor(props: CommentBlockProps) {
        super(props);
        this.state = {
            editMode: false,
            editComment: this.props.body,
            loading: false
        }
    }

    switchMode = (): void => this.setState({ editMode: !this.state.editMode })

    commentChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({ editComment: event.target.value })

    editComment = async () => {
        this.setState({ loading: true })
        await fetch(`${APIURL}/comment/edit`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify({
                comment: {
                    commentId: this.props.commentId,
                    body: this.state.editComment
                }
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.setState({ loading: false, editMode: false })
                    this.props.loadComments();
                }
                else return result
            })
            .then(result => result?.json())
            .then(result => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <Paper sx={{ backgroundColor: '#222326' }} padding='md' shadow='sm' withBorder>
                <Group position='apart'>
                    <Title order={5}><Link className='white' to={`/p/${this.props.fromProfileId}`}>{this.props.fromSummonerName}</Link></Title>
                    {this.props.app_admin || this.props.app_profileId === this.props.fromProfileId ?
                        <Group >
                            <DeleteComment app_profileId={this.props.app_profileId} app_sessionToken={this.props.app_sessionToken} loadComments={this.props.loadComments} commentId={this.props.commentId} />
                            {this.state.editMode ?
                                <Button onClick={this.editComment} size='xs' color='green'>Save</Button>
                                :
                                <ActionIcon onClick={this.switchMode} variant='filled' color='yellow'><FontAwesomeIcon icon={faPen} /></ActionIcon>
                            }

                        </Group>
                        :
                        ''
                    }
                </Group>
                {this.state.editMode ?
                    <>
                        <Space h='md' />
                        <Textarea onChange={this.commentChange} value={this.state.editComment} />
                    </>

                    :
                    <p>{this.props.body}</p>
                }

            </Paper>
        )
    }
}

export default CommentBlock;