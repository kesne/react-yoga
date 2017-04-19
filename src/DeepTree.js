import React from 'react';
import PropTypes from 'prop-types';
import View from './Yoga/View';

const propTypes = {
  depth: PropTypes.number.isRequired,
  breadth: PropTypes.number.isRequired,
  wrap: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};


const styles = {
  custom0: {
    backgroundColor: '#222',
  },
  custom1: {
    backgroundColor: '#666',
  },
  custom2: {
    backgroundColor: '#999',
  },
  terminal0: {
    backgroundColor: 'blue',
  },
  terminal1: {
    backgroundColor: 'orange',
  },
  terminal2: {
    backgroundColor: 'red',
  },
};

class DeepTree extends React.Component {
  render() {
    const { depth, breadth, wrap, id } = this.props;
    let result = (
      <View
        flex={1}
        flexDirection={depth % 2 === 0 ? 'column' : 'row'}
        padding={4}
        style={{
          ...styles[`custom${id % 3}`],
        }}
      >
        {depth === 0 && (
          <View
            height={20}
            width={20}
            style={{
              ...styles.terminal,
              ...styles[`terminal${id % 3}`],
            }}
          />
        )}
        {depth !== 0 && Array.from({ length: breadth }).map((el, i) => (
          <DeepTree
            key={i}
            wrap={wrap}
            depth={depth - 1}
            id={i}
            breadth={breadth}
          />
        ))}
      </View>
    );
    for (var i = 0; i < wrap; i++) {
      result = <View>{result}</View>;
    }
    return result;
  }
}

DeepTree.propTypes = propTypes;

export default DeepTree;
