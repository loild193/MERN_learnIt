import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function About(props) {
	return (
		<Row className="mt-5" style={{ marginRight: 0 }}>
			<Col className="text-center">
				<Button 
					variant="primary" 
					href="https://facebook.com/letmemiracle19" 
					size="lg" 
					target="_blank"
				>
					Visit my facebook account bro
				</Button>
			</Col>
		</Row>
	)
}

About.propTypes = {

}

export default About

