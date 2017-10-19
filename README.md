# aerial

Aerial is a customizable flexbox based mobile-first responsive library for React DOM & React Native.

#### install

```
npm install react-aerial --save
```

#### dom example

```jsx
import React from "react";

import { ScreenDetailsProvider, Container, Row, Col } from "react-aerial";

const App = ( ) => (
  <ScreenDetailsProvider>
    <Container>
      <Row xsHorizontalGutter={8} xsVerticalGutter={16}>
        <Col xs={1} sm={1/2} md={1/3} lg={2/5}>
          Donec congue porttitor diam, eu fermentum nisl laoreet ac.
        </Col>
        <Col xs={1} sm={1/2} md={1/3} lg={1/5}>
          Sed tincidunt faucibus massa, ut commodo magna sodales suscipit.
        </Col>
        <Col xs={1} sm={1} md={1/3} lg={2/5}>
          Vivamus nec enim eu diam mollis luctus.
        </Col>
      </Row>
    </Container>
  </ScreenDetailsProvider>
);

export default App;
```

#### react native example

```jsx
import React from "react";
import { Text } from 'react-native';

import { ScreenDetailsProvider, Container, Row, Col } from "react-aerial/react-native";

const App = ( ) => (
  <ScreenDetailsProvider>
    <Container>
      <Row xsHorizontalGutter={8} xsVerticalGutter={16}>
        <Col xs={1} sm={1/2} md={1/3} lg={2/5}>
          <Text>Donec congue porttitor diam, eu fermentum nisl laoreet ac.</Text>
        </Col>
        <Col xs={1} sm={1/2} md={1/3} lg={1/5}>
          <Text>Sed tincidunt faucibus massa, ut commodo magna sodales suscipit.</Text>
        </Col>
        <Col xs={1} sm={1} md={1/3} lg={2/5}>
          <Text>Vivamus nec enim eu diam mollis luctus.</Text>
        </Col>
      </Row>
    </Container>
  </ScreenDetailsProvider>
);

export default App;
```

#### pros

  * Flexible col & offset widths (e.g. 1/2, 1/5) instead of fixed row partition (e.g. 12, 60)
  * Customizable breakpoints without recompiling the library
  * Rendering order, gutters & alignment of the cols can be defined related to screen size
  * Unified component structure for react dom and react native

