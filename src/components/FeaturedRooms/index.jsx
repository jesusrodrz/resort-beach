import React, { useState } from 'react';
import { useRoomsValue } from 'context';
import Loading from 'components/Loading';
import Room from 'components/Room';
import Title from 'components/Title';

function getRooms(rooms) {
  return rooms.map(room => <Room key={room.id} room={room} />);
}

export default function FeaturedRooms() {
  const {
    roomsState: { loading, featuredRooms },
  } = useRoomsValue();

  return (
    <section className="featured-rooms">
      <Title title="Featured Rooms" />
      <div className="featured-rooms-center">
        {featuredRooms && !loading ? getRooms(featuredRooms) : <Loading />}
      </div>
    </section>
  );
}
