import React from 'react';
import RoomsFilter from 'components/RoomFilter';
import { useRoomsValue } from 'context';
import Loading from 'components/Loading';
import RoomsList from 'components/RoomsList';

export default function RoomsContainer() {
  const {
    roomsState: { loading, sortedRooms },
  } = useRoomsValue();

  if (loading) {
    return <Loading title="Loading Rooms" />;
  }

  return (
    <div>
      <RoomsFilter />
      <RoomsList rooms={sortedRooms} />
    </div>
  );
}
