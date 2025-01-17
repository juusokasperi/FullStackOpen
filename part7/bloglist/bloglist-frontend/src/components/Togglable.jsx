import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={toggleVisibility}
        >
          Hide
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";

export default Togglable;
