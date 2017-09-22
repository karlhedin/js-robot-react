import React from 'react';

function PropertyList(props) {
  const roomType = props.room.constructor.name;
  if (roomType === "Rectangle") {
    return (
      <ul>
        <li>Rectangle</li>
        <li>Width: {props.room.width}</li>
        <li>Height: {props.room.height}</li>
      </ul>
    )
  } else {
    return (
      <ul>
        <li>Circle</li>
        <li>Radius: {props.room.radius}</li>
      </ul>
    )
  }
}

function StartPoint(props) {
  return (
    <ul>
      <li>Start x: {props.model.startX}</li>
      <li>Start y: {props.model.startY}</li>
    </ul>
  )
}

export default class CurrentRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCommand: '',
      currentPos: props.model.getRobotPosition()
    };

    this.handleCommandChange = this.handleCommandChange.bind(this);
  }

  handleCommandChange(event) {
    const enteredCommand = event.target.value.toUpperCase();
    // Validate legal commands
    if (/^[LRVHFG]*$/.test(enteredCommand)){
      const resultPos = this.props.model.performCommands(enteredCommand);
      this.setState({currentCommand: enteredCommand, currentPos: resultPos});
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update current position if needed
    const resultPos = nextProps.model.getRobotPosition();
    if (resultPos !== this.state.currentPos){
      this.setState({currentPos: resultPos, currentCommand: ''});
    }
  }

  render() {
    return (
      <div>
        <form className="room-current-command">
          <div className="form-group">
            <label>
              Enter commands:
              <input type="text" value={this.state.currentCommand} onChange={this.handleCommandChange} />
            </label>
          </div>
        </form>
        <div className="room-current-parent">
          <div className="room-current info">
            <h3>Current room:</h3>
            <PropertyList room={this.props.model.room}/>
            <StartPoint model={this.props.model}/>
          </div>
          <div className="room-current">
            <h3>Current position:</h3>
            <div className="room-current-position">{this.state.currentPos}</div>
          </div>
        </div>
      </div>
    );
  }
}