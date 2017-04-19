import React from 'react';
import Yoga from 'yoga-layout';
import Node from './Node';

global.Yoga = Yoga;

const OVERFLOW_MAP = {
  hidden: Yoga.OVERFLOW_HIDDEN,
  scroll: Yoga.OVERFLOW_SCROLL,
  visible: Yoga.OVERFLOW_VISIBLE,
};

const FLEX_DIRECTION_MAP = {
  column: Yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  row: Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
};

const WRAP_MAP = {
  wrap: Yoga.WRAP_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE,
  'no-wrap': Yoga.WRAP_NO_WRAP,
};

// TODO: Support these props:
// 'setPositionType',
// 'setPosition',
// 'setPositionPercent',
// 'setAlignContent',
// 'setAlignItems',
// 'setAlignSelf',
// 'setJustifyContent',
// 'setDisplay',
// 'setFlexBasis',
// 'setFlexBasisPercent',
// 'setMinWidth',
// 'setMinWidthPercent',
// 'setMinHeight',
// 'setMinHeightPercent',
// 'setMaxWidth',
// 'setMaxWidthPercent',
// 'setMaxHeight',
// 'setMaxHeightPercent',
// 'setAspectRatio',
// 'setBorder',

class View extends Node {
  constructor(props, context) {
    super(props, context);
    this.handleNewProps(props);
  }

  componentDidMount() {
    if (this.isRootNode) {
      window.addEventListener('resize', () => {
        this.updateLayout();
      });
      this.updateLayout();
    }
  }

  updateLayout() {
    // Calculate layout for all available space:
    this.node.calculateLayout(window.innerWidth, window.innerHeight);
    this.ee.emit('layout');
  }

  componentWillReceiveProps(nextProps) {
    // TODO: Signal to parent to calculate layout:
    this.handleNewProps(nextProps);
  }

  setDyn(fnName, val) {
    if (typeof val === 'string' && val.endsWith('%')) {
      this.node[`${fnName}Percent`](parseInt(val, 10));
    } else if (val === 'auto' && this.node[`${fnName}Auto`]) {
      this.node[`${fnName}Auto`](true);
    } else {
      this.node[fnName](+val);
    }
  }

  setMarginPadding(fnName, val) {
    if (typeof val === 'string' && val.endsWith('%')) {
      this.node[`${fnName}Percent`](parseInt(val, 10));
    } else if (val === 'auto' && this.node[`${fnName}Auto`]) {
      this.node[`${fnName}Auto`](true);
    } else {
      this.node[fnName](Yoga.EDGE_ALL, +val);
    }
  }

  handleNewProps(props) {
    const {
      margin,
      padding,
      overflow,
      flex,
      flexGrow,
      flexShrink,
      flexDirection,
      flexWrap,
      width,
      height,
    } = props;

    if (margin) this.setMarginPadding('setMargin', margin);
    if (padding) this.setMarginPadding('setPadding', padding);

    if (overflow) this.node.setOverflow(OVERFLOW_MAP[overflow]);

    if (flex) this.node.setFlex(flex);
    if (flexGrow) this.node.setFlexGrow(flexGrow);
    if (flexShrink) this.node.setFlexShrink(flexShrink);
    if (flexDirection) this.node.setFlexDirection(FLEX_DIRECTION_MAP[flexDirection]);
    if (flexWrap) this.node.setFlexWrap(WRAP_MAP[flexWrap]);

    if (width) this.setDyn('setWidth', width);
    if (height) this.setDyn('setHeight', height);
  }

  render() {
    const { layout } = this.state;
    const { children } = this.props;

    return (
      <div
        style={{
          ...this.props.style,
          position: 'absolute',
          ...layout,
        }}
      >
        {children}
      </div>
    );
  }
}

export default View;
