import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../styles/css/mail.scss';
import { faMailBulk, faPenSquare, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row } from 'reactstrap';
import { SendingMail } from '../services/SendingMail';
import { Header } from '../components/Header';

export const Mailing = () => {
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	function validateForm() {
		return subject.length > 0 && message.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await SendingMail(subject, message);
		// console.table(...response.data);
		// console.log(response.data.res);
		if (response.data.res) {
			toast.success(' Message envoyé avec succès ', {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		} else {
			toast.error('   L\'envoi du message a échoué ', {
				position: 'bottom-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		}
	}

	return (
		<div>
			<Header mailing />
			<Container className="remove" fluid>
				<Row>
					<div className="Mail">
						{/*<div className="textC">*/}
						{/*	<img*/}
						{/*		className="round imgH"*/}
						{/*		src="../assets/img/transport-public-user-interface-train-icon-design.jpg"*/}
						{/*		alt="imgNotFound"*/}
						{/*	/>*/}
						{/*</div>*/}
						<ToastContainer
							className="leftN"
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
						<Form onSubmit={handleSubmit}>
							<FontAwesomeIcon icon={faMailBulk} className="iconLogin" />
							<Form.Group size="lg" controlId="subject">
								<Form.Label><FontAwesomeIcon icon={faPenSquare} /> Subject</Form.Label>
								<Form.Control
									autoFocus
									type="text"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
								/>
							</Form.Group>
							<Form.Group size="lg" controlId="password">
								<Form.Label> <FontAwesomeIcon icon={faComment} /> Message</Form.Label>
								<Form.Control as="textarea" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
							</Form.Group>
							<Button block size="lg" type="submit" disabled={!validateForm()}>
								Send
							</Button>
						</Form>
					</div>
				</Row>
			</Container>
		</div>
	);
};
