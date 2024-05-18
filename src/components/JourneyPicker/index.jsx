import React, { useEffect, useState } from 'react';
import './style.css';

export const CityOptions = ({ cities }) => {
  console.log(cities);
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
      ;
    </>
  );
};

export const DateOptions = ({ dates }) => {
  console.log(dates);
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([
    {
      dateBasic: '17.05.2024',
      dateCs: 'pá 17. květen 2024',
    },
    {
      dateBasic: '18.05.2024',
      dateCs: 'so 18. květen 2024',
    },
  ]);

  useEffect(() => {
    const fetchCities = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities ',
      );
      const data = await resp.json();
      setCities(data.results);
    };
    fetchCities();

    const fetchDates = async () => {
      const resp = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await resp.json();
      setDates(data.results);
    };
    fetchDates();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO
    console.log(
      `Uživatel chcete objednat jízdenku z ${fromCity} do ${toCity} na ${date}`,
    );
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <DateOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
