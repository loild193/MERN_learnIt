import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PostContext } from '../../contexts/postContext'
import Spinner from 'react-bootstrap/esm/Spinner';
import Card from 'react-bootstrap/Card'
import { AuthContext } from '../../contexts/authContext';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import SinglePost from '../posts/SinglePost';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import Toast from 'react-bootstrap/esm/Toast';
import AddPostModal from '../posts/AddPostModal';
import addIcon from '../../assets/plus-circle-fill.svg'

function Dashboard(props) {
	const { 
		postState: { posts, postLoading }, 
		getPosts,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast,
	} = useContext(PostContext);
	const { authState: { user: { username }} } = useContext(AuthContext);
	
	useEffect(() => {
		getPosts();
	}, []);

	let body = null;

	if (postLoading) {
		body = (
			<div className="spinner-container">
				<Spinner animation="border" variant="info" />
			</div>
		)
	}
	else if (posts.length === 0) {
		body = (
			<React.Fragment>
				<Card className="text-center mx-5 my-5">
					<Card.Header as="h1"> Hi { username } </Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>Click the button below to track your first skill to learn</Card.Text>
						<Button 
							variant="primary"
							onClick={setShowAddPostModal.bind(this, true)}
						>
							LearnIt
						</Button>
					</Card.Body>
				</Card>
			</React.Fragment>
		)
	}
	else {
		body = (
			<React.Fragment>
				<Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
					{ posts.map(post => (
						<Col key={post._id} className="my-3">
							<SinglePost post={post} />
						</Col>
					))}
				</Row>

				<OverlayTrigger placement="left" overlay={
					<Tooltip>Add a new thing to learn</Tooltip>
				}>
					<Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
						<img src={addIcon} alt="add post" width="64" height="64" />
					</Button>
				</OverlayTrigger>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			{ body }
			<AddPostModal />

			<Toast
				show={show}
				style={{ position: "fixed", top: "20%", right: "10px" }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this,  { show: false, message: "", type: null })}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</React.Fragment>
	)
}

Dashboard.propTypes = {

}

export default Dashboard

