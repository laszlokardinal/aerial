module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails
  } = {}
) => {
  const { Component } = React;

  const Switch = props => {
    const { screenDetails } = props;

    const content =
      screenDetails.breakpoints
        .map(({ active, size }) => active && props[size])
        .filter(content => content)
        .slice(-1)[0] || null;

    if (typeof content === "function") {
      return React.createElement(content, props);
    }

    return content;
  };

  const SwitchWithScreenDetails = withScreenDetails(Switch);

  SwitchWithScreenDetails.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  return SwitchWithScreenDetails;
};
