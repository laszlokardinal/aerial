const withScreenDetails = require("./hocs/withScreenDetails.jsx")();

module.exports = {
  Container: require("./components/Container.jsx")({
    withScreenDetails
  }),
  ScreenDetailsProvider: require("./components/ScreenDetailsProvider.jsx")(),
  withScreenDetails
};
