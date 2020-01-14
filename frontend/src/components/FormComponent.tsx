import React from 'react';

import { FormGroup } from '../styles/FormStyle';

type IFormComponent = {
  htmlFor: string;
  labelText: string;
  currentRef?: React.RefObject<HTMLLabelElement>;
  type: string;
  name: string;
  registerRef: any;
  placeholder: string;
  hasError: boolean;
  errorMessage: string | undefined;
  disabled: boolean;
};

const FormComponent: React.FC<IFormComponent> = (props) => {
  return (
    <React.Fragment>
      <FormGroup>
        <label htmlFor={props.htmlFor} ref={props.currentRef}>
          {props.labelText}
        </label>
        <input
          type={props.type}
          name={props.name}
          ref={props.registerRef}
          placeholder={props.placeholder}
          id={props.htmlFor}
          disabled={props.disabled}
        />
        {props.hasError && <span>{props.errorMessage}</span>}
      </FormGroup>
    </React.Fragment>
  );
};

export default FormComponent;
