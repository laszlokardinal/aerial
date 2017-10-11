module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails
  } = {}
) => {
  const { Component } = React;

  const Row = props => {
    const {
      style,
      className,
      horizontalGutter,
      verticalGutter,
      children
    } = props;

    const hasGutter = horizontalGutter || verticalGutter;

    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          flexWrap: "wrap",
          margin: hasGutter
            ? `${-verticalGutter / 2}px ${-horizontalGutter / 2}px`
            : null
        }}
      >
        {hasGutter
          ? React.Children.map(children, col =>
              React.cloneElement(col, {
                style: {
                  ...col.props.style,
                  padding: `${verticalGutter / 2}px ${horizontalGutter / 2}px`
                }
              })
            )
          : children}
      </div>
    );
  };

  const RowWithScreenDetails = withScreenDetails(Row);

  RowWithScreenDetails.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    horizontalGutter: PropTypes.number,
    verticalGutter: PropTypes.number
  };

  RowWithScreenDetails.defaultProps = {
    style: {},
    className: "",
    horizontalGutter: 0,
    verticalGutter: 0
  };

  return RowWithScreenDetails;
};
