import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Descriptions} from 'antd';

export default class CurrentWeather extends Component {
    
    render() {
        return (
            <Descriptions bordered>
                <Descriptions.Item label="地区">{this.props.city}</Descriptions.Item>
                <Descriptions.Item label="天气">{this.props.weather}</Descriptions.Item>
                <Descriptions.Item label="温度">{`${this.props.temperature}°C`}</Descriptions.Item>
                <Descriptions.Item label="湿度">{this.props.humidity}</Descriptions.Item>
                <Descriptions.Item label="风向">{this.props.winddirection}</Descriptions.Item>
                <Descriptions.Item label="风力">{`${this.props.windpower}级`}</Descriptions.Item>
                <Descriptions.Item label="天气获取时间" span={2}>
                {this.props.reporttime}
                </Descriptions.Item>
            </Descriptions>
        )
    }
}
