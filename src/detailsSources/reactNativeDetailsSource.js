module.exports = ({ Dimensions }) => {
  const detailsSource = {
    addEventListener: listener => {
      Dimensions.addEventListener("change", listener);

      return () => Dimensions.removeEventListener("change", listener);
    },
    getDeviceWidth: () => Dimensions.get("window").width
  };

  return detailsSource;
};
