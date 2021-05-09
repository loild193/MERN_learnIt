import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

function AlertMessage({ info }) {
	return info && (
		<Alert variant={info.type}>{ info.message }</Alert>
	)
}

AlertMessage.propTypes = {

}

export default AlertMessage

