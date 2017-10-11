module.exports = (
  {
    React = require("react"),
    Subscriber = require("react-broadcast").Subscriber
  } = {}
) => {
  const { Component } = React;

  const withScreenDetails = Component => props => (
    <Subscriber channel="aerialScreenDetails">
      {screenDetails => <Component {...props} screenDetails={screenDetails} />}
    </Subscriber>
  );

  return withScreenDetails;
};
