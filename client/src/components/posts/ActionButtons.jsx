import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/postContext'

function ActionButtons({ url, _id }) {
	const { deletePost } = useContext(PostContext);

	return (
		<React.Fragment>
			<Button className="post-button" href={url} target="_blank">
				<img src={playIcon} alt="play" width="32" height="32" />
			</Button>
			<Button className="post-button">
				<img src={editIcon} alt="edit" width="24" height="24" />
			</Button>
			<Button className="post-button" onClick={deletePost.bind(this, _id)}>
				<img src={deleteIcon} alt="delete" width="24" height="24" />
			</Button>
		</React.Fragment>
	)
}

ActionButtons.propTypes = {
	url: PropTypes.string,
	_id: PropTypes.string,
}

export default ActionButtons

