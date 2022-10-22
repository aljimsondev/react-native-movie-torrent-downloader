import React from 'react';
import {ContextTypes, PropsTypes} from '../Interface/StoreInterface';
import Storage from '../Storage';

export const Context = React.createContext<ContextTypes>({
  fave: [],
  setFave: () => {},
  theme: '',
  setTheme: () => '',
  searchHistory: [],
  setSearchHistory: () => {},
  limit: 50,
  setLimit: () => {},
  sortedBy: false,
  setSortedBy: () => {},
});

export default function GlobalContext(props: PropsTypes) {
  const {children} = props;
  const [fave, setFave] = React.useState<any[]>([]);
  const [searchHistory, setSearchHistory] = React.useState<
    {id: Date; text: string; date: Date}[]
  >([]);
  const [sortedBy, setSortedBy] = React.useState<boolean>(true);
  const [limit, setLimit] = React.useState<number | string>(50);
  const [theme, setTheme] = React.useState<string>('');
  const storage = new Storage();

  //get any data from storage by key
  const getDataFromStore = React.useCallback(
    async (key: string) => {
      const item = await storage.getItem(key);
      if (!item) {
        return [];
      } else {
        return JSON.parse(item);
      }
    },
    [fave],
  );

  //run everytime favorites will be added or removed
  React.useEffect(() => {
    getDataFromStore('favorites').then(data => {
      setFave(data);
    });
    //getting the limit
    getDataFromStore('limit').then(data => {
      if (!data || typeof data === 'object') {
        //not set
        return;
      } else {
        setLimit(data);
      }
    });
    //getting the sorder order
    getDataFromStore('isAscOrder').then(data => {
      if (typeof data === 'object') {
        //not set
        return;
      } else {
        setSortedBy(data);
      }
    });

    //getting the ssearch history
    getDataFromStore('searchHistory').then(data => {
      if (data && typeof data === 'object') {
        setSearchHistory(data);
      }
    });
    return () => {
      //clean up
      setFave([]);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        fave: fave,
        setFave: setFave,
        theme: theme,
        setTheme: setTheme,
        searchHistory: searchHistory,
        setSearchHistory: setSearchHistory,
        setLimit: setLimit,
        limit: limit,
        sortedBy: sortedBy,
        setSortedBy: setSortedBy,
      }}>
      {children}
    </Context.Provider>
  );
}
