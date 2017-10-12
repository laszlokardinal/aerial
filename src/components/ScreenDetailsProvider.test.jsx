class DetailsSource {
  _listeners = [];

  addEventListener(listener) {
    this._listeners = this._listeners.concat(listener);
  }

  removeEventListener(listener) {
    this._listeners = this._listeners.filter(item => item !== listener);
  }

  _deviceWidth = 1024;

  getDeviceWidth() {
    return this._deviceWidth;
  }
}

describe("<ScreenDetailsProvider />", () => {
  describe("if deviceWidth prop presents", () => {
    describe("on mount", () => {
      it("sets deviceWidth in the state to props.deviceWidth", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource: null
        });

        const wrapper = shallow(<ScreenDetailsProvider deviceWidth={1234} />);

        try {
          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(1234);
        } finally {
          wrapper.unmount();
        }
      });

      it("marks breakpoints active accordingly", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource: null
        });

        const wrapper = shallow(
          <ScreenDetailsProvider
            deviceWidth={256}
            breakpoints={[
              { size: "a", minWidth: 0, containerWidth: "auto" },
              { size: "b", minWidth: 100, containerWidth: "90px" },
              { size: "c", minWidth: 200, containerWidth: "190px" },
              { size: "d", minWidth: 300, containerWidth: "280px" },
              { size: "e", minWidth: 400, containerWidth: "360px" }
            ]}
          />
        );

        try {
          const state = wrapper.state();
          expect(state.breakpoints).to.deep.equal([
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true },
            { size: "c", minWidth: 200, containerWidth: "190px", active: true },
            {
              size: "d",
              minWidth: 300,
              containerWidth: "280px",
              active: false
            },
            { size: "e", minWidth: 400, containerWidth: "360px", active: false }
          ]);
        } finally {
          wrapper.unmount();
        }
      });
    });

    describe("on resize event", () => {
      it("does not set deviceWidth in the state", () => {
        const detailsSource = new DetailsSource();

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(<ScreenDetailsProvider deviceWidth={256} />);

        try {
          detailsSource._deviceWidth = 128;
          detailsSource._listeners.forEach(listener => listener());

          const state = wrapper.state();
          expect(state.deviceWidth).to.deep.equal(256);
        } finally {
          wrapper.unmount();
        }
      });

      it("does not mark breakpoints active accordingly", () => {
        const detailsSource = new DetailsSource();

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(
          <ScreenDetailsProvider
            deviceWidth={256}
            breakpoints={[
              { size: "a", minWidth: 0, containerWidth: "auto" },
              { size: "b", minWidth: 100, containerWidth: "90px" },
              { size: "c", minWidth: 200, containerWidth: "190px" },
              { size: "d", minWidth: 300, containerWidth: "280px" },
              { size: "e", minWidth: 400, containerWidth: "360px" }
            ]}
          />
        );

        try {
          detailsSource._deviceWidth = 128;
          detailsSource._listeners.forEach(listener => listener());

          const state = wrapper.state();
          expect(state.breakpoints).to.deep.equal([
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true },
            { size: "c", minWidth: 200, containerWidth: "190px", active: true },
            {
              size: "d",
              minWidth: 300,
              containerWidth: "280px",
              active: false
            },
            { size: "e", minWidth: 400, containerWidth: "360px", active: false }
          ]);
        } finally {
          wrapper.unmount();
        }
      });
    });

    describe("on deviceWidth prop change", () => {
      describe("if deviceWidth will present", () => {
        it("sets deviceWidth in the state to props.deviceWidth", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: new DetailsSource()
          });

          const wrapper = shallow(<ScreenDetailsProvider deviceWidth={150} />);

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(350);
          } finally {
            wrapper.unmount();
          }
        });

        it("marks breakpoints active accordingly", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: new DetailsSource()
          });

          const wrapper = shallow(
            <ScreenDetailsProvider
              deviceWidth={150}
              breakpoints={[
                { size: "a", minWidth: 0, containerWidth: "auto" },
                { size: "b", minWidth: 100, containerWidth: "90px" },
                { size: "c", minWidth: 200, containerWidth: "190px" },
                { size: "d", minWidth: 300, containerWidth: "280px" },
                { size: "e", minWidth: 400, containerWidth: "360px" }
              ]}
            />
          );

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.breakpoints).to.deep.equal([
              { size: "a", minWidth: 0, containerWidth: "auto", active: true },
              {
                size: "b",
                minWidth: 100,
                containerWidth: "90px",
                active: true
              },
              {
                size: "c",
                minWidth: 200,
                containerWidth: "190px",
                active: true
              },
              {
                size: "d",
                minWidth: 300,
                containerWidth: "280px",
                active: true
              },
              {
                size: "e",
                minWidth: 400,
                containerWidth: "360px",
                active: false
              }
            ]);
          } finally {
            wrapper.unmount();
          }
        });
      });

      describe("if deviceWidth won't, but detailsSource will present", () => {
        it("sets deviceWidth in the state to detailsSource's deviceWidth", () => {
          const detailsSource = new DetailsSource();
          detailsSource._deviceWidth = 270;

          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource
          });

          const wrapper = shallow(<ScreenDetailsProvider deviceWidth={450} />);

          try {
            wrapper.setProps({ deviceWidth: undefined });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(270);
          } finally {
            wrapper.unmount();
          }
        });

        it("marks breakpoints active accordingly", () => {
          const detailsSource = new DetailsSource();
          detailsSource._deviceWidth = 270;

          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource
          });

          const wrapper = shallow(
            <ScreenDetailsProvider
              deviceWidth={450}
              breakpoints={[
                { size: "a", minWidth: 0, containerWidth: "auto" },
                { size: "b", minWidth: 100, containerWidth: "90px" },
                { size: "c", minWidth: 200, containerWidth: "190px" },
                { size: "d", minWidth: 300, containerWidth: "280px" },
                { size: "e", minWidth: 400, containerWidth: "360px" }
              ]}
            />
          );

          try {
            wrapper.setProps({ deviceWidth: undefined });
            const state = wrapper.state();
            expect(state.breakpoints).to.deep.equal([
              { size: "a", minWidth: 0, containerWidth: "auto", active: true },
              {
                size: "b",
                minWidth: 100,
                containerWidth: "90px",
                active: true
              },
              {
                size: "c",
                minWidth: 200,
                containerWidth: "190px",
                active: true
              },
              {
                size: "d",
                minWidth: 300,
                containerWidth: "280px",
                active: false
              },
              {
                size: "e",
                minWidth: 400,
                containerWidth: "360px",
                active: false
              }
            ]);
          } finally {
            wrapper.unmount();
          }
        });
      });

      describe("if neither deviceWidth nor detailsSource will present", () => {
        it("sets deviceWidth in the state to 0", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: null
          });

          const wrapper = shallow(<ScreenDetailsProvider deviceWidth={450} />);

          try {
            wrapper.setProps({ deviceWidth: undefined });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(0);
          } finally {
            wrapper.unmount();
          }
        });

        it("marks breakpoints active accordingly", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: null
          });

          const wrapper = shallow(
            <ScreenDetailsProvider
              deviceWidth={450}
              breakpoints={[
                { size: "a", minWidth: 0, containerWidth: "auto" },
                { size: "b", minWidth: 100, containerWidth: "90px" },
                { size: "c", minWidth: 200, containerWidth: "190px" },
                { size: "d", minWidth: 300, containerWidth: "280px" },
                { size: "e", minWidth: 400, containerWidth: "360px" }
              ]}
            />
          );

          try {
            wrapper.setProps({ deviceWidth: undefined });
            const state = wrapper.state();
            expect(state.breakpoints).to.deep.equal([
              { size: "a", minWidth: 0, containerWidth: "auto", active: false },
              {
                size: "b",
                minWidth: 100,
                containerWidth: "90px",
                active: false
              },
              {
                size: "c",
                minWidth: 200,
                containerWidth: "190px",
                active: false
              },
              {
                size: "d",
                minWidth: 300,
                containerWidth: "280px",
                active: false
              },
              {
                size: "e",
                minWidth: 400,
                containerWidth: "360px",
                active: false
              }
            ]);
          } finally {
            wrapper.unmount();
          }
        });
      });
    });
  });

  describe("if detailsSource presents", () => {
    describe("on mount", () => {
      it("adds resize event listener, and stores the return value as removeEventListener on the instance", () => {
        const detailsSource = new DetailsSource();

        const remove = () => {};

        sinon.stub(detailsSource, "addEventListener").returns(remove);

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          expect(detailsSource.addEventListener.calledOnce).to.be.true;
          expect(
            typeof detailsSource.addEventListener.getCall(0).args[0]
          ).to.equal("function");
          expect(wrapper.instance().removeEventListener).to.equal(remove);
        } finally {
          wrapper.unmount();
        }
      });

      it("sets deviceWidth in the state to detailsSource's deviceWidth", () => {
        const detailsSource = new DetailsSource();

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(detailsSource._deviceWidth);
        } finally {
          wrapper.unmount();
        }
      });

      it("marks breakpoints active accordingly", () => {
        const detailsSource = new DetailsSource();
        detailsSource._deviceWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(
          <ScreenDetailsProvider
            breakpoints={[
              { size: "a", minWidth: 0, containerWidth: "auto" },
              { size: "b", minWidth: 100, containerWidth: "90px" },
              { size: "c", minWidth: 200, containerWidth: "190px" },
              { size: "d", minWidth: 300, containerWidth: "280px" },
              { size: "e", minWidth: 400, containerWidth: "360px" }
            ]}
          />
        );

        try {
          const state = wrapper.state();
          expect(state.breakpoints).to.deep.equal([
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true },
            { size: "c", minWidth: 200, containerWidth: "190px", active: true },
            {
              size: "d",
              minWidth: 300,
              containerWidth: "280px",
              active: false
            },
            { size: "e", minWidth: 400, containerWidth: "360px", active: false }
          ]);
        } finally {
          wrapper.unmount();
        }
      });
    });

    describe("on resize event", () => {
      it("sets deviceWidth in the state to detailsSource's deviceWidth", () => {
        const detailsSource = new DetailsSource();
        detailsSource._deviceWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          detailsSource._deviceWidth = 128;
          detailsSource._listeners.forEach(listener => listener());

          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(128);
        } finally {
          wrapper.unmount();
        }
      });

      it("marks breakpoints active accordingly", () => {
        const detailsSource = new DetailsSource();
        detailsSource._deviceWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource
        });

        const wrapper = shallow(
          <ScreenDetailsProvider
            breakpoints={[
              { size: "a", minWidth: 0, containerWidth: "auto" },
              { size: "b", minWidth: 100, containerWidth: "90px" },
              { size: "c", minWidth: 200, containerWidth: "190px" },
              { size: "d", minWidth: 300, containerWidth: "280px" },
              { size: "e", minWidth: 400, containerWidth: "360px" }
            ]}
          />
        );

        try {
          detailsSource._deviceWidth = 128;
          detailsSource._listeners.forEach(listener => listener());

          const state = wrapper.state();
          expect(state.breakpoints).to.deep.equal([
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true },
            {
              size: "c",
              minWidth: 200,
              containerWidth: "190px",
              active: false
            },
            {
              size: "d",
              minWidth: 300,
              containerWidth: "280px",
              active: false
            },
            { size: "e", minWidth: 400, containerWidth: "360px", active: false }
          ]);
        } finally {
          wrapper.unmount();
        }
      });
    });

    describe("on deviceWidth prop change", () => {
      describe("if deviceWidth will present", () => {
        it("sets deviceWidth in the state to props.deviceWidth if it presents", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: new DetailsSource()
          });

          const wrapper = shallow(<ScreenDetailsProvider />);

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(350);
          } finally {
            wrapper.unmount();
          }
        });

        it("marks breakpoints active accordingly", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: new DetailsSource()
          });

          const wrapper = shallow(
            <ScreenDetailsProvider
              breakpoints={[
                { size: "a", minWidth: 0, containerWidth: "auto" },
                { size: "b", minWidth: 100, containerWidth: "90px" },
                { size: "c", minWidth: 200, containerWidth: "190px" },
                { size: "d", minWidth: 300, containerWidth: "280px" },
                { size: "e", minWidth: 400, containerWidth: "360px" }
              ]}
            />
          );

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.breakpoints).to.deep.equal([
              { size: "a", minWidth: 0, containerWidth: "auto", active: true },
              {
                size: "b",
                minWidth: 100,
                containerWidth: "90px",
                active: true
              },
              {
                size: "c",
                minWidth: 200,
                containerWidth: "190px",
                active: true
              },
              {
                size: "d",
                minWidth: 300,
                containerWidth: "280px",
                active: true
              },
              {
                size: "e",
                minWidth: 400,
                containerWidth: "360px",
                active: false
              }
            ]);
          } finally {
            wrapper.unmount();
          }
        });
      });
    });

    describe("on unmount", () => {
      it("calls removeEventListener on the instance", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource: new DetailsSource()
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        const remove = sinon.spy();

        try {
          wrapper.instance().removeEventListener = remove;

          wrapper.unmount();

          expect(remove.calledOnce).to.be.true;
        } finally {
          wrapper.unmount();
        }
      });
    });
  });

  describe("if none of them presents", () => {
    describe("on mount", () => {
      it("sets deviceWidth to 0", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource: null
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(0);
        } finally {
          wrapper.unmount();
        }
      });

      it("marks breakpoints active accordingly", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          detailsSource: null
        });

        const wrapper = shallow(
          <ScreenDetailsProvider
            breakpoints={[
              { size: "a", minWidth: 0, containerWidth: "auto" },
              { size: "b", minWidth: 100, containerWidth: "90px" },
              { size: "c", minWidth: 200, containerWidth: "190px" },
              { size: "d", minWidth: 300, containerWidth: "280px" },
              { size: "e", minWidth: 400, containerWidth: "360px" }
            ]}
          />
        );

        try {
          const state = wrapper.state();
          expect(state.breakpoints).to.deep.equal([
            { size: "a", minWidth: 0, containerWidth: "auto", active: false },
            { size: "b", minWidth: 100, containerWidth: "90px", active: false },
            {
              size: "c",
              minWidth: 200,
              containerWidth: "190px",
              active: false
            },
            {
              size: "d",
              minWidth: 300,
              containerWidth: "280px",
              active: false
            },
            { size: "e", minWidth: 400, containerWidth: "360px", active: false }
          ]);
        } finally {
          wrapper.unmount();
        }
      });
    });

    describe("on deviceWidth prop change", () => {
      describe("if deviceWidth will present", () => {
        it("sets deviceWidth in the state to props.deviceWidth", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: null
          });

          const wrapper = shallow(<ScreenDetailsProvider />);

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(350);
          } finally {
            wrapper.unmount();
          }
        });

        it("marks breakpoints active accordingly", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            detailsSource: null
          });

          const wrapper = shallow(
            <ScreenDetailsProvider
              breakpoints={[
                { size: "a", minWidth: 0, containerWidth: "auto" },
                { size: "b", minWidth: 100, containerWidth: "90px" },
                { size: "c", minWidth: 200, containerWidth: "190px" },
                { size: "d", minWidth: 300, containerWidth: "280px" },
                { size: "e", minWidth: 400, containerWidth: "360px" }
              ]}
            />
          );

          try {
            wrapper.setProps({ deviceWidth: 350 });
            const state = wrapper.state();
            expect(state.breakpoints).to.deep.equal([
              { size: "a", minWidth: 0, containerWidth: "auto", active: true },
              {
                size: "b",
                minWidth: 100,
                containerWidth: "90px",
                active: true
              },
              {
                size: "c",
                minWidth: 200,
                containerWidth: "190px",
                active: true
              },
              {
                size: "d",
                minWidth: 300,
                containerWidth: "280px",
                active: true
              },
              {
                size: "e",
                minWidth: 400,
                containerWidth: "360px",
                active: false
              }
            ]);
          } finally {
            wrapper.unmount();
          }
        });
      });
    });
  });

  describe("renders", () => {
    it("Broadcast with state as value to the 'aerialScreenDetails' channel", () => {
      const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
        detailsSource: null
      });

      const wrapper = shallow(
        <ScreenDetailsProvider>
          <div className="test" />
        </ScreenDetailsProvider>
      );

      try {
        const state = {
          deviceWidth: 128,
          breakpoints: [
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true }
          ],
          activeSizes: ["a", "b"]
        };

        wrapper.setState(state);

        const Broadcast = wrapper.find("Broadcast");
        expect(Broadcast).to.have.length(1);
        expect(Broadcast.prop("channel")).to.equal("aerialScreenDetails");
        expect(Broadcast.prop("value")).to.deep.equal(state);
      } finally {
        wrapper.unmount();
      }
    });

    it("children inside Broadcast", () => {
      const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
        detailsSource: null
      });

      const wrapper = shallow(
        <ScreenDetailsProvider>
          <div className="test" />
        </ScreenDetailsProvider>
      );

      try {
        wrapper.setState({
          deviceWidth: 128,
          breakpoints: [
            { size: "a", minWidth: 0, containerWidth: "auto", active: true },
            { size: "b", minWidth: 100, containerWidth: "90px", active: true }
          ]
        });

        expect(wrapper.find("Broadcast > .test")).to.have.length(1);
      } finally {
        wrapper.unmount();
      }
    });

    it("null if deviceWidth in the state is 0", () => {
      const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
        detailsSource: null
      });

      const wrapper = shallow(
        <ScreenDetailsProvider>
          <div />
        </ScreenDetailsProvider>
      );

      try {
        wrapper.setState({ deviceWidth: 0 });
        expect(wrapper.type()).to.be.null;
      } finally {
        wrapper.unmount();
      }
    });

    it("null if there is no children", () => {
      const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
        detailsSource: null
      });

      const wrapper = shallow(<ScreenDetailsProvider />);

      try {
        expect(wrapper.type()).to.be.null;
      } finally {
        wrapper.unmount();
      }
    });
  });
});
