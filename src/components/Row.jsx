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

    const activeBreakpoints = screenDetails.breakpoints.filter(
      ({ active }) => active
    );

    const {
      alignItems,
      alignContent,
      justifyContent
    } = activeBreakpoints.reduce(
      ({ alignItems, alignContent, justifyContent }, { size }) => ({
        alignItems: props[`${size}AlignItems`] || alignItems,
        alignContent: props[`${size}AlignContent`] || alignContent,
        justifyContent: props[`${size}JustifyContent`] || justifyContent
      }),
      { alignItems: null, alignContent: null, justifyContent: null }
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
          alignContent,
          justifyContent
        }}
      >
        {React.Children
          .toArray(children)
          .map((component, { index }) => ({
            component,
            index,
            order: activeBreakpoints.reduce(
              (order, { size }) => component.props[`${size}Order`] || order,
              0
            )
          }))
          .sort(
            (a, b) =>
              a.order < b.order
                ? -1
                : a.order > b.order
                  ? 1
                  : a.index < b.index ? -1 : a.index > b.index ? 1 : 0
          )
          .map(({ component }) =>
            React.cloneElement(component, {
              style: {
                ...component.props.style,
                paddingLeft: horizontalGutter ? horizontalGutter / 2 : null,
                paddingRight: horizontalGutter ? horizontalGutter / 2 : null,
                paddingTop: verticalGutter ? verticalGutter / 2 : null,
                paddingBottom: verticalGutter ? verticalGutter / 2 : null
              }
            })
          )}
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
