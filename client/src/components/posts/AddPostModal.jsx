import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/postContext'

function AddPostModal(props) {
	const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } = useContext(PostContext);
	const [newPost, setNewPost] = useState({
		title: "",
		description: "",
		url: "",
		status: "TO LEARN",
	});
	const { title, description, url } = newPost;

	const onChangeNewPostForm = e => {
		setNewPost({
			...newPost,
			[e.target.name]: e.target.value,
		});
	}

	const closeDialog = () => {
		setShowAddPostModal(false);
		setNewPost({
			title: "",
			description: "",
			url: "",
			status: "TO LEARN",
		});
	}

	const onSumitNewPost = async e => {
		e.preventDefault();
		const { success, message } = await addNewPost(newPost);
		
		setShowToast({
			show: true,
			message,
			type: success ? "success" : "danger",
		});
		closeDialog();
	}

	return (
		<Modal 
			show={showAddPostModal}
			onHide={closeDialog}
		>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSumitNewPost}>
				<Modal.Body>
					<Form.Group>
						<Form.Control 
							type="text" 
							placeholder="Title" 
							name="title"
							value={title}
							onChange={onChangeNewPostForm}
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
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Youtube Tutorial URL"
							name="url"
							value={url}
							onChange={onChangeNewPostForm}
						/>
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

AddPostModal.propTypes = {

}

export default AddPostModal

