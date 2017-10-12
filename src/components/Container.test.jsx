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

describe("<Container />", () => {
  it("is wrapped in withScreenDetails()", () => {
    const wrappedComponent = () => {};

    const withScreenDetails = sinon.stub();
    withScreenDetails.returns(wrappedComponent);

    const Container = require("./Container.jsx")({
      withScreenDetails,
      Wrapper: "div"
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Container).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("a wrapper", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(<Container screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("children inside the wrapper", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Container screenDetails={screenDetails}>
          <span className="test-child">Test</span>
        </Container>
      );

      try {
        expect(wrapper.find("div > .test-child")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with auto marginLeft & marginRight", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const style = {
        marginLeft: "20px",
        marginRight: "20px"
      };

      const wrapper = shallow(
        <Container style={style} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          marginLeft: "auto",
          marginRight: "auto"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the style prop applied", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const style = {
        backgroundColor: "green",
        pointerEvents: "none",
        whiteSpace: "no-wrap"
      };

      const wrapper = shallow(
        <Container style={style} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include(style);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the className prop applied", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Container className={className} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("className")).to.include(className);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the containerWidth of the highest active breakpoint", () => {
      const Container = require("./Container.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Container className={className} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          width: "190px"
        });
      } finally {
        wrapper.unmount();
      }
    });
  });
});
