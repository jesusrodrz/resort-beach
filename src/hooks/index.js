import { useState, useEffect } from 'react';
import contentful from 'contenful';

const checkValues = (options = {}, validateCallbacks = {}) => {
  const keys = Object.keys(options);
  const validations = keys.map(key => {
    const callback = validateCallbacks[key];
    if (callback) {
      return callback(options[key]);
    }
    return true;
  });
  return validations.every(item => item === true);
};
const getUniqueValues = (array, key) => {
  return array.reduce((preVal, item) => {
    if (!preVal.includes(item[key])) {
      preVal.push(item[key]);
    }
    return preVal;
  }, []);
};
const parseRoom = item => {
  const id = item.sys.id;
  const images = item.fields.images.map(image => image.fields.file.url);
  const room = { ...item.fields, images, id };
  return room;
};
export const useRooms = () => {
  const [roomsState, setRoomsState] = useState({
    loading: false,
  });
  const formatData = items => {
    const newItems = items.map(item => parseRoom(item));
    return newItems;
  };
  const getRoom = slug => {
    const room = roomsState.rooms && roomsState.rooms.find(room => room.slug === slug);
    return room;
  };

  useEffect(() => {
    setRoomsState({ loading: true });
    const fetchData = async () => {
      try {
        const dataRooms = await contentful().getEntries({
          content_type: 'beachResortRoom',
        });
        const rooms = formatData(dataRooms.items);
        const featuredRooms = rooms.filter(room => room.featured);

        setRoomsState({
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return {
    roomsState,
    setRoomsState,
    getRoom,
  };
};

export const useRoomsFilter = (defaultRooms, callback) => {
  const [rooms, setRooms] = useState([]);
  const [roomsOptionValues, setRoomsOptionValues] = useState({
    types: ['all'],
    capacities: [0],
    prices: { min: 0, max: 0 },
  });
  const [filterOps, setFilterOps] = useState({
    type: 'all',
    price: 0,
    minSize: 0,
    maxSize: 0,
    pets: false,
    breakfast: false,
  });
  useEffect(() => {
    if (!defaultRooms) {
      return;
    }
    const types = getUniqueValues(defaultRooms, 'type');
    const prices = defaultRooms.map(room => room.price);
    const sizes = defaultRooms.map(room => room.size);
    const maxSize = Math.max(...sizes);
    const minSize = Math.min(...sizes);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const capacities = getUniqueValues(defaultRooms, 'capacity').sort((a, b) => a - b);

    setFilterOps(op => ({ ...op, price: max, maxSize, minSize }));
    setRoomsOptionValues({ types: ['all', ...types], capacities, prices: { max, min } });
    setRooms(defaultRooms);
  }, [defaultRooms]);
  useEffect(() => {
    if (!rooms) {
      return;
    }
    const sortedRooms = rooms.filter(room => {
      const isValid = checkValues(filterOps, {
        type: type => type === 'all' || room.type === type,
        capacity: capacity => Number(room.capacity) >= Number(capacity),
        price: price => Number(room.price) <= Number(price),
        minSize: value => Number(room.size) >= Number(value),
        maxSize: value => Number(room.size) <= Number(value),
        pets: value => (value ? room.pets : true),
        breakfast: value => (value ? room.breakfast : true),
      });
      return isValid;
    });

    if (callback) callback(sortedRooms);
  }, [filterOps]);

  return {
    roomsOptionValues,
    setFilterOps,
    filterOps,
  };
};
export const useRoom = slug => {
  const [state, setState] = useState({ loading: false, room: null });
  useEffect(() => {
    async function fetchRoom() {
      try {
        setState(state => ({ ...state, loading: true }));
        const roomData = await contentful().getEntries({
          content_type: 'beachResortRoom',
          'fields.slug[all]': slug,
        });
        if (roomData.items.length > 0) {
          const room = parseRoom(roomData.items[0]);
          setState({ room, loading: false });
        } else {
          setState({ room: { error: 'Not found' }, loading: false });
        }
      } catch (error) {
        setState({ room: { error }, loading: false });
      }
    }
    fetchRoom();
  }, [slug]);
  return [state.room, state.loading];
};
