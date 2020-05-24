import React from 'react';
import moment from 'moment';
import {Card} from './style';

export default ({data: {id, name, created, image, status, species, gender, origin, location}}) => {
  return (
    <>
      <Card>
        <img src={image} alt="" className="image" />
        <div className="info-container">
          <div className="name-row">
            <div className="name">{name}</div>
            <div className="subName">
              <div className="id">ID: {id}</div>
              <div className="created">- Created {moment(new Date(created)).fromNow()}</div>
            </div>
          </div>
          <div className="info-row">
            <div className="field">Status</div>
            <div className="value">{status}</div>
          </div>
          <div className="info-row">
            <div className="field">Species</div>
            <div className="value">{species}</div>
          </div>
          <div className="info-row">
            <div className="field">Gender</div>
            <div className="value">{gender}</div>
          </div>
          <div className="info-row">
            <div className="field">ORIGIN</div>
            <div className="value">{origin.name}</div>
          </div>
          <div className="info-row">
            <div className="field">LAST LOCATION</div>
            <div className="value">{location.name}</div>
          </div>
        </div>
      </Card>
      <style jsx>{`
        .image {
          width: 100%;
          border-radius: 12px;
        }
        .info-container {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          font-size: 14px;
          white-space: no-wrap;
          overflow: visible;
        }
        .name-row {
          position: absolute;
          transform: translateY(-100%);
          background-color: rgba(0, 0, 0, 0.3);
          left: 0;
          right: 0;
          padding: 10px;
        }
        .subName {
          display: flex;
        }
        .info-row {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding: 10px;
        }
        .name {
          color: white;
          font-size: 24px;
        }
        .value {
          color: #a66719;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .field {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
};
