/* eslint-disable no-prototype-builtins */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorMessage, Field, getIn } from 'formik';
import PropTypes from "prop-types";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const SelectFormik = (props) => {
  const {
    label, name, options, reason, ...rest
  } = props;
  // console.log(props);
  const classes = useStyles();
  return (
    <div>
      <Field name={name} id={name} {...rest}>
        {({ field, form }) => {
          const errors = getIn(form.errors, name);
          const touch = getIn(form.touched, name);
          const errorStyle = touch && errors;
          return (
            <FormControl className={classes.formControl} disabled={reason && reason === ""} error={errorStyle || false}>
              <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...field}
              >
                {options.map((option) => (

                  <MenuItem value={option.value} key={option.value}>
                    {option?.label||option?.value}
                  </MenuItem>

                ))}
              </Select>
              <ErrorMessage name={name}>
                {(error) => <FormHelperText>{error}</FormHelperText>}
              </ErrorMessage>
            </FormControl>
          );
        }}

      </Field>

    </div>
  );
};
SelectFormik.defaultProps = {
  reason: ""
};
SelectFormik.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  reason: PropTypes.string
};

export default SelectFormik;
