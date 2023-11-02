import { useCallback, useMemo, useState } from 'react';

function useStorage(key, defaultValue) {

  const [storageData, setStorageData] = useState(() => {
    try {
      const storedData = getData(key);
      if (storedData === null) {
        setData(key, defaultValue);
        return defaultValue;
      }
      return storedData;
    } catch (error) {
      return defaultValue;
    }
  })

  const update = useCallback(
    (nextData) => {
      setData(key, nextData);
      setStorageData(nextData);
    },
    [key]
  );

  const remove = useCallback(() => {
    deleteData(key);
    setStorageData();
  }, [key]);

  return useMemo(
    () => ({
      storageData,
      update,
      remove,
    }),
    [remove, storageData, update]
  );
}

const {
  localStorage: storage,
  JSON: { stringify, parse },
} = globalThis;

const setData = (key, nextData) => {
  storage.setItem(key, stringify(nextData));
};

const getData = (key) => {
  return parse(storage.getItem(key));
};

const deleteData = (key) => {
  storage.removeItem(key);
};

export default useStorage;