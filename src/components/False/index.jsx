import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Button } from 'antd';

export default class False extends Component {
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h3>救命，你不会连城市名都能搞错吧</h3>
                <br/>
                <br/>
                <br/>
                <Button type="primary" block onClick={this.props.onReturn}>返回</Button>
            </div>
        )
    }
}
