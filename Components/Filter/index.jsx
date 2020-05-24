import {useCallback} from 'react';

export default ({options, title, handleFilterChange, isRadioType, values}) => {
  const onCheckBoxChange = useCallback((event) => {
    handleFilterChange({
      type: isRadioType ? 'replace' : event.target.checked ? 'add' : 'remove',
      data: event.target.value,
    });
  });

  return (
    <div className="filter">
      <h3 className="title">{title}</h3>
      {options.map((option) => {
        return (
          <label className="container" htmlFor={option} key={option}>
            {option}
            <input
              type="checkbox"
              className="checkbox"
              id={option}
              name={option}
              value={option}
              checked={values.indexOf(option) !== -1}
              onChange={onCheckBoxChange}
            />
            <span className="checkmark"></span>
          </label>
        );
      })}
      <style jsx>{`
        .filter {
          display: flex;
          flex-direction: column;
          padding-left: 27px;
          padding-right: 27px;
          flex: 1;
        }

        .title {
          font-size: 24px;
        }
        .container {
          display: flex;
          flex: 1;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 22px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 25px;
          width: 25px;
          background-color: #eee;
        }

        .container:hover .checkbox ~ .checkmark {
          background-color: #ccc;
        }

        .container .checkbox:checked ~ .checkmark {
          background-color: #2196f3;
        }

        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }

        .container .checkbox:checked ~ .checkmark:after {
          display: block;
        }

        .container .checkmark:after {
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        @media only screen and (min-width: 768px) {
          .filter {
            border-bottom: 1px solid #edebef;
            border-top: 1px solid #edebef;
            flex: none;
          }
          .filter:last-child {
            border-bottom: 2px solid #edebef;
          }
          .filter:first-child {
            border-top: 2px solid #edebef;
          }
        }
      `}</style>
    </div>
  );
};
