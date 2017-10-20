const mapHorizontalAlign = horizontalAlign =>
  horizontalAlign
    ? {
        left: "flex-start",
        center: "center",
        right: "flex-end"
      }[horizontalAlign] || null
    : null;

const mapVerticalAlign = verticalAlign =>
  verticalAlign
    ? {
        top: "flex-start",
        center: "center",
        bottom: "flex-end",
        stretch: "stretch"
      }[verticalAlign] || null
    : null;

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
    const { style, className, screenDetails, children } = props;

    const activeBreakpoints = screenDetails.breakpoints.filter(
      ({ active }) => active
    );

    const {
      horizontalAlign,
      verticalAlign,
      horizontalGutter,
      verticalGutter
    } = activeBreakpoints.reduce(
      (
        { horizontalAlign, verticalAlign, horizontalGutter, verticalGutter },
        { size }
      ) => ({
        horizontalAlign:
          props[`${size}HorizontalAlign`] != null
            ? props[`${size}HorizontalAlign`]
            : horizontalAlign,
        verticalAlign:
          props[`${size}VerticalAlign`] != null
            ? props[`${size}VerticalAlign`]
            : verticalAlign,
        horizontalGutter:
          props[`${size}HorizontalGutter`] != null
            ? props[`${size}HorizontalGutter`]
            : horizontalGutter,
        verticalGutter:
          props[`${size}VerticalGutter`] != null
            ? props[`${size}VerticalGutter`]
            : verticalGutter
      }),
      {
        horizontalAlign: "left",
        verticalAlign: "top",
        horizontalGutter: 0,
        verticalGutter: 0
      }
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
          marginTop: verticalGutter ? -verticalGutter : null,
          alignItems: mapVerticalAlign(verticalAlign),
          justifyContent: mapHorizontalAlign(horizontalAlign)
        }}
      >
        {React.Children
          .toArray(children)
          .map((component, index) => ({
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
                paddingTop: verticalGutter ? verticalGutter : null
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
