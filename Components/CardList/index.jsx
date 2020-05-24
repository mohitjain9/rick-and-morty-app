import React from 'react';
import Card from '../Card';

export default ({data}) => {
  if (!data.length) {
    return <div className="flex-center">No Result Found</div>;
  }
  return data.map((data) => <Card data={data} key={data.id} />);
};
