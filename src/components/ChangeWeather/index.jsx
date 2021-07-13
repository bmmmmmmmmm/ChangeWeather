import React, { Component } from 'react'
import PubSub from 'pubsub-js';
import 'antd/dist/antd.css';
import { Slider } from 'antd';

const marks = {
    0: {
        style: {
          color: '#1890ff',
        },
        label: <strong>0°C</strong>,
      },
    16: '16°C',
    40: '40°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
};

export default class ChangeWeather extends Component {

    onChange = (value) => {
        // this.setState({
        //   inputValue: value
        // });
        PubSub.publish('temperature',value);
    };

    render() {
        return (
            <div>
                <br/>
                <br/>
                <h4>温度调节：</h4>
                <Slider marks={marks} included={false} onChange={this.onChange} defaultValue={this.props.temperature} />
            </div>
        )
    }
}
