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
      withScreenDetails
    });

    expect(withScreenDetails.calledOnce).to.be.true;
    expect(typeof withScreenDetails.getCall(0).args[0]).to.equal("function");
    expect(Row).to.equal(wrappedComponent);
  });

  describe("renders", () => {
    it("a wrapper div", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol
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
        Col: TestCol
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
        withScreenDetails: Component => Component
      });

      const wrapper = shallow(<Row screenDetails={screenDetails} />);

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          display: "flex",
          flexWrap: "wrap"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper with the style prop applied", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component
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
        withScreenDetails: Component => Component
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

    it("the wrapper div with half of the horizontalGutter as negative horizontal margin", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Row screenDetails={screenDetails} horizontalGutter={20} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          margin: "0px -10px"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the children with half of the horizontalGutter as padding", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol
      });

      const className = "block__element block__element--modifier";

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
          { padding: "10px 0px" },
          { padding: "10px 0px" },
          { padding: "10px 0px" }
        ]);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapper div with half of the verticalGutter as negative vertical margin", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component
      });

      const className = "block__element block__element--modifier";

      const wrapper = shallow(
        <Row screenDetails={screenDetails} verticalGutter={20} />
      );

      try {
        expect(wrapper.find("div").prop("style")).to.include({
          margin: "-10px 0px"
        });
      } finally {
        wrapper.unmount();
      }
    });

    it("the children with half of the verticalGutter as padding", () => {
      const Row = require("./Row.jsx")({
        withScreenDetails: Component => Component,
        Col: TestCol
      });

      const className = "block__element block__element--modifier";

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
          { padding: "0px 10px" },
          { padding: "0px 10px" },
          { padding: "0px 10px" }
        ]);
      } finally {
        wrapper.unmount();
      }
    });
  });
});
