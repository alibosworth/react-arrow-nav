# React Keyboard Navigation

A simple react component to enable keyboard navigation through it's child components.

## Dependencies

Depends on: [`react-shortcuts`][react-shortcuts]

Inspired from: [`boundless-arrow-key-navigation`][boundless]

## Demo

Visit [<b>GitHub page</b>][github-page]

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
      <div>Do Something awesome</div>
      <div tabIndex={-1}>or</div>
      <div>Don't use JS</div>
    </ArrowNav>;
  }
}
```

### Props

| name                    | Description                                                                                                                       | default value                                        |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| keymap                  | Object with keybindings to UP,DOWN,LEFT and RIGHT.<br/>For supported keys refer [Mousetrap][mousetrap]                            | `{UP: "up",DOWN: "down",LEFT: left",RIGHT: "right"}` |
| mode                    | The direction of keyboard navigation.<br/> Could be any of <br/>- ArrowNav.BOTH<br/>- ArrowNav.VERTICAL<br/>- ArrowNav>HORIZONTAL | ArrowNav.BOTH                                        |
| defaultActiveChildIndex | Default Active Item                                                                                                               | 0                                                    |
| onItemFocus             | Function to invoke on focus of each item. Recieve 2 params.<br/>key:key of the item                                               | (key,position)=>{}                                   |

Additional props from `react-shortcuts`

- `className`
- `global`
- `isolate`

[react-shortcuts]: https://www.npmjs.com/package/react-shortcuts
[boundless]: https://www.npmjs.com/package/boundless-arrow-key-navigation
[github-page]: https://hadeeb.github.io/react-arrow-nav
[mousetrap]: https://craig.is/killing/mice
