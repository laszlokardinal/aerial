module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails
  } = {}
) => {
  const { Component } = React;

  const Container = props => {
    const { style, className, screenDetails, children } = props;

    const { containerWidth } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .slice(-1)[0] || { containerWidth: "auto" };

    return (
      <div
        className={className}
        style={{
          ...style,
          marginLeft: "auto",
          marginRight: "auto",
          width: containerWidth
        }}
      >
        {children}
      </div>
    );
  };

  const ContainerWithScreenDetails = withScreenDetails(Container);

  ContainerWithScreenDetails.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
  };

  ContainerWithScreenDetails.defaultProps = {
    style: {},
    className: ""
  };

  return ContainerWithScreenDetails;
};
