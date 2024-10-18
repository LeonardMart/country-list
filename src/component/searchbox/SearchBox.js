import clsx from "clsx";
import SearchIcon from "../../assets/icon/search-icon";
import CloseIcon from "../../assets/icon/close-icon";

const SearchBox = ({
  value,
  name,
  onChange,
  onClear,
  placeHolder = "Search...",
  className,
}) => {
  return (
    <div className="flex flex-row items-center bg-gray-200 rounded-md px-3 py-2 space-x-1">
      {onClear && value !== "" ? (
        <CloseIcon
          onClick={onClear}
          role="button"
          onKeyDown={() => {}}
          tabIndex={-1}
          className=" text-gray-700 h-4 w-4 -mb-0.5" 
        />
      ) : (
        <SearchIcon className=" text-gray-400 h-4 w-4" />
      )}
      <input
        className={clsx(
          "w-full border-none h-fit bg-gray-200 font-semibold items-center text-gray-700 placeholder-gray-400 outline-none placeholder:font-semibold",
          className
        )}
        id={name}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
