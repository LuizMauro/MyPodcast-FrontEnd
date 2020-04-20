import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { FormGroup } from "reactstrap";

export default function Input({ name, className, ...rest }) {
  const inputRef = useRef(null);

  const {
    fieldName,
    defaultValue = "",
    registerField,
    placeholder = "",
    error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <FormGroup className={error ? "has-danger form-group" : "has-success"}>
        <textarea
          className={
            error
              ? "is-invalid form-control shadow"
              : "shadow has-success form-control"
          }
          style={{
            width: "100%",
            background: "#232659",
            minHeight: 100,
            borderRadius: 4,
            border: "1px solid #666",
            padding: 5,
            color: "#fff",
          }}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />
        {error && (
          <span style={{ color: "#FE2946", fontSize: 12 }}> {error} </span>
        )}
      </FormGroup>
    </div>
  );
}
