// Функция принимает путь и объект с параметрами, которые нужно заменить в пути на значения из объекта
// Примеры:
// setPathIds('/somePath/:someId/:sommeIdTwo', { someId: '1', sommeIdTwo: '2' }) => '/somePath/1/2'
// setPathIds('/somePath/:id', { id: '1' }) => '/somePath/1'

export const setPathIds = (path: string, options: { [id: string]: string } = {}): string => {
  return Object.entries(options).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), path);
};
