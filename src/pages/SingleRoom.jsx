import React from 'react';
import Loading from 'components/Loading';
import { Link } from 'react-router-dom';
import Hero from 'components/Hero';
import Banner from 'components/Banner';
import { useRoom } from 'hooks';

const Error = () => (
  <div className="error">
    <h3>Erro 404 Room not found</h3>
    <Link to="/rooms" className="btn-primary">
      Back to rooms
    </Link>
  </div>
);
const Loader = () => (
  <div>
    <Loading title="Loading Room" />
  </div>
);
const Room = ({ room }) => {
  const {
    name,
    description,
    capacity,
    pets,
    breakfast,
    images: [mainImg, ...images],
    price,
    size,
    extras,
  } = room;
  return (
    <>
      <Hero className="roomsHero" src={mainImg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Back to rooms
          </Link>
        </Banner>
      </Hero>
      <section className="single-room">
        <div className="single-room-images">
          {images.map((img, i) => (
            <img key={i} alt={name} src={img} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>Info</h3>
            <h6>Price: {price}</h6>
            <h6>Sicz: {size} SQFT</h6>
            <h6>Max capacity: {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
            <h6>{pets ? 'Pets allowed' : 'Pets not allowed'}</h6>
            <h6>{pets ? 'Pets allowed' : 'Pets not allowed'}</h6>
            <h6>{breakfast && 'free breakfast'}</h6>
          </article>
        </div>
      </section>
      {extras && (
        <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item, i) => (
              <li key={i}>- {item}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
export default function SingleRoom({ match }) {
  const { slug } = match.params;
  const [room, loading] = useRoom(slug);
  if (room && !room.error) {
    return <Room room={room} />;
  } else if (!room || loading) {
    return <Loader />;
  }
  return <Error />;
}
