import PropTypes from 'prop-types';
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const ItemList = ({ item }) => {
  const dispatch = useDispatch();

  // Update cart handler
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        style={{ width: 240, marginBottom: 20 }}
        cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
      >
        <Meta title={item.name} />
        <div style={{ marginTop: 10 }}>
          <p>Price: {item.price.toFixed(1)} Rs </p> {/* Display price here */}
        </div>
        <div className="item-button">
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

ItemList.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,  // Add price prop type
  }).isRequired,
};

export default ItemList;
