import { useEffect, useState } from 'react';

type Args = {
  triggerDistance: number;
};

export const useWindowScroll = ({ triggerDistance }: Args) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > triggerDistance) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerDistance]);

  return { scrolled, setScrolled };
};
