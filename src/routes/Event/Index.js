import React, { Component } from 'react';
import { connect } from 'dva';

@connect(state => ({
  event: state.event,
}))
export default class Event extends Component {
  render() {
    return (
      <div> Hello, Event</div>
    );
  }
}
