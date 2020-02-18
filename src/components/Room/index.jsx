import React from 'react';
import defaultImage from 'images/room-1.jpeg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
export default function Room({ room }) {
  const { name, images, slug, price, id } = room;
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImage} alt={name} />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link
          // to={{ pathname: `rooms/${slug}`, state: { params: { id } } }}
          to={{
            pathname: `rooms/${slug}`,
            state: { params: { id: id } },
          }}
          className="btn-primary room-link"
        >
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
}
Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    price: PropTypes.number.isRequired,
  }),
};
