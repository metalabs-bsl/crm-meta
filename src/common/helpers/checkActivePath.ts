export const checkActivePath = (locationPath: string, path: string) => {
  // проверка является ли нынешний маршрут динамическим, к примеру /text/text
  const isDinamicPath = locationPath.split('/').length - 1 > 1;

  // проверка является ли маршрут кликнутого элемента динамичным, к примеру /text/:text
  const check = path.substring(0, path.indexOf('/:'));

  if (isDinamicPath && !!check) {
    return locationPath.includes(check) === path.includes(check);
  }

  // в случае если нынешний маршрут простой и он совпадает с маршрутом кликнутого элемента, к примеру /text
  return locationPath === path;
};
