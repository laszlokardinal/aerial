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

    const { width, offset, alignSelf } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .reduce(
        ({ width, offset, alignSelf }, { size }) => ({
          width: props[size] || width,
          offset: props[`${size}Offset`] || offset,
          alignSelf: props[`${size}AlignSelf`] || alignSelf
        }),
        { width: 1, offset: 0, alignSelf: null }
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
          alignSelf
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
