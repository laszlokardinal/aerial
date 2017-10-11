describe("<ScreenDetailsProvider />", () => {
  describe("if deviceWidth prop presents", () => {
    describe("on mount", () => {
      it("sets deviceWidth in the state to props.deviceWidth", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window: null
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
          window: null
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
        const { innerWidth } = window;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
        });

        const wrapper = shallow(<ScreenDetailsProvider deviceWidth={256} />);

        try {
          window.innerWidth = 128;
          window.dispatchEvent(new window.Event("resize"));

          const state = wrapper.state();
          expect(state.deviceWidth).to.deep.equal(256);
        } finally {
          wrapper.unmount();
          window.innerWidth = innerWidth;
        }
      });

      it("does not mark breakpoints active accordingly", () => {
        const { innerWidth } = window;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
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
          window.innerWidth = 128;
          window.dispatchEvent(new window.Event("resize"));

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
          window.innerWidth = innerWidth;
        }
      });
    });

    describe("on deviceWidth prop change", () => {
      describe("if deviceWidth will present", () => {
        it("sets deviceWidth in the state to props.deviceWidth", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            window
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
            window
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

      describe("if deviceWidth won't, but window will present", () => {
        it("sets deviceWidth in the state to window.innerWidth", () => {
          const { innerWidth } = window;
          window.innerWidth = 270;

          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            window
          });

          const wrapper = shallow(<ScreenDetailsProvider deviceWidth={450} />);

          try {
            wrapper.setProps({ deviceWidth: undefined });
            const state = wrapper.state();
            expect(state.deviceWidth).to.equal(270);
          } finally {
            wrapper.unmount();
            window.innerWidth = innerWidth;
          }
        });

        it("marks breakpoints active accordingly", () => {
          const { innerWidth } = window;
          window.innerWidth = 270;

          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            window
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
            window.innerWidth = innerWidth;
          }
        });
      });

      describe("if neither deviceWidth nor window will present", () => {
        it("sets deviceWidth in the state to 0", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            window: null
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
            window: null
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

  describe("if window presents", () => {
    describe("on mount", () => {
      it("adds resize event listener", () => {
        sinon.spy(window, "addEventListener");

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          expect(window.addEventListener.calledOnce).to.be.true;
          expect(window.addEventListener.getCall(0).args[0]).to.equal("resize");
          expect(typeof window.addEventListener.getCall(0).args[1]).to.equal(
            "function"
          );
        } finally {
          wrapper.unmount();
          window.addEventListener.restore();
        }
      });

      it("sets deviceWidth in the state to window.innerWidth", () => {
        const { innerWidth } = window;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(innerWidth);
        } finally {
          wrapper.unmount();
        }
      });

      it("marks breakpoints active accordingly", () => {
        const { innerWidth } = window;
        window.innerWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
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
          window.innerWidth = innerWidth;
        }
      });
    });

    describe("on resize event", () => {
      it("sets deviceWidth in the state to window.innerWidth", () => {
        const { innerWidth } = window;
        window.innerWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          window.innerWidth = 128;
          window.dispatchEvent(new window.Event("resize"));

          const state = wrapper.state();
          expect(state.deviceWidth).to.equal(128);
        } finally {
          wrapper.unmount();
          window.innerWidth = innerWidth;
        }
      });

      it("marks breakpoints active accordingly", () => {
        const { innerWidth } = window;
        window.innerWidth = 256;

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
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
          window.innerWidth = 128;
          window.dispatchEvent(new window.Event("resize"));

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
          window.innerWidth = innerWidth;
        }
      });
    });

    describe("on deviceWidth prop change", () => {
      describe("if deviceWidth will present", () => {
        it("sets deviceWidth in the state to props.deviceWidth if it presents", () => {
          const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
            window
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
            window
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
      it("removes resize event listener", () => {
        sinon.spy(window, "removeEventListener");

        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window
        });

        const wrapper = shallow(<ScreenDetailsProvider />);

        try {
          expect(window.removeEventListener.calledOnce).to.be.false;

          wrapper.unmount();

          expect(window.removeEventListener.calledOnce).to.be.true;
          expect(window.removeEventListener.getCall(0).args[0]).to.equal(
            "resize"
          );
          expect(typeof window.removeEventListener.getCall(0).args[1]).to.equal(
            "function"
          );
        } finally {
          wrapper.unmount();
          window.removeEventListener.restore();
        }
      });
    });
  });

  describe("if none of them presents", () => {
    describe("on mount", () => {
      it("sets deviceWidth to 0", () => {
        const ScreenDetailsProvider = require("./ScreenDetailsProvider.jsx")({
          window: null
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
          window: null
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
            window: null
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
            window: null
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
        window: null
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
        window: null
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
        window: null
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
        window: null
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
