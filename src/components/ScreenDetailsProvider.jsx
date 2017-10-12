module.exports = (
  {
    React = require("react"),
    PropTypes = require("prop-types"),
    Broadcast = require("react-broadcast").Broadcast,
    detailsSource
  } = {}
) => {
  const { Component } = React;

  class ScreenDetailsProvider extends Component {
    constructor(props) {
      super(props);

      const deviceWidth =
        props.deviceWidth ||
        (detailsSource ? detailsSource.getDeviceWidth() : 0);

      this.state = this.computeState(deviceWidth);
    }

    computeState(deviceWidth) {
      const breakpoints = this.props.breakpoints.map(breakpoint => ({
        ...breakpoint,
        active: breakpoint.minWidth < deviceWidth
      }));

      return {
        breakpoints,
        deviceWidth
      };
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.deviceWidth !== this.props.deviceWidth ||
        nextProps.breakpoints !== this.props.breakpoints
      ) {
        if (nextProps.deviceWidth) {
          this.setState(this.computeState(nextProps.deviceWidth));
        } else {
          if (detailsSource) {
            this.setState(this.computeState(detailsSource.getDeviceWidth()));
          } else {
            this.setState(this.computeState(0));
          }
        }
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        nextProps.children !== this.props.children ||
        nextState.breakpoints !== this.state.breakpoints ||
        nextState.deviceWidth !== this.state.deviceWidth
      );
    }

    handleResize = () => {
      if (!this.props.deviceWidth) {
        const deviceWidth = detailsSource.getDeviceWidth();

        this.setState(this.computeState(deviceWidth));
      }
    };

    componentDidMount() {
      if (detailsSource) {
        this.removeEventListener = detailsSource.addEventListener(
          this.handleResize
        );
      }
    }

    componentWillUnmount() {
      if (this.removeEventListener) {
        this.removeEventListener();
      }
    }

    render() {
      return this.state.deviceWidth && this.props.children ? (
        <Broadcast channel="aerialScreenDetails" value={this.state}>
          {this.props.children}
        </Broadcast>
      ) : null;
    }
  }

  ScreenDetailsProvider.propTypes = {
    breakpoints: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        minWidth: PropTypes.number.isRequied,
        containerWidth: PropTypes.string.isRequired
      })
    ),
    deviceWidth: PropTypes.number
  };

  ScreenDetailsProvider.defaultProps = {
    breakpoints: [
      {
        size: "xs",
        minWidth: 0,
        containerWidth: "auto"
      },
      {
        size: "sm",
        minWidth: 768,
        containerWidth: "750px"
      },
      {
        size: "md",
        minWidth: 992,
        containerWidth: "970px"
      },
      {
        size: "lg",
        minWidth: 1200,
        containerWidth: "1170px"
      }
    ]
  };

  return ScreenDetailsProvider;
};