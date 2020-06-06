import React, { useState, useContext } from 'react';
import axios from 'axios';
import Flatpickr from 'react-flatpickr';
import { SessionContext } from '../../App';
import 'flatpickr/dist/themes/material_green.css';
import '../scss/buttonstyles.scss';
import '../scss/newSession.scss';

const Session = () => {
	const [ host, setHost ] = useState(values.te);
	const [ date, setDate ] = useState(new Date());
	const [ session, setSession ] = useContext(SessionContext);

	const handleSubmit = (e) => {
		const location = host === values.te ? values.teAddress : values.kjAddress;
		e.preventDefault();
		axios
			.post('api/sessions', { host, date })
			.then((res) => {
				setSession({ id: res.data.id, date, host, location });
				setDate(new Date());
				setHost('');
			})
			.catch((e) => console.log(e));
	};

	return (
		<div className="new-session">
			<div style={{ display: 'none' }}>{session}</div>
			<div>
				<div className="header">Create New Whiskey Night</div>
				<div className="date-area">
					<Flatpickr
						className="picker"
						data-enable-time
						value={date}
						options={{
							disableMobile: true,
							defaultMinute: 0,
							defaultHour: 16,
							minDate: 'today',
							dateFormat: 'F J\\, h K',
							enableTime: true,
							minTime: '16:00',
							maxTime: '22:00',
							minuteIncrement: '60'
						}}
						onChange={(date) => {
							setDate(...date);
						}}
					/>
					<div className="info">Pick Date</div>
				</div>
				<div className="button-container">
					<button
						className={`bttn host left-host ${host === values.te ? 'active' : ''}`}
						active={values.te}
						onClick={(e) => setHost(e.target.name)}
						name={values.te}
					>
						{values.te}
					</button>
					<button
						className={`bttn host right-host ${host === values.kj ? 'active' : ''}`}
						isactive={host === values.kj ? values.kj : null}
						onClick={(e) => setHost(e.target.name)}
						name={values.kj}
					>
						{values.kj}
					</button>
				</div>
				<div className="create-new">
					<button onClick={handleSubmit} className="bttn submit">
						Create New
					</button>
				</div>
			</div>
		</div>
	);
};

export default Session;

const values = {
	te: "Tyler & Emily's",
	kj: "Kevin & Jill's",
	teAddress: 'https://goo.gl/maps/WmDQQmAaPaj8HLiC7',
	kjAddress: 'https://goo.gl/maps/NzJXuMZ4XMjdh7es7'
};
