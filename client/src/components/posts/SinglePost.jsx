import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Badge from 'react-bootstrap/esm/Badge';
import Row from 'react-bootstrap/esm/Row';
import ActionButtons from './ActionButtons';

function SinglePost({ post }) {
	const { _id, status, title, description, url } = post;

	return (
		<Card 
			className="shadow" 
			border={
				status === "LEARNED" 
					? "success" 
					: status === "LEARNING" 
					? "warning" 
					: "danger"
			}
		>
			<Card.Body>
				<Card.Title>
					<Row>
						<Col>
							<p className="post-title">{ title }</p>
							<Badge 
								pill 
								variant={
									status === "LEARNED" 
										? "success" 
										: status === "LEARNING" 
										? "warning" 
										: "danger"
								}
							>
								{ status }
							</Badge>
						</Col>
						<Col className="text-right">
							<ActionButtons url={url} _id={_id} />
						</Col>
					</Row>
				</Card.Title>
				<Card.Text>{ description }</Card.Text>
			</Card.Body>
		</Card>
	)
}

SinglePost.propTypes = {
	post: PropTypes.object.isRequired,
}

export default SinglePost

