module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails,
    Wrapper,
    containerStyle
  } = {}
) => {
  const { Component } = React;

  const Container = props => {
    const { style, className, screenDetails, children } = props;

    const { containerWidth } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .slice(-1)[0] || { containerWidth: "auto" };

    return (
      <Wrapper
        className={className}
        style={{
          ...style,
          ...containerStyle,
          width: containerWidth
        }}
      >
        {children}
      </Wrapper>
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
