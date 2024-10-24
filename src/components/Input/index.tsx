import "./input.scss";
import { fetchData } from "../../utils/fetch-data";
import { debounce } from "../../utils/deboucne";
import Loader from "../Loader";
import { useState } from "react";

export interface InputProps {
  /** Placeholder of the input */
  placeholder?: string;
  /** On click item handler */
  onSelectItem: (item: string) => void;
  /** debounce time (in ms) */
  debounceTime?: number;
}

export interface SearchResult {
  loading: boolean;
  error?: string;
  items?: string[];
}

const Input = ({
  placeholder,
  onSelectItem,
  debounceTime = 300,
}: InputProps) => {
  // DO NOT remove this log
  console.log("input re-render");

  // Your code start here
  const [result, setResult] = useState<SearchResult | undefined>(undefined);

  const hangleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    if (!searchQuery) {
      setResult(undefined);
      return;
    }

    let ignored = false;
    setResult({ loading: true });
    fetchData(searchQuery)
      .then((result) => {
        if (ignored) return;
        setResult({
          loading: false,
          items: result,
        });
      })
      .catch((err) => {
        if (ignored) return;
        setResult({
          loading: false,
          error: err,
        });
      });

    return () => {
      ignored = true;
    };
  }, debounceTime);

  const renderResult = () => {
    if (result?.loading) {
      return (
        <div className={"search__loader"}>
          <Loader />
        </div>
      );
    }

    if (result?.error) {
      return <div className={"search__message"}>{result.error}</div>;
    }

    if (!result?.items?.length) {
      return <div className={"search__message"}>No result!</div>;
    }

    return (
      <ul className={"search__list"}>
        {result.items.map((item) => (
          <li className={"search__item"} key={item}>
            <button onClick={() => onSelectItem(item)}>{item}</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="search">
      <input
        className="search__input"
        placeholder={placeholder}
        onChange={hangleChange}
      ></input>
      {!!result && <div className="search__result">{renderResult()}</div>}
    </div>
  );
  // Your code end here
};

export default Input;