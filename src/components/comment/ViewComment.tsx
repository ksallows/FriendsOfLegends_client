import React from 'react';
import APIURL from '../../helpers/environment';
import { Space } from '@mantine/core';
import CommentBlock from './CommentBlock'
import { Comment } from '../../d';
import AddComment from '../comment/AddComment'

interface ViewCommentState {
    comments: Comment[] | null
}

interface ViewCommentProps {
    app_sessionToken: string | null,
    profileId?: string | null,
    app_profileId: string | null
}

class ViewComment extends React.Component<ViewCommentProps, ViewCommentState> {
    constructor(props: ViewCommentProps) {
        super(props);
        this.state = {
            comments: null
        }
    }

    loadComments = async () => {
        await fetch(`${APIURL}/comment/comments/${this.props.profileId}`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({ comments: result }))
            .catch(error => console.log(error))

    }

    componentDidMount = async () => {
        setTimeout(async () => this.loadComments(), 500)
    }

    render() {
        return (
            <>
                {this.props.app_profileId !== this.props.profileId ?
                    <AddComment loadComments={this.loadComments} profileId={this.props.profileId} app_sessionToken={this.props.app_sessionToken} />
                    :
                    ''
                }
                {this.state.comments !== null && this.state.comments.length > 0 ?
                    Object.keys(this.state.comments).map((key, index) => (
                        <>
                            {index === 0 ? <Space h='xl'></Space> : ''}
                            <CommentBlock
                                key={index}
                                loadComments={this.loadComments}
                                body={this.state.comments![index].body}
                                fromSummonerName={this.state.comments![index].fromSummonerName}
                                fromProfileId={this.state.comments![index].fromProfileId}
                                commentId={this.state.comments![index].commentId}
                                app_sessionToken={this.props.app_sessionToken}
                                app_profileId={this.props.app_profileId}
                            />
                            <Space h='xl'></Space>
                        </>
                    ))
                    :
                    <p>No comments on this profile yet.</p>
                }
            </>
        )
    }
}

export default ViewComment;