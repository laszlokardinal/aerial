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

describe("<Col />", () => {
  it("is wrapped in withScreenDetails()", () => {
    const wrappedComponent = () => {};

    const withScreenDetails = sinon.stub();
    withScreenDetails.returns(wrappedComponent);

    const Col = require("./Col.jsx")({
      withScreenDetails,
      Wrapper: "div"
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Col).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("a wrapper", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(<Col screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("children inside the wrapper", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Col screenDetails={screenDetails}>
          <div className="test" />
        </Col>
      );

      try {
        expect(wrapper.find("div > .test")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("applies injected styles on the wrapper", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div",
        colStyle: {
          boxSizing: "border-box"
        }
      });

      const wrapper = shallow(<Col screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          boxSizing: "border-box"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies default styles on the wrapper", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(<Col screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          flexShrink: 0,
          flexGrow: 0
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the style prop applied", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const style = {
        backgroundColor: "green",
        pointerEvents: "none",
        whiteSpace: "no-wrap"
      };

      const wrapper = shallow(
        <Col style={style} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include(style);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the className prop applied", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Col className={className} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("className")).to.include(className);
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching active width from the props", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Col screenDetails={screenDetails} a={0.25} b={0.5} d={0.75} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          width: "50%"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies 100% width if there is no matching prop", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(<Col screenDetails={screenDetails} d={0.75} />);

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          width: "100%"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching active offset from the props", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Col
          screenDetails={screenDetails}
          aOffset={0.25}
          bOffset={0.5}
          dOffset={0.75}
        />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          marginLeft: "50%"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies no offset if there is no matching offset prop", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Col screenDetails={screenDetails} dOffset={0.75} />
      );

      try {
        expect(!!wrapper.find("div").prop("style").marginLeft).to.be.false;
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching AlignItems from the props", () => {
      const Col = require("./Col.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Col
          screenDetails={screenDetails}
          aAlignSelf="flex-start"
          bAlignSelf="center"
          dAlignSelf="flex-end"
        />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          alignSelf: "center"
        });
      } finally {
        wrapper.unmount();
      }
    });
  });
});
