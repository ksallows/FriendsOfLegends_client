import React from 'react';
import APIURL from '../../helpers/environment';
import { ActionIcon } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface DeleteCommentProps {
    app_sessionToken: string | null,
    loadComments: () => Promise<void>
    commentId: string,
    app_profileId: string | null
}

class DeleteComment extends React.Component<DeleteCommentProps, {}> {
    constructor(props: DeleteCommentProps) {
        super(props);
    }

    deleteComment = async () => {
        await fetch(`${APIURL}/comment/delete`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify({
                comment: {
                    commentId: this.props.commentId
                }
            })
        })
            .then(() => this.props.loadComments())
    }

    render() {
        return (
            <ActionIcon variant='filled' color='red'><FontAwesomeIcon icon={faTrash} /></ActionIcon>
        )
    }
}

export default DeleteComment;