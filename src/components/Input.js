import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';


import {
  FormGroup,
  Input
} from "reactstrap";

export default function InputTest({ name, className , ...rest }) {
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
        <FormGroup className= {error ? "has-error" : "has-success"}>
          <input className={className}  ref={inputRef}  placeholder={placeholder} defaultValue={defaultValue} {...rest}  />
        </FormGroup> 
      </div>
  );
}