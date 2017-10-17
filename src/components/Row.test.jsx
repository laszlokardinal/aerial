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

const TestCol = () => null;

describe("<Row />", () => {
  it("is wrapped in withScreenDetails()", () => {
    const wrappedComponent = () => {};

    const withScreenDetails = sinon.stub();
    withScreenDetails.returns(wrappedComponent);

    const Row = require("./Row.jsx")({
      withScreenDetails,
      Wrapper: "div"
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Row).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("a wrapper", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(<Row screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("children inside the wrapper", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails}>
          <TestCol />
        </Row>
      );

      try {
        expect(wrapper.find("div > TestCol")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("applies default styles on the wrapper", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(<Row screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the style prop applied", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const style = {
        backgroundColor: "green",
        pointerEvents: "none",
        whiteSpace: "no-wrap"
      };

      const wrapper = shallow(
        <Row style={style} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include(style);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the className prop applied", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Row className={className} screenDetails={screenDetails} />
      );

      try {
        expect(wrapper.find("div").prop("className")).to.include(className);
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching AlignItems from the props", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row
          screenDetails={screenDetails}
          aAlignItems="flex-start"
          bAlignItems="center"
          dAlignItems="flex-end"
        />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          alignItems: "center"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching AlignContent from the props", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row
          screenDetails={screenDetails}
          aAlignContent="flex-start"
          bAlignContent="center"
          dAlignContent="flex-end"
        />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          alignContent: "center"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("applies the highest matching JustifyContent from the props", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row
          screenDetails={screenDetails}
          aJustifyContent="flex-start"
          bJustifyContent="center"
          dJustifyContent="flex-end"
        />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          justifyContent: "center"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper div with half of the horizontalGutter as negative horizontal margin", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} horizontalGutter={20} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          marginLeft: -10,
          marginRight: -10
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the children with half of the horizontalGutter as padding", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} horizontalGutter={20}>
          <TestCol />
          <TestCol />
          <TestCol />
        </Row>
      );

      try {
        const styles = [];

        wrapper
          .find("TestCol")
          .forEach(testChild => styles.push(testChild.prop("style")));

        expect(styles).to.deep.equal([
          {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: null,
            paddingBottom: null
          },
          {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: null,
            paddingBottom: null
          },
          {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: null,
            paddingBottom: null
          }
        ]);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper div with half of the verticalGutter as negative vertical margin", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} verticalGutter={20} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          marginTop: -10,
          marginBottom: -10
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the children with half of the verticalGutter as padding", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} verticalGutter={20}>
          <TestCol />
          <TestCol />
          <TestCol />
        </Row>
      );

      try {
        const styles = [];

        wrapper
          .find("TestCol")
          .forEach(testChild => styles.push(testChild.prop("style")));

        expect(styles).to.deep.equal([
          {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: null,
            paddingRight: null
          },
          {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: null,
            paddingRight: null
          },
          {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: null,
            paddingRight: null
          }
        ]);
      } finally {
        wrapper.unmount();
      }
    });

    it("the children in their original order", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} verticalGutter={20}>
          <TestCol className="first" />
          <TestCol className="second" />
          <TestCol className="third" />
        </Row>
      );

      try {
        expect(wrapper.find(".first + .second + .third")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("the children in the order of their highest matching order prop", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol,
        Wrapper: "div"
      });

      const wrapper = shallow(
        <Row screenDetails={screenDetails} verticalGutter={20}>
          <TestCol className="fifth" bOrder={15} cOrder={39} />
          <TestCol className="fourth" bOrder={20} />
          <TestCol className="second" />
          <TestCol className="first" aOrder={-1} />
          <TestCol className="third" />
        </Row>
      );

      try {
        expect(
          wrapper.find(".first + .second + .third + .fourth + .fifth")
        ).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });
  });
});
