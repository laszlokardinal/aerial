const withScreenDetails = require("./hocs/withScreenDetails.jsx")();

module.exports = {
  Col: require("./components/Col.jsx")({
    withScreenDetails
  }),
  Container: require("./components/Container.jsx")({
    withScreenDetails
  }),
  Row: require("./components/Row.jsx")({
    withScreenDetails
  }),
  ScreenDetailsProvider: require("./components/ScreenDetailsProvider.jsx")(),
  withScreenDetails
};
