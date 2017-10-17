module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    withScreenDetails,
    Wrapper
  } = {}
) => {
  const { Component } = React;

  const Row = props => {
    const {
      style,
      className,
      horizontalGutter,
      verticalGutter,
      screenDetails,
      children
    } = props;

    const { alignItems, alignContent } = screenDetails.breakpoints
      .filter(({ active }) => active)
      .reduce(
        ({ alignItems, alignContent }, { size }) => ({
          alignItems: props[`${size}AlignItems`] || alignItems,
          alignContent: props[`${size}AlignContent`] || alignContent
        }),
        { alignItems: null, alignContent: null }
      );

    return (
      <Wrapper
        className={className}
        style={{
          ...style,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: horizontalGutter ? -horizontalGutter / 2 : null,
          marginRight: horizontalGutter ? -horizontalGutter / 2 : null,
          marginTop: verticalGutter ? -verticalGutter / 2 : null,
          marginBottom: verticalGutter ? -verticalGutter / 2 : null,
          alignItems,
          alignContent
        }}
      >
        {horizontalGutter || verticalGutter
          ? React.Children.map(children, col =>
              React.cloneElement(col, {
                style: {
                  ...col.props.style,
                  paddingLeft: horizontalGutter ? horizontalGutter / 2 : null,
                  paddingRight: horizontalGutter ? horizontalGutter / 2 : null,
                  paddingTop: verticalGutter ? verticalGutter / 2 : null,
                  paddingBottom: verticalGutter ? verticalGutter / 2 : null
                }
              })
            )
          : children}
      </Wrapper>
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
