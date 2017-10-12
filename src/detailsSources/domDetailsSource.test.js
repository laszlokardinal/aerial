describe("domDetailsSource", () => {
  describe("addEventListener()", () => {
    it("adds the listener as 'resize' listener to window", () => {
      sinon.spy(window, "addEventListener");

      const detailsSource = require("./domDetailsSource.js")({
        window
      });

      const listener = () => {};

      try {
        expect(window.addEventListener.calledOnce).to.be.false;

        detailsSource.addEventListener(listener);

        expect(window.addEventListener.calledOnce).to.be.true;
        expect(window.addEventListener.getCall(0).args[0]).to.equal("resize");
        expect(window.addEventListener.getCall(0).args[1]).to.equal(listener);
      } finally {
        window.addEventListener.restore();
      }
    });

    it("returns a function that removes the previously added listener", () => {
      sinon.spy(window, "removeEventListener");

      const detailsSource = require("./domDetailsSource.js")({
        window
      });

      const listener = () => {};

      try {
        const remove = detailsSource.addEventListener(listener);

        expect(window.removeEventListener.calledOnce).to.be.false;

        remove();

        expect(window.removeEventListener.calledOnce).to.be.true;
        expect(window.removeEventListener.getCall(0).args[0]).to.equal(
          "resize"
        );
        expect(window.removeEventListener.getCall(0).args[1]).to.equal(
          listener
        );
      } finally {
        window.removeEventListener.restore();
      }
    });
  });

  describe("getDeviceWidth()", () => {
    it("returns the window dependency's innerWidth property", () => {
      const { innerWidth } = window;

      const deviceWidth = 12345;
      window.innerWidth = deviceWidth;

      const detailsSource = require("./domDetailsSource.js")({
        window
      });

      try {
        expect(detailsSource.getDeviceWidth()).to.equal(deviceWidth);
      } finally {
        window.innerWidth = innerWidth;
      }
    });
  });
});
