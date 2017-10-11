module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails
  } = {}
) => {
  const { Component } = React;

  const Show = props => {
    const { children, screenDetails } = props;

    const lastMatching = screenDetails.breakpoints
      .filter(({ active, size }) => active && props[size] != null)
      .slice(-1)[0];

    return (lastMatching || null) && props[lastMatching.size] ? children : null;
  };

  const ShowWithScreenDetails = withScreenDetails(Show);

  ShowWithScreenDetails.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  ShowWithScreenDetails.defaultProps = {
    children: null
  };

  return ShowWithScreenDetails;
};
