const mapVerticalAlign = verticalAlign =>
  verticalAlign
    ? {
        auto: "auto",
        top: "flex-start",
        bottom: "flex-end",
        center: "center",
        baseline: "baseline",
        stretch: "stretch"
      }[verticalAlign] || null
    : null;

module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails,
    Wrapper,
    colStyle = {}
  } = {}
) => {
  const { Component } = React;

  const Col = props => {
    const { style, className, screenDetails, children } = props;

    const { width, offset, verticalAlign } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .reduce(
        ({ width, offset, verticalAlign }, { size }) => ({
          width: props[size] || width,
          offset: props[`${size}Offset`] || offset,
          verticalAlign: props[`${size}VerticalAlign`] || verticalAlign
        }),
        { width: 1, offset: 0, verticalAlign: "auto" }
      );

    return (
      <Wrapper
        className={className}
        style={{
          ...style,
          ...colStyle,
          width: `${width * 100}%`,
          marginLeft: offset ? `${offset * 100}%` : null,
          flexShrink: 0,
          flexGrow: 0,
          alignSelf: mapVerticalAlign(verticalAlign)
        }}
      >
        {children}
      </Wrapper>
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
