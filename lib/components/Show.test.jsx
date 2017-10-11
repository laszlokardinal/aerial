const screenDetails = {
  deviceWidth: 256,
  breakpoints: [
    { size: "a", minWidth: 0, containerWidth: "auto", active: true },
    { size: "b", minWidth: 100, containerWidth: "90px", active: true },
    { size: "c", minWidth: 200, containerWidth: "190px", active: true },
    { size: "d", minWidth: 300, containerWidth: "280px", active: false },
    { size: "e", minWidth: 400, containerWidth: "360px", active: false }
  ]
};

describe("<Show />", () => {
  it("is wrapped in withScreenDetails()", () => {
    const wrappedComponent = () => {};

    const withScreenDetails = sinon.stub();
    withScreenDetails.returns(wrappedComponent);

    const Show = require("./Show.jsx")({
      withScreenDetails
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Show).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("null by default", () => {
      const Show = require("./Show.jsx")({
        withScreenDetails: Component => Component
      });

      const wrapper = shallow(<Show screenDetails={screenDetails} />);

      try {
        expect(wrapper.type()).to.be.null;
      } finally {
        wrapper.unmount();
      }
    });

    it("ignores sizes that is not defined in the props", () => {
      const Show = require("./Show.jsx")({
        withScreenDetails: Component => Component
      });

      const wrapper = shallow(
        <Show screenDetails={screenDetails} a={true} d={false}>
          <div className="test" />
        </Show>
      );

      try {
        expect(wrapper.find(".test")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("renders children if the highest matching size prop is true", () => {
      const Show = require("./Show.jsx")({
        withScreenDetails: Component => Component
      });

      const wrapper = shallow(
        <Show
          screenDetails={screenDetails}
          a={false}
          b={false}
          c={true}
          d={false}
          e={false}
        >
          <div className="test" />
        </Show>
      );

      try {
        expect(wrapper.find(".test")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("renders null if the highest matching size prop is false", () => {
      const Show = require("./Show.jsx")({
        withScreenDetails: Component => Component
      });

      const wrapper = shallow(
        <Show
          screenDetails={screenDetails}
          a={true}
          b={true}
          c={false}
          d={true}
          e={true}
        >
          <div className="test" />
        </Show>
      );

      try {
        expect(wrapper.find(".test")).to.have.length(0);
      } finally {
        wrapper.unmount();
      }
    });
  });
});
