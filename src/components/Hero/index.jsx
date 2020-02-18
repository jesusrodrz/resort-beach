import React from 'react';

export default function Hero({ children, className, src }) {
  const style = src ? { '--banner': src } : null;
  return (
    <header className={className} style={style}>
      {children}
    </header>
  );
}
Hero.defaultProps = {
  className: 'defaultHero',
};
