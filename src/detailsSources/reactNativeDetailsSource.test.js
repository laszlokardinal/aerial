describe("reactNativeDetailsSource", () => {
  describe("addEventListener()", () => {
    it("adds the listener as 'change' listener to Dimensions dependency", () => {
      const Dimensions = {
        addEventListener: sinon.spy()
      };

      const detailsSource = require("./reactNativeDetailsSource.js")({
        Dimensions
      });

      const listener = () => {};

      expect(Dimensions.addEventListener.calledOnce).to.be.false;

      detailsSource.addEventListener(listener);

      expect(Dimensions.addEventListener.calledOnce).to.be.true;
      expect(Dimensions.addEventListener.getCall(0).args[0]).to.equal("change");
      expect(Dimensions.addEventListener.getCall(0).args[1]).to.equal(listener);
    });

    it("returns a function that removes the previously added listener", () => {
      const Dimensions = {
        addEventListener: () => {},
        removeEventListener: sinon.spy()
      };

      const detailsSource = require("./reactNativeDetailsSource.js")({
        Dimensions
      });

      const listener = () => {};

      const remove = detailsSource.addEventListener(listener);

      expect(Dimensions.removeEventListener.calledOnce).to.be.false;

      remove();

      expect(Dimensions.removeEventListener.calledOnce).to.be.true;
      expect(Dimensions.removeEventListener.getCall(0).args[0]).to.equal(
        "change"
      );
      expect(Dimensions.removeEventListener.getCall(0).args[1]).to.equal(
        listener
      );
    });
  });

  describe("getDeviceWidth()", () => {
    it("returns the width from Dimensions.get('window')", () => {
      const deviceWidth = 12345;

      const Dimensions = {
        get: sinon.stub().returns({ width: deviceWidth })
      };

      const detailsSource = require("./reactNativeDetailsSource.js")({
        Dimensions
      });

      expect(detailsSource.getDeviceWidth()).to.equal(deviceWidth);
      expect(Dimensions.get.getCall(0).args[0]).to.equal("window");
    });
  });
});
