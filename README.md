# React Keyboard Navigation

A simple react component to enable keyboard navigation through it's child components.

## Installation

```shell
yarn add react-arrow-nav
```

OR

```shell
npm install react-arrow-nav
```

## Usage

### Import Component

```javascript
import ArrowNav from "react-arrow-nav";

class TodoItem extends React.Component {
  render() {
    <ArrowNav>
      <div>Item 1</div>
      <div>Item 2</div>
      <FancyItem>Item 3</FancyItem>
    </ArrowNav>;
  }
}

function FancyItem({ tabIndex, children }) {
  return (
    <button {...fancyProps} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
```

### Props

- **mode**

  The direction of keyboard navigation.

  _default_ : `ArrowNav.VERTICAL`

  values = [ `ArrowNav.VERTICAL` , `ArrowNav.HORIZONTAL` , `ArrowNav.BOTH` ]

- ...any other prop will be passed to the wrapping `div` element.

> If the child elements are not DOM elements, make sure they pass down `tabIndex` prop to the DOM element
