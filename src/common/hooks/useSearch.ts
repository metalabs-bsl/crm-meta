import { useEffect, useState } from 'react';
type Item = object;

const recursiveSearch = <T extends Item>(obj: T | T[] | string | number, searchText: string): boolean => {
  if (typeof obj === 'string') {
    return obj.toLowerCase().includes(searchText);
  }
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString().toLowerCase().includes(searchText);
  }
  if (Array.isArray(obj)) {
    return obj.some((item) => recursiveSearch(item, searchText));
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some((value) => recursiveSearch(value as T, searchText));
  }
  return false;
};

export const useSearch = <T extends Item>(data: T[], searchText: string): T[] => {
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (data.length > 0 && searchText !== undefined) {
      const lowercasedSearchText = searchText.toLowerCase();
      const filtered = data.filter((item) => recursiveSearch(item, lowercasedSearchText));
      setFilteredData(filtered);
    }
  }, [data, searchText]);

  return filteredData;
};
