const deleteEntries = setDestinations => {
  window.localStorage.removeItem('my_destinations');
  setDestinations([]);
};

const deleteEntry = (destination, allDestinations, setDestinations) => {
  const index = allDestinations.indexOf(destination);
  if (index > -1) {
    allDestinations.splice(index, 1);
  }
  window.localStorage.setItem(
    'my_destinations',
    JSON.stringify(allDestinations)
  );
  setDestinations(allDestinations);
};

const saveLocation = async (
  position,
  userLocation,
  destinations,
  setDestinations
) => {
  //get the name of the location from LatLng
  let response;
  response = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ}&lat=` +
      position.lat +
      '&lon=' +
      position.lng +
      '&format=json'
  ).then(response => response.json());
  const address = response.address;
  const place = address.city || address.town || address.road || address.suburb;
  const position_name = `${place}, ${address.country}`;

  //get the points of interest
  let POI = [];
  response = await fetch(
    `https://us1.locationiq.com/v1/nearby.php?key=${process.env.REACT_APP_LOCATIONIQ}&lat=` +
      position.lat +
      '&lon=' +
      position.lng +
      '&tag=restaurant&radius=3000&format=json'
  )
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        POI.push({
          name: element.name,
          type: element.type,
          distance: element.distance,
        });
      });
      if (POI.length > 3) POI = POI.slice(0, 3);
    })
    .catch(e => e);

  //get the distance and duration
  response =
    userLocation &&
    (await fetch(
      'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=' +
        userLocation.lat +
        ',' +
        userLocation.lng +
        '&destinations=' +
        position.lat +
        ',' +
        position.lng +
        `&travelMode=driving&key=${process.env.REACT_APP_BING}`
    ).then(response => response.json()));

  const distance =
    Math.round(
      response.resourceSets[0].resources[0].results[0].travelDistance * 100
    ) / 100;
  const duration =
    Math.round(
      (response.resourceSets[0].resources[0].results[0].travelDuration / 60) *
        100
    ) / 100;

  //add destination to the local storage
  localStorage.setItem(
    'my_destinations',
    JSON.stringify([
      ...destinations,
      {
        LatLng: {
          lat: Math.round(position.lat * 100) / 100,
          lng: Math.round(position.lng * 100) / 100,
        },
        name: position_name,
        distance: distance,
        duration: duration,
        POI: POI,
        favorite: false,
      },
    ])
  );
  //add the destination to the local state
  setDestinations(prevState => [
    ...prevState,
    {
      LatLng: {
        lat: Math.round(position.lat * 100) / 100,
        lng: Math.round(position.lng * 100) / 100,
      },
      name: position_name,
      distance: distance,
      duration: duration,
    },
  ]);
};

export { deleteEntries, deleteEntry, saveLocation };
