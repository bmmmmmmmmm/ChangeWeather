import React, { Component } from 'react'
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;



// const onSearch = value => console.log(value);

export default class ChooseCity extends Component {
    render() {
        return (
            <div>
                 <Search
                    placeholder="输入城市"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => this.props.onChange(value)}
                />
            </div>
        )
    }
}
