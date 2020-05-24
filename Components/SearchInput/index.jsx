import {useCallback, useRef} from 'react';

export default ({title, onSearch}) => {
  const intervalRef = useRef();
  let searchChar = useCallback((e) => {
    let value = e.target.value;
    clearTimeout(intervalRef.current);
    intervalRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  });

  return (
    <>
      <div className="inline-flex-column search-input">
        <input type="text" className="input" placeholder={title} onChange={searchChar} />
      </div>
      <style jsx>{`
        .search-input {
        }
        .search-label {
          padding: 10px;
          font-size: 24px;
        }
        .input {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 0.15rem 0.25rem;
          font-size: 24px;
          padding: 10px;
          padding-left: 18px;
        }
      `}</style>
    </>
  );
};