#### cons

  * The current implementation does not use stylesheets to give more flexibility, and support react native.
    It uses the style property of the elements instead, which can decrease the rendering performance.
  * The library does not use media queries either. To eliminte the need of them, it relies on the screen width
    of the client platform that it gets from [window](https://developer.mozilla.org/en-US/docs/Web/API/window/innerWidth),
    or [Dimensions](https://facebook.github.io/react-native/docs/dimensions.html), and subscribes to their changes.
    Because of this, it can't be used for server side rendering.


## Components

### &lt;Container /&gt;

Provides a wrapper that is aligned to the middle of the screen.
The width of the container for each device size must be defined at the breakpoints.

#### props

  | name | type | description
  | --- | --- | ---
  | style | object (optional) | Style to apply on the wrapper. The following properties may be overwritten: alignSelf, marginLeft, marginRight, flex, width. |
  | className | string (optional) | Classname to apply on the wrapper |

### &lt;Row /&gt;

A flexbox based wrapper for Cols, that will wrap them to the new line on overflow.
Only Col components should be provided as children to this component.
Applies gutter as padding on Cols, and reorder them based on their their \{size\}Order prop.
Row uses negative margins on the top and sides to compensate the gutters.

#### props

  | name | type | description
  | --- | --- | ---
  | style | object (optional) | Style to apply on the wrapper. The following properties may be overwritten: alignItems, boxSizing, display, flexDirection, flexWrap, justifyContent, marginLeft, marginRight, marginTop. |
  | className | string (optional) | Classname to apply on the wrapper |
  | \{size\}HorizontalGutter | number (optional, 0 by default) | Sets the size of horizontal gutter between Cols in pixels related to the device size. Expected props with the default breakpoints are: **xsHorizontalGutter, smHorizontalGutter, mdHorizontalGutter, lgHorizontalGutter**. |
  | \{size\}VerticalGutter | number (optional, 0 by default) | Sets the size of vertical gutter between Cols in pixels related to the device size. Expected props with the default breakpoints are: **xsVerticalGutter, smVerticalGutter, mdVerticalGutter, lgVerticalGutter**. |
  | \{size\}HorizontalAlign | one of "left", "center", "right" (optional, "left" by default) | Determines the horizontal alignment of the cols of where the overall width is less than 1. Sets `justify-content` flex property related to the device size. Expected props with the default breakpoints are: **xsHorizontalAlign, smHorizontalAlign, mdHorizontalAlign, lgHorizontalAlign**. |
  | \{size\}VerticalAlign | one of "top", "center", "bottom", "stretch" (optional, "stretch" by default) | Defines the vertical position of the Cols in the current row. Sets `align-items` flex property related to the device size. Expected props with the default breakpoints are: **xsAlignItems, smAlignItems, mdAlignItems, lgAlignItems**. |

### &lt;Col /&gt;

Smallest unit of the responsive grid.
The width of cols can be set on different device sizes relative to the width of the Row,
as well as their horizontal alignment and order can be changed.
Should be used as the children of Row component.

#### props

  | name | type | description
  | --- | --- | ---
  | style | object (optional) | Style to apply on the wrapper. The following properties may be overwritten: alignSelf, flexGrow, flexShrink, marginLeft, paddingLeft, paddingRight, paddingTop, width. |
  | className | string (optional) | Classname to apply on the wrapper |
  | \{size\} | number (0..1) (optional, 1 by default) | Sets width of the Col related to the device size. The full width of the parent row is 1. Expected props with the default breakpoints are: **xs, sm, md, lg**. |
  | \{size\}Offset | number (0..1) (optional, 0 by default) | Sets left offset of the Col related to the device size. Left offset of the Col on the given screen size. The full width of the parent row is 1. Expected props with the default breakpoints are: **xsOffset, smOffset, mdOffset, lgOffset**. |
  | \{size\}VerticalAlign | one of "auto", "top", "center", "bottom", "stretch", "baseline" (optional, "auto" by default) | Defines the vertical position of the actual Col in the current row. Sets `align-self` flex property related to the device size. Expected props with the default breakpoints are: **xsVerticalAlign, smVerticalAlign, mdVerticalAlign, lgVerticalAlign**. |
  | \{size\}Order | number (optional, 0 by default) | Sets the rendering order related to the device size. Expected props with the default breakpoints are: **xsOrder, smOrder, mdOrder, lgOrder**. |

### &lt;Show /&gt;

Conditionally renders children based on the provided props and the matching device size.

#### props

  | name | type | description
  | --- | --- | ---
  | \{size\} | boolean (optional, false by default) | Determines if the children is rendered on the given screen size. Expected props with the default breakpoints are: **xs, sm, md, lg**. |

#### example

```jsx
import React from "react";

import { ScreenDetailsProvider, Show } from "react-aerial";

const App = ( ) => (
  <ScreenDetailsProvider>
    <Show xs={false} md={true}>
      Only visible on md and above
    </Show>
  </ScreenDetailsProvider>
);

export default App;
```

### &lt;Switch /&gt;

Renders the highest matching react component or element.

#### props

  | name | type | description
  | --- | --- | ---
  | \{size\} | React component / element (optional) | Component or element to show when the given size is active. Expected props with the default breakpoints are: **xs, sm, md, lg**. |

#### example

```jsx
import React from "react";

import { ScreenDetailsProvider, Switch } from "react-aerial";

const DesktopComponent = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <div>Rendered on large devices</div>
  </div>
);

const App = ( ) => (
  <ScreenDetailsProvider>
    <Switch
      xs={<div>Rendered on small devices</div>}
      md={DesktopComponent}
      title="Passed prop"
    />
  </ScreenDetailsProvider>
);

export default App;
```

### &lt;ScreenDetailsProvider /&gt;

Broadcasts screenDetails in the wrapped subtree to other aerial components.
For using Aerial it is necesarry to wrap the component tree into a ScreenDetailsProvider component.

#### props

  | name | type | description
  | --- | --- | ---
  | breakpoints | \[\{size: string, minWidth: number, containerWidth: string&#124;number\}\] (optional) | Overrides default breakpoints. |
  | deviceWidth | number (optional) | Overrides window's width or defines it in pixels. Suitable for testing purposes. |

  The default breakpoints are the following:

  ```
  [
    { size: "xs", minWidth: 0,    containerWidth: "100%" },
    { size: "sm", minWidth: 768,  containerWidth: 750    },
    { size: "md", minWidth: 992,  containerWidth: 970    },
    { size: "lg", minWidth: 1200, containerWidth: 1170   }
  ]
  ```

### example

```jsx
import React from "react";

import { ScreenDetailsProvider, Container, Row, Col } from "react-aerial";

const breakpoints = [
  { size: "small", minWidth: 0, containerWidth: "100%" },
  { size: "large", minWidth: 992, containerWidth: 970 }
];

const App = ( ) => (
  <ScreenDetailsProvider breakpoints={breakpoints}>
    <Container>
      <Row
        smallVerticalGutter={8}
        largeVerticalGutter={16}
        largeHorizontalGutter={16}
      >
        <Col small={1} large={1}>
          Donec congue porttitor diam, eu fermentum nisl laoreet ac.
        </Col>
        <Col small={1} large={1/3}>
          Sed tincidunt faucibus massa, ut commodo magna sodales suscipit.
        </Col>
        <Col small={1} large={1/3} largeOffset={1/3}>
          Vivamus nec enim eu diam mollis luctus.
        </Col>
      </Row>
    </Container>
  </ScreenDetailsProvider>
);

export default App;
```

## Higher order components

### withScreenDetails(Component)

Adds the screenDetails object as prop to the wrapped component,
and rerenders it on change of screenDetails.

#### example

```jsx
import React from "react";
import classNames from "classnames";

import { ScreenDetailsProvider, withScreenDetails } from "react-aerial";

const Component = ({ screenDetails }) => (
  <div className={classNames({
      "component--small": screenDetails.breakpoints[0].active,
      "component--large": screenDetails.breakpoints[2].active
    })}
  >
    Conditional classes applied
  </div>
);

const ComponentWithScreenDetails = withScreenDetails(Component);

const App = ( ) => (
  <ScreenDetailsProvider>
    <ComponentWithScreenDetails />
  </ScreenDetailsProvider>
);

export default App;
```

### screenDetails object

#### properties

  | name | type | description
  | --- | --- | ---
  | breakpoints | \[\{size: string, minWidth: number, containerWidth: string&#124;number, active: boolean\}\] | Array of breakpoint objects that is passed to ScreenDetailsProvider, extended with the active flag. |
  | deviceWidth | number | Current device width in pixels |


## License

MIT License

Copyright (c) 2017 László Kardinál

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
