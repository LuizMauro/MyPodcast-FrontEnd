import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { FormGroup } from 'reactstrap';

export default function Input({ name, className, ...rest }) {
	const inputRef = useRef(null);

	const {
		fieldName,
		defaultValue = '',
		registerField,
		placeholder = '',
		error
	} = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value'
		});
	}, [fieldName, registerField]);

	return (
		<div>
			<FormGroup className={error ? 'has-danger form-group' : 'has-success'}>
				<input
					className={
						error ? 'is-invalid form-control' : 'has-success form-control'
					}
					ref={inputRef}
					defaultValue={defaultValue}
					placeholder={placeholder}
					{...rest}
				/>
				{error && (
					<span style={{ color: '#FE2946', fontSize: 12 }}> {error} </span>
				)}
			</FormGroup>
		</div>
	);
}
