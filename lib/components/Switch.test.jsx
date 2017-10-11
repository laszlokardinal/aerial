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

describe("<Switch />", () => {
  it("is wrapped in withScreenDetails()", () => {
    const wrappedComponent = () => {};

    const withScreenDetails = sinon.stub();
    withScreenDetails.returns(wrappedComponent);

    const Switch = require("./Switch.jsx")({
      withScreenDetails
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Switch).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("renders the highest matching component", () => {
      const Switch = require("./Switch.jsx")({
        withScreenDetails: Component => Component
      });

      const a = () => <div className="a" />;
      const b = () => <div className="b" />;

      const wrapper = mount(
        <Switch screenDetails={screenDetails} a={a} b={b} />
      );

      try {
        expect(wrapper.find(".b")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("renders the highest matching node", () => {
      const Switch = require("./Switch.jsx")({
        withScreenDetails: Component => Component
      });

      const a = <div className="a" />;
      const b = <div className="b" />;

      const wrapper = mount(
        <Switch screenDetails={screenDetails} a={a} b={b} />
      );
    });

    it("the matching component with the Switch's props", () => {
      const Switch = require("./Switch.jsx")({
        withScreenDetails: Component => Component
      });

      const a = () => <div className="a" />;
      const b = ({ text }) => <div className="b">{text}</div>;

      const wrapper = mount(
        <Switch screenDetails={screenDetails} a={a} b={b} text="test" />
      );

      try {
        expect(wrapper.find(".b").text()).to.equal("test");
      } finally {
        wrapper.unmount();
      }
    });
  });
});
