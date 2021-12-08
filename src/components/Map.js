import React from 'react';
import { Text, VStack, Flex } from '@chakra-ui/react';
import L from 'leaflet';
import { Button } from '@chakra-ui/button';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { saveLocation } from '../utils/utils';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ destinationsState, positionState }) => {
  //for marker position
  const [position, setPosition] = positionState;
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [destinations, setDestinations] = destinationsState;
  const [userLocation, setUserLocation] = React.useState(null);

  //   get the location name to display the moment user clicks the map
  React.useEffect(() => {
    if (!position) return;
    setIsLoading(true);
    // setName('Fetching Location Name...');
    const lat = position.lat;
    const lng = position.lng;

    let name;

    const fetchData = async () => {
      name = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ}&lat=` +
          lat +
          '&lon=' +
          lng +
          '&format=json'
      ).then(response => response.json());
      const address = name.address;
      const place =
        address &&
        (address.city || address.town || address.road || address.suburb);
      address && setName(`${place}, ${address.country}`);
    };

    fetchData();
    setIsLoading(false);
  }, [position]);

  function LocationMarker() {
    const map = useMap();

    //go to the user's location on open
    React.useEffect(() => {
      map.locate().on('locationfound', function (e) {
        setUserLocation(e.latlng);
        // setPosition(e.latlng);
        map.flyTo(e.latlng, 12);
      });
    }, [map]);

    React.useEffect(() => {
      if (!position) return;
      map.flyTo(position, map.getZoom() > 12 ? map.getZoom() : 12);
    }, [position]);

    //add a new marker and go to the location when user clicks on map
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You chose here</Popup>
      </Marker>
    );
  }

  async function addDestination(e) {
    setIsLoading(true);
    e.preventDefault();
    await saveLocation(position, userLocation, destinations, setDestinations);
    setIsLoading(false);
    document
      .getElementById('tabs')
      .scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (
    <Flex direction={['column', 'row']} flexBasis="0" justify="space-around">
      <div id="map" style={{ order: 1 }}>
        <MapContainer
          center={{
            lat: 52.52437,
            lng: 13.41053,
          }}
          zoom={12}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {destinations.map((destination, index) => {
            return (
              <Marker
                position={destination.LatLng}
                key={`${position}, ${index}`}
              >
                <Popup>
                  {destination.LatLng.lat}, {destination.LatLng.lng}
                </Popup>
              </Marker>
            );
          })}
          <LocationMarker />
        </MapContainer>
      </div>
      <VStack
        order={[0, 1]}
        mb={['10', null]}
        ml={[null, '10']}
        alignSelf="center"
      >
        <Text fontSize={[null, '3xl']}>
          {!position && 'Choose a location to get started!'}
        </Text>
        {name && <Text fontSize={[null, '3xl']}>{name}</Text>}
        {position && (
          <Text>
            Latitude: {Math.round(position.lat, 1)}, Longitude:{' '}
            {Math.round(position.lng)}
          </Text>
        )}
        <Button
          colorScheme={position && position !== userLocation && 'green'}
          onClick={addDestination}
          disabled={position && position !== userLocation ? false : true}
          isLoading={isLoading}
          loadingText="Loading"
        >
          {position && position !== userLocation
            ? `Save Location`
            : `Navigate the map to add a location`}
        </Button>
      </VStack>
    </Flex>
  );
};

export default Map;
