'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
	return (
		<ToastContainer
			position='top-right'
			autoClose={5000}
			hideProgressBar={false}
			closeOnClick
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='light'
		/>
	);
}
