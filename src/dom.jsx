const withScreenDetails = require("./hocs/withScreenDetails")();

module.exports = {
  Col: require("./components/Col")({
    withScreenDetails
  }),
  Container: require("./components/Container")({
    withScreenDetails
  }),
  Row: require("./components/Row")({
    withScreenDetails
  }),
  ScreenDetailsProvider: require("./components/ScreenDetailsProvider")(),
  Show: require("./components/Show")({
    withScreenDetails
  }),
  Switch: require("./components/Switch")({
    withScreenDetails
  }),
  withScreenDetails
};
