import React from 'react';

import { Form, Field } from 'formik';
import FieldInput from 'components/FieldInput';
import Button from '@material-ui/core/Button';

/**
 * @author Ayrton Gomes
 *
 * Form that uses the generics fields to render the full form
 */
const SampleForm = ({ ...props }) => {
  return (
    <Form style={{ width: '50%', margin: 'auto', marginTop: '5%' }}>
      <Field name="name">
        {({ field }) => <FieldInput field={field} label="Nome completo" />}
      </Field>
      <Button variant="contained" size="small" type="submit" fullWidth>
        Salvar
      </Button>
    </Form>
  );
};

export default SampleForm;
