import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Map from '../components/Map';
import { Link } from 'react-router-dom';

export default function Brewery() {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);
  return (
    <Container className="breweryBody">
      {/* <button className="backbtn" onClick></button> */}
      <Link to="/Home">
        <button className="backbtn"></button>
      </Link>
      <div className="brewerytitle">
        <h1>{apiData.name}</h1>
      </div>
      <div className="brewbod">
        <div className="brewerypic">
          {apiData.longitude && apiData.latitude && (
            <Map lng={apiData.longitude} lat={apiData.latitude} />
          )}
        </div>
        <div className="brewerylist">
          <ul className="bussinessInfo">
            <li className="phoneNum">Phone: {apiData.phone}</li>
            <li className="address">Address: {apiData.street}</li>
            <li>
              {apiData.city}, {apiData.state} {apiData.postal_code}
            </li>
            <li className="brewbutton">
              <a href={apiData.website_url} target="_blank">
                <button className="brewerybtn">Visit their website!</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
