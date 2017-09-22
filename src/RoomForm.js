import React from 'react';
import './RoomForm.css';
import {Rectangle, Circle, Model} from "./model"
import CurrentRoom from './CurrentRoom';

export default class RoomForm extends React.Component {
  constructor(props) {
    super(props);

    // Default startState
    this.state = {
      currentModel: this.props.model,
      roomType: "rectangle",
      width: 5,
      height: 5,
      radius: 10,
      startX: 1,
      startY: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = event.target.type === "number" ? parseInt(target.value, 10) : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.roomType === 'rectangle') {
      const rectangle = new Rectangle(this.state.width, this.state.height);
      const model = new Model(rectangle, this.state.startX, this.state.startY);
      this.setState({currentModel: model});
    } else if (this.state.roomType === 'circle') {
      const circle = new Circle(this.state.radius);
      const model = new Model(circle, this.state.startX, this.state.startY);
      this.setState({currentModel: model});
    }

  }


  render() {
    return (
      <div className="room-form wrap">
        <form onSubmit={this.handleSubmit}>

          <div className="form-section">
            <div className="form-group">
              <label>
                Select room type:
                <select
                  name="roomType"
                  value={this.state.roomType}
                  onChange={this.handleInputChange}>
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                </select>
              </label>
            </div>

            <div className={this.state.roomType === "rectangle" ? "": "hide"}>
              <div className="form-group">
                <label>
                  Width:
                  <input
                    name="width"
                    type="number"
                    value={this.state.width}
                    onChange={this.handleInputChange}/>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Height:
                  <input
                    name="height"
                    type="number"
                    value={this.state.height}
                    onChange={this.handleInputChange}/>
                </label>
              </div>
            </div>

            <div className={this.state.roomType === "circle" ? "": "hide"}>
              <div className="form-group">
                <label>
                  Radius:
                  <input
                    name="radius"
                    type="number"
                    value={this.state.radius}
                    onChange={this.handleInputChange}/>
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              Start x:
              <input
                name="startX"
                type="number"
                value={this.state.startX}
                onChange={this.handleInputChange}/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Start y:
              <input
                name="startY"
                type="number"
                value={this.state.startY}
                onChange={this.handleInputChange}/>
            </label>
          </div>
          <input type="submit" value="Create room" />
          <hr/>
        </form>
        <div>
          <CurrentRoom model={this.state.currentModel}/>
        </div>
      </div>
    );
  }
}