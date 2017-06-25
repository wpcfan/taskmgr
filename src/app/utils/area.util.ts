import { city_data } from './area.data';

export const getProvinces = () => {
  const provinces = [];
  for (const province in city_data) {
    if (province) {
      provinces.push(province);
    }
  }
  return [...provinces];
};

export const getCitiesByProvince = (province: string) => {
  if (!province || !city_data[province]) {
    return [];
  }
  const cities = city_data[province];
  const citiesByProvice = [];
  for (const city in cities) {
    if (city) {
      citiesByProvice.push(city);
    }
  }
  return [...citiesByProvice];
};

export const getAreasByCity = (province: string, city: string) => {
  if (!province || !city || !city_data[province][city]) {
    return [];
  }
  const areas = city_data[province][city];
  return [...areas];
};
