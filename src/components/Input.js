import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, placeholder = '' ,error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      
    });
  }, [fieldName, registerField]);

  return(
      <div>
         <input ref={inputRef} placeholder={placeholder} defaultValue={defaultValue} {...rest} />
         { error && <span style={{color:'red'}}> {error} </span> }
      </div>
  );
}