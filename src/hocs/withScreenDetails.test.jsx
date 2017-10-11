describe("withScreenDetails()", () => {
  it("returns a function", () => {
    const withScreenDetails = require("./withScreenDetails.jsx");

    expect(typeof withScreenDetails(() => null)).to.equal("function");
  });

  describe("renders", () => {
    it("a Subscriber with 'aerialScreenDetails' as channel", () => {
      const withScreenDetails = require("./withScreenDetails.jsx")();
      const NoopWithScreenDetails = withScreenDetails(() => null);

      const wrapper = shallow(<NoopWithScreenDetails />);

      try {
        const subscriber = wrapper.find("Subscriber");
        expect(subscriber).to.have.length(1);
        expect(subscriber.prop("channel")).to.equal("aerialScreenDetails");
      } finally {
        wrapper.unmount();
      }
    });

    it("a handler function inside the Subscriber", () => {
      const withScreenDetails = require("./withScreenDetails.jsx")();
      const NoopWithScreenDetails = withScreenDetails(() => null);

      const wrapper = shallow(<NoopWithScreenDetails />);

      try {
        const subscriber = wrapper.find("Subscriber");
        expect(typeof subscriber.prop("children")).to.equal("function");
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapped Component with the current props", () => {
      const withScreenDetails = require("./withScreenDetails.jsx")();
      const Test = function Test() {
        return null;
      };
      const TestWithScreenDetails = withScreenDetails(Test);

      const { Broadcast } = require("react-broadcast");

      const testProp = {};

      const wrapper = mount(
        <Broadcast channel="aerialScreenDetails" value={{}}>
          <TestWithScreenDetails testProp={testProp} />
        </Broadcast>
      );

      try {
        const test = wrapper.find("Test");
        expect(test.prop("testProp")).to.equal(testProp);
      } finally {
        wrapper.unmount();
      }
    });

    it("the wrapped Component with screenDetails", () => {
      const withScreenDetails = require("./withScreenDetails.jsx")();
      const Test = function Test() {
        return null;
      };
      const TestWithScreenDetails = withScreenDetails(Test);

      const { Broadcast } = require("react-broadcast");

      const testScreenDetails = {};

      const wrapper = mount(
        <Broadcast channel="aerialScreenDetails" value={testScreenDetails}>
          <TestWithScreenDetails />
        </Broadcast>
      );

      try {
        const test = wrapper.find("Test");
        expect(test.prop("screenDetails")).to.equal(testScreenDetails);
      } finally {
        wrapper.unmount();
      }
    });
  });
});
