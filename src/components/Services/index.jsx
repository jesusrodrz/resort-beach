import React, { useState } from 'react';
import Title from 'components/Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

export default function Services() {
  const [services] = useState([
    {
      icon: <FaCocktail />,
      title: 'Free Cocktails',
      info:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum iste eveniet, eos et enim.',
    },
    {
      icon: <FaHiking />,
      title: 'Endless Hiking',
      info:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum iste eveniet, eos et enim.',
    },
    {
      icon: <FaShuttleVan />,
      title: 'Free Shuttle',
      info:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum iste eveniet, eos et enim.',
    },
    {
      icon: <FaBeer />,
      title: 'Free Beer',
      info:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum iste eveniet, eos et enim.',
    },
  ]);
  return (
    <section className="services">
      <Title title="Services" />
      <div className="services-center">
        {services.map((item, i) => (
          <article key={`${i * Math.random()}`} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
