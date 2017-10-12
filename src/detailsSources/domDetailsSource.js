module.exports = ({ window }) => {
  const detailsSource = {
    addEventListener: listener => {
      window.addEventListener("resize", listener);

      return () => window.removeEventListener("resize", listener);
    },
    getDeviceWidth: () => window.innerWidth
  };

  return detailsSource;
};
