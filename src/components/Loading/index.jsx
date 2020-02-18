import React from 'react';
import loadingGig from 'images/gif/loading-arrow.gif';
export default function Loading({ title = 'Rooms data loading' }) {
  return (
    <div className="loading">
      <h4>{title}</h4>
      <img src={loadingGig} alt="loading-content" />
    </div>
  );
}
