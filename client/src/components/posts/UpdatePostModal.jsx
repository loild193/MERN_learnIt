import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/postContext'

function UpdatePostModal(props) {
	const { 
		showUpdatePostModal, 
		setShowUpdatePostModal, 
		postState: { post },
		updatePost,
		setShowToast, 
	} = useContext(PostContext);
	const [updatedPost, setUpdatedPost] = useState(post);
	const { title, description, url, status } = updatedPost;

	useEffect(() => setUpdatedPost(post), [post]);

	const onChangeUpdatedPostForm = e => {
		setUpdatedPost({
			...updatedPost,
			[e.target.name]: e.target.value,
		});
	}

	const closeDialog = () => {
		setShowUpdatePostModal(false);
		setUpdatedPost(post);
	}

	const onSumitUpdatedPost = async e => {
		e.preventDefault();
		const { success, message } = await updatePost(updatedPost);
		
		setShowToast({
			show: true,
			message,
			type: success ? "success" : "danger",
		});
		closeDialog();
	}

	return (
		<Modal 
			show={showUpdatePostModal}
			onHide={closeDialog}
		>
			<Modal.Header closeButton>
				<Modal.Title>Making progress?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSumitUpdatedPost}>
				<Modal.Body>
					<Form.Group>
						<Form.Control 
							type="text" 
							placeholder="Title" 
							name="title"
							value={title}
							onChange={onChangeUpdatedPostForm}
							required
							aria-describedby="title-help"
						/>
						<Form.Text id="title-help" muted>Required</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="textarea"
							placeholder="Description"
							rows={3} 
							name="description"
							value={description}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Youtube Tutorial URL"
							name="url"
							value={url}
							onChange={onChangeUpdatedPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="select"
							name="status"
							value={status}
							onChange={onChangeUpdatedPostForm}
						>
							<option value="TO LEARN">TO LEARN</option>
							<option value="LEARNING">LEARNING</option>
							<option value="LEARNED">LEARNED</option>
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeDialog}>Cancel</Button>
					<Button variant="primary" type="submit">Send</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

UpdatePostModal.propTypes = {

}

export default UpdatePostModal

