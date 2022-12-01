import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';

export default function Recipes() {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const useComponent = () => {
    const locComponent = usePathname();
    if (locComponent === '/meals') {
      return (<Meals />);
    } if (locComponent === '/drinks') {
      return (<Drinks />);
    }
  };

  return (
    <>
      <Header />
      { useComponent() }
      <Footer />
    </>
  );
}
