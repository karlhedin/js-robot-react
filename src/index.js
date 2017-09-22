import React from 'react';
import ReactDOM from 'react-dom';
import RoomForm from './RoomForm';
import registerServiceWorker from './registerServiceWorker';
import {Model} from "./model"

ReactDOM.render(<RoomForm model={new Model()}/>, document.getElementById('root'));

registerServiceWorker();
