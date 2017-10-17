const { View, Dimensions } = require("react-native");

const detailsSource = require("./detailsSources/reactNativeDetailsSource")({
  Dimensions
});

const withScreenDetails = require("./hocs/withScreenDetails")();

module.exports = {
  Col: require("./components/Col")({
    withScreenDetails,
    Wrapper: View
  }),
  Container: require("./components/Container")({
    withScreenDetails,
    Wrapper: View,
    containerStyle: {
      flex: 0,
      alignSelf: "center"
    }
  }),
  Row: require("./components/Row")({
    withScreenDetails,
    Wrapper: View
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
