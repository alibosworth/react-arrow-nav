import React, { cloneElement, createRef, Children, PureComponent } from "react";
import PropTypes from "prop-types";
import { Shortcuts, ShortcutManager } from "react-shortcuts";

const DATA_ATTRIBUTE_INDEX = "data-focus-index";
const DATA_ATTRIBUTE_SKIP = "data-focus-skip";
const keymapName = "ARROW_NAV";

const defaultKeymap = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
};

export default class ArrowNav extends PureComponent {
  static mode = {
    HORIZONTAL: "HORIZONTAL",
    VERTICAL: "VERTICAL",
    BOTH: "BOTH"
  };

  static defaultProps = {
    className: "arrow-nav",
    defaultActiveChildIndex: 0,
    keymap: defaultKeymap,
    mode: ArrowNav.mode.BOTH,
    global: false,
    isolate: true,
    onItemFocus: () => {}
  };

  static propTypes = {
    className: PropTypes.string,
    defaultActiveChildIndex: PropTypes.number,
    keymap: PropTypes.objectOf(PropTypes.string),
    mode: PropTypes.oneOf([
      ArrowNav.mode.BOTH,
      ArrowNav.mode.HORIZONTAL,
      ArrowNav.mode.VERTICAL
    ]),
    global: PropTypes.bool,
    isolate: PropTypes.bool,
    onItemFocus: PropTypes.func
  };

  static childContextTypes = {
    shortcuts: PropTypes.instanceOf(ShortcutManager)
  };

  constructor(props) {
    super(props);
    const { defaultActiveChildIndex } = this.props;
    this.state = {
      activeChildIndex: defaultActiveChildIndex,
      children: []
    };
    this.Ref = createRef();
  }

  getChildContext() {
    const { keymap } = this.props;
    const refinedKeymap = Object.assign(defaultKeymap, keymap);
    const shortcutManager = new ShortcutManager({
      [keymapName]: refinedKeymap
    });
    return { shortcuts: shortcutManager };
  }

  componentDidMount() {
    this.setActiveChildIndex();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeChildIndex: active, children } = this.state;
    const { onItemFocus } = this.props;
    if (active !== prevState.activeChildIndex) {
      this.setFocus(active);
      onItemFocus(children[active].key, active);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      children: ArrowNav.getFilteredChildren(nextProps)
    };
  }

  static getFilteredChildren(props) {
    return Children.toArray(props.children).filter(Boolean);
  }

  setActiveChildIndex() {
    const { activeChildIndex, children } = this.state;
    if (activeChildIndex !== 0) {
      const numChildren = Children.count(children);

      if (numChildren === 0) {
        this.setState({ activeChildIndex: 0 });
      } else if (activeChildIndex >= numChildren) {
        this.setState({ activeChildIndex: numChildren - 1 });
      }
    }
  }

  setFocus(index) {
    /* eslint-disable */
    const childNode = this.Ref.current._domNode.children[index];

    if (childNode && childNode.hasAttribute(DATA_ATTRIBUTE_SKIP)) {
      this.moveFocus(
        childNode.compareDocumentPosition(document.activeElement) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
      );
    } else if (childNode && document.activeElement !== childNode) {
      childNode.focus();
    } else if (index !== 0) this.setFocus(0);
    /* eslint-enable */
  }

  handleShortcuts = (action, event) => {
    const { mode } = this.props;
    switch (action) {
      case "UP":
        if (mode === ArrowNav.mode.VERTICAL || mode === ArrowNav.mode.BOTH) {
          event.preventDefault();
          this.moveFocus(-1);
        }
        break;
      case "DOWN":
        if (mode === ArrowNav.mode.VERTICAL || mode === ArrowNav.mode.BOTH) {
          event.preventDefault();
          this.moveFocus(1);
        }
        break;
      case "LEFT":
        if (mode === ArrowNav.mode.HORIZONTAL || mode === ArrowNav.mode.BOTH) {
          event.preventDefault();
          this.moveFocus(-1);
        }
        break;
      case "RIGHT":
        if (mode === ArrowNav.mode.HORIZONTAL || mode === ArrowNav.mode.BOTH) {
          event.preventDefault();
          this.moveFocus(1);
        }
        break;
      default:
        break;
    }
  };

  moveFocus(delta) {
    const { children, activeChildIndex } = this.state;
    const numChildren = children ? Children.count(children) : 0;
    let nextIndex = activeChildIndex + delta;

    if (nextIndex >= numChildren) {
      nextIndex = 0; // loop
    } else if (nextIndex < 0) {
      nextIndex = numChildren - 1; // reverse loop
    }

    this.setState({ activeChildIndex: nextIndex });
  }

  handleFocus(event) {
    if (event.target.hasAttribute(DATA_ATTRIBUTE_INDEX)) {
      const index = parseInt(
        event.target.getAttribute(DATA_ATTRIBUTE_INDEX),
        10
      );
      const { children } = this.state;
      const child = Children.toArray(children)[index];

      this.setState({ activeChildIndex: index });

      if (child.props.onFocus) {
        child.props.onFocus(event);
      }
    }
  }

  renderChildren() {
    const { children, activeChildIndex } = this.state;
    return Children.map(children, (child, index) =>
      cloneElement(child, {
        [DATA_ATTRIBUTE_INDEX]: index,
        [DATA_ATTRIBUTE_SKIP]:
          parseInt(child.props.tabIndex, 10) === -1 || undefined,
        key: child.key || index,
        onClick: e => {
          this.setState({ activeChildIndex: index });
          if (child.props.onClick) child.props.onClick(e);
        },
        tabIndex: activeChildIndex === index ? 0 : -1
      })
    );
  }

  render() {
    const { className, global, isolate } = this.props;
    return (
      <Shortcuts
        className={className}
        name={keymapName}
        handler={this.handleShortcuts}
        ref={this.Ref}
        global={global}
        isolate={isolate}
      >
        {this.renderChildren()}
      </Shortcuts>
    );
  }
}
