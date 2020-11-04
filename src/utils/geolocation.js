export const getLocation = async (successFunc, errorFunc) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(successFunc, errorFunc, options);
};
