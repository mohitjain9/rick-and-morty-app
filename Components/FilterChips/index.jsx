import React, {useCallback} from 'react';
import {Heading} from './style';

export default ({filters = {}, removeFilter}) => {
  const onRemoveClick = useCallback((e) => {
    let {filter, value} = e.target.dataset;
    removeFilter(filter, value);
  });
  let chips = [];
  Object.keys(filters).forEach((filter) => {
    chips = chips.concat(
      Object.keys(filters[filter]).map((key) => {
        let val = filters[filter][key];
        return (
          <React.Fragment key={val}>
            <div className="chip">
              {filter[0].toUpperCase() + filter.slice(1)}:{val}
              <span className="close" data-filter={filter} data-value={val} onClick={onRemoveClick}>
                &times;
              </span>
            </div>
            <style jsx>{`
              .chip {
                display: inline-flex;
                padding-left: 25px;
                height: 50px;
                font-size: 16px;
                border-radius: 25px;
                background-color: #f1f1f1;
                align-items: center;
                margin-right: 10px;
                margin-top: 10px;
              }

              .close {
                cursor: pointer;
                padding: 0 16px;
              }

              @media only screen and (min-width: 768px) {
                .chip {
                  display: inline-flex;
                  padding-left: 25px;
                  height: 50px;
                  font-size: 16px;
                  border-radius: 25px;
                  background-color: #f1f1f1;
                  align-items: center;
                  margin-right: 10px;
                }
                .close {
                  cursor: pointer;
                  padding: 0 16px;
                }
              }
            `}</style>
          </React.Fragment>
        );
      })
    );
  });
  return (
    <>
      {!!chips.length && <Heading>Selected Filters</Heading>}
      <div className="flex filter-chips">
        {chips}
        <style jsx>{`
          .filter-chips {
            flex-wrap: wrap;
          }
        `}</style>
      </div>
    </>
  );
};
