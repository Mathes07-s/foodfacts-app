import React from 'react';

class ClassFoodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  componentDidMount() {
    console.log('ClassFoodCard mounted');
  }

  componentWillUnmount() {
    console.log('ClassFoodCard unmounted');
  }

  toggleExpand = () => {
    this.setState(prev => ({ expanded: !prev.expanded }));
  };

  render() {
    const { product } = this.props;
    return (
      <div onClick={this.toggleExpand} style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem', cursor: 'pointer' }}>
        <h3>{product.product_name}</h3>
        {this.state.expanded && <p>Brand: {product.brands}</p>}
      </div>
    );
  }
}

export default ClassFoodCard;