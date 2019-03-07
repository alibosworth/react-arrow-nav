import React, {
  Component,
  Children,
  cloneElement,
  createRef,
  KeyboardEvent,
  HTMLProps,
  ReactNode
} from "react";

const modes = {
  VERTICAL: 1,
  HORIZONTAL: 2,
  BOTH: 3
};

const ChildrenLength = (children: ReactNode) =>
  Children.toArray(children).filter(c => c && typeof c === "object").length;

type Props = {
  mode?: number;
} & HTMLProps<HTMLDivElement>;

class ArrowNav extends Component<Props, { active: number }> {
  static mode = modes;
  static defaultProps = {
    mode: modes.VERTICAL
  };

  innerRef = createRef<HTMLDivElement>();
  state = { active: 0 };

  onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.innerRef.current && e.target !== e.currentTarget) {
      const clickOrigin = Array.from(this.innerRef.current.children).findIndex(
        c => c.contains(e.target as Node)
      );
      if (clickOrigin > -1) this.setState({ active: clickOrigin });
    }
    if (this.props.onClick) this.props.onClick(e);
  };

  handler = (e: KeyboardEvent<HTMLDivElement>) => {
    const childCount = ChildrenLength(this.props.children);
    if (!childCount) return;
    const { mode } = this.props;
    switch (e.key) {
      case "ArrowUp":
        if (mode === modes.BOTH || mode === modes.VERTICAL) {
          e.preventDefault();
          this.setState(({ active }) => ({
            active: (active - 1 + childCount) % childCount
          }));
        }
        break;
      case "ArrowDown":
        if (mode === modes.BOTH || mode === modes.VERTICAL) {
          e.preventDefault();
          this.setState(({ active }) => ({
            active: (active + 1) % childCount
          }));
        }
        break;
      case "ArrowLeft":
        if (mode === modes.BOTH || mode === modes.HORIZONTAL) {
          e.preventDefault();
          this.setState(({ active }) => ({
            active: (active - 1 + childCount) % childCount
          }));
        }
        break;
      case "ArrowRight":
        if (mode === modes.BOTH || mode === modes.HORIZONTAL) {
          e.preventDefault();
          this.setState(({ active }) => ({
            active: (active + 1) % childCount
          }));
        }
        break;
      default:
        break;
    }
  };

  renderChildren() {
    const { children } = this.props;
    const { active } = this.state;
    let index = -1;
    return Children.map<any, any>(children, child => {
      if (!child) return null;
      if (typeof child !== "object") return child;
      index++;
      return cloneElement(child, {
        tabIndex:
          active === index
            ? Math.max(0, child.props.tabIndex || 0)
            : Math.min(-1, child.props.tabIndex || 0)
      });
    });
  }

  componentDidUpdate(_: any, { active: prevActive }: any) {
    const { active } = this.state;
    if (prevActive !== active)
      if (
        this.innerRef.current &&
        this.innerRef.current.childElementCount > active
      )
        (this.innerRef.current.children[active] as HTMLElement).focus();
  }

  render() {
    const { mode, ...rest } = this.props;
    return (
      <div
        {...rest}
        onClick={this.onClick}
        ref={this.innerRef}
        onKeyDown={this.handler}
      >
        {this.renderChildren()}
      </div>
    );
  }
}

export default ArrowNav;
