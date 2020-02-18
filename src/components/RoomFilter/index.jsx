import React from 'react';
import { useRoomsValue } from 'context';
import Title from 'components/Title';
import { useRoomsFilter } from 'hooks';

export default function RoomsFilter() {
  const {
    roomsState: { rooms },
    setRoomsState,
  } = useRoomsValue();
  const { roomsOptionValues, setFilterOps, filterOps } = useRoomsFilter(rooms, sortedRooms =>
    setRoomsState({ sortedRooms }),
  );
  const { type, capacity, price, minSize, maxSize, breakfast, pets } = filterOps;
  const { types, capacities, prices } = roomsOptionValues;
  const handleChange = ({ target }) => {
    const set = {};
    set[target.name] = target.type === 'checkbox' ? target.checked : target.value;
    setFilterOps(ops => ({ ...ops, ...set }));
  };
  return (
    <section className="filter-container">
      <Title title="Search Rooms" />
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types.map((type, i) => (
              <option value={type} key={`${type}-${i}`}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Guest</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {capacities.map((item, i) => (
              <option value={item} key={`${item}-${i}`}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Room price ${price}</label>
          <input
            className="form-control"
            type="range"
            name="price"
            id="price"
            value={price}
            max={prices.max}
            min={prices.min}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Room size</label>
          <input
            className="size-input"
            type="number"
            name="minSize"
            id="minSize"
            onChange={handleChange}
            value={minSize}
          />
          <input
            className="size-input"
            type="number"
            name="maxSize"
            id="MAXSize"
            onChange={handleChange}
            value={maxSize}
          />
        </div>
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
            <label htmlFor="pets">Allow pets</label>
          </div>
        </div>
      </form>
    </section>
  );
}
