import React from 'react';
import PropTypes from 'prop-types';
import Yoga from 'yoga-layout';
import mitt from 'mitt';

const contextTypes = {
  rootNode: PropTypes.any,
  parentNode: PropTypes.any,
};

class Node extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.node = Yoga.Node.create();
    // TODO: More elegant child handling. Maybe wrap it in a context provider or pass a prop?
    this.nextChildNode = 0;
    if (!context.rootNode) {
      this.isRootNode = true;
    } else {
      context.parentNode.insertChild(this.node);
    }
    this.state = {
      layout: {},
    };
  }

  insertChild(node) {
    this.node.insertChild(node, this.nextChildNode);
    this.nextChildNode++;
  }

  removeChild(node) {
    this.node.removeChild(node);
  }

  subscribe(fn) {
    this.ee.on('layout', fn);
    return () => {
      this.ee.off('layout', fn);
    }
  }

  componentWillMount() {
    if (this.context.rootNode) {
      this.unsubscribe = this.context.rootNode.subscribe(() => {
        this.setState({
          layout: this.node.getComputedLayout(),
        });
      });
    } else {
      this.ee = mitt();
    }
  }

  getChildContext() {
    return {
      rootNode: this.context.rootNode || this,
      parentNode: this,
    };
  }

  componentWillUnmount() {
    // Unsubscribe to layout changes:
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.context.parentNode.node.removeChild(this.node);
    this.node.free();
  }

  render() {
    throw new Error('Implemented elsewhere...');
  }
}

Node.contextTypes = contextTypes;
Node.childContextTypes = contextTypes;

export default Node;
