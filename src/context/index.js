import React, { createContext, useContext } from 'react';
import { useRooms } from 'hooks';

const RoomContext = createContext();
const useRoomsValue = () => useContext(RoomContext);
function RoomContextProvider({ children }) {
  const rooms = useRooms();
  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
}

export { RoomContext, useRoomsValue, RoomContextProvider };
