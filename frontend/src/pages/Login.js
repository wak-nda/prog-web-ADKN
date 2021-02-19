import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/css/Login.scss';
import { faUserSecret, faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthHelperMethods from '../services/AuthHelperMethods';
import { login } from '../services/Login';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const Auth = new AuthHelperMethods();

	if (!Auth.loggedIn()) {
		history.push('/home');
	}

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await login(email, password);

		// console.table(...response.data);
		// console.log(response.data.res);
		if (response.data.res) {
			history.push('/home');
		} else {
			toast.error('   L\'authentification a échouer ', {
				position: 'top-center',
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
		<div className="Login">
			{/*<div className="textC">*/}
			{/*	<img*/}
			{/*		className="round imgH"*/}
			{/*		src="../assets/img/transport-public-user-interface-train-icon-design.jpg"*/}
			{/*		alt="imgNotFound"*/}
			{/*	/>*/}
			{/*</div>*/}
			<ToastContainer
				position="top-center"
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
				<FontAwesomeIcon icon={faUserSecret} className="iconLogin" />
				<Form.Group size="lg" controlId="email">
					<Form.Label><FontAwesomeIcon icon={faUser} /> Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label> <FontAwesomeIcon icon={faKey} /> Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</div>
	);
};
