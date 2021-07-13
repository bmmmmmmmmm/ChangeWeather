import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
import CurrentWeather from './components/CurrentWeather'
import ChangeWeather from './components/ChangeWeather'

export default class App extends Component {

  state = {
    city: "重庆市-沙坪坝区",
    weather: "晴",
    temperature: "35",
    winddirection: "西",
    windpower: "≤3",
    humidity: "50",
    reporttime: "2021-07-13 17:03:50"
  }

  // 请求天气数据
  componentDidMount(){
      axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=500106&key=dded86ede2d404ae10310257acf49cea').then(
          response => {
              this.setState({
                  city: response.data.lives[0].city,
                  weather: response.data.lives[0].weather,
                  temperature: response.data.lives[0].temperature,
                  winddirection: response.data.lives[0].winddirection,
                  windpower: response.data.lives[0].windpower,
                  humidity: response.data.lives[0].humidity,
                  reporttime: response.data.lives[0].reporttime
              })
          },error => console.log(error)
      )
      this.ChangeWeather = PubSub.subscribe('temperature', (_,temperature)=>{
          this.setState({temperature:temperature});
      })
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <h3 style={{textAlign: 'center'}}>超级无敌天气更改器</h3>
        <CurrentWeather {...this.state}/>
        <ChangeWeather {...this.state}/>
      </div>
    )
  }
}
