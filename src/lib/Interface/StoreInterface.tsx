/**
 * Type declaration for Context
 */
export interface ContextTypes {
  fave: {
    id: number;
    title: string;
    rating: number;
  }[];
  setFave: React.Dispatch<React.SetStateAction<any[]>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  searchHistory: {
    id: Date;
    text: string;
    date: Date;
  }[];
  setSearchHistory: React.Dispatch<React.SetStateAction<any[]>>;
  limit: number | string;
  setLimit: React.Dispatch<React.SetStateAction<number | string>>;
  sortedBy: boolean;
  setSortedBy: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Type Declaration for context props
 */
export interface PropsTypes {
  children: JSX.Element;
}
