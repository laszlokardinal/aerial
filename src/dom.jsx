const detailsSource = window
  ? require("./detailsSources/domDetailsSource")({
      window
    })
  : null;

const withScreenDetails = require("./hocs/withScreenDetails")();

module.exports = {
  Col: require("./components/Col")({
    withScreenDetails,
    Wrapper: "div"
  }),
  Container: require("./components/Container")({
    withScreenDetails,
    Wrapper: "div"
  }),
  Row: require("./components/Row")({
    withScreenDetails,
    Wrapper: "div"
  }),
  ScreenDetailsProvider: require("./components/ScreenDetailsProvider")({
    detailsSource
  }),
  Show: require("./components/Show")({
    withScreenDetails
  }),
  Switch: require("./components/Switch")({
    withScreenDetails
  }),
  withScreenDetails
};
