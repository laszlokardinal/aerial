module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails
  } = {}
) => {
  const { Component } = React;

  const Col = props => {
    const { style, className, screenDetails, children } = props;

    const { width, offset } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .reduce(
        ({ width, offset }, { size }) => ({
          width: props[size] || width,
          offset: props[`${size}Offset`] || offset
        }),
        { width: 1, offset: 0 }
      );

    return (
      <div
        className={className}
        style={{
          ...style,
          flex: `0 0 ${width * 100}%`,
          marginLeft: offset ? `${offset * 100}%` : null,
          boxSizing: "border-box"
        }}
      >
        {children}
      </div>
    );
  };

  const ColWithScreenDetails = withScreenDetails(Col);

  ColWithScreenDetails.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
  };

  ColWithScreenDetails.defaultProps = {
    style: {},
    className: ""
  };

  return ColWithScreenDetails;
};
