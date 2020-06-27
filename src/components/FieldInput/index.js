import React from 'react';

import {
  FormControl,
  InputLabel,
  FormHelperText,
  Input
} from '@material-ui/core';

/**
 * @author Ayrton Gomes
 *
 * Generic field input function component to render on the form
 */
function FieldInput({ field, type, ...props }) {
  return (
    <>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        {props.label !== undefined ? (
          <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
        ) : null}
        <Input id={props.id} {...field} type={type} />
        {props.helpText !== undefined ? (
          <FormHelperText>{props.helpText}</FormHelperText>
        ) : null}
      </FormControl>
    </>
  );
}

export default FieldInput;
