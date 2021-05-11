import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/postContext'

function AddPostModal(props) {
	const { showAddPostModal, setShowAddPostModal } = useContext(PostContext);

	const closeDialog = () => {
		setShowAddPostModal(false);
	}

	return (
		<Modal 
			show={showAddPostModal}
			onHide={closeDialog}
		>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to learn?</Modal.Title>
			</Modal.Header>
			<Form>
				<Modal.Body>
					<Form.Group>
						<Form.Control 
							type="text" 
							placeholder="Title" 
							name="title"
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
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Youtube Tutorial URL"
							name="url"
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

