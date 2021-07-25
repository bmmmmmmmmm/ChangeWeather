import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
import CurrentWeather from './components/CurrentWeather'
import ChangeWeather from './components/ChangeWeather'
import ChooseCity from './components/ChooseCity'
import False from './components/False'

export default class App extends Component {

  state = {
    checked: 0,
    country: "中国",
    province: "重庆市",
    city: "沙坪坝区",
    weather: "晴",
    temperature: "35",
    winddirection: "西",
    windpower: "≤3",
    humidity: "50",
    reporttime: "2021-07-13 17:03:50"
  }

  data = {
    IP: 0,
    location: "0",
    city: "0",
  }

  // 获取经纬度（VPN）
  test = ()=> {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log('经度: ' + crd.longitude);
      console.log('纬度 : ' + crd.latitude);
      console.log(crd);
      console.log('More or less ' + crd.accuracy + ' meters.');
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      alert('err')
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  
  // 查找
  onChange = value => {
    if(value != "")
      this.getWeather(value);
    else this.autoGet();
  }

  // 返回
  onReturn = ()=> this.setState({checked: 0});

  // 温度调节
  componentDidMount = ()=> {
      this.ChangeWeather = PubSub.subscribe('temperature', (_,temperature)=>{
          this.setState({temperature:temperature});
      })
  }

  // 请求天气数据
  getWeather = (city)=> {
    axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=dded86ede2d404ae10310257acf49cea`).then(
      response => {
        if(response.data.count!=0){
          if(response.data.lives[0].city){
          // console.log(this);
            this.setState({
              checked: 1,
              province: response.data.lives[0].province,
              city: response.data.lives[0].city,
              weather: response.data.lives[0].weather,
              temperature: response.data.lives[0].temperature,
              winddirection: response.data.lives[0].winddirection,
              windpower: response.data.lives[0].windpower,
              humidity: response.data.lives[0].humidity,
              reporttime: response.data.lives[0].reporttime
            })
          }
          else this.setState({checked: 2})
        }
        else this.setState({checked: 2})
      },error => console.log(error)
    )
  }

  // 获取IP
  getIP = ()=> {
    axios.get('https://api.ipify.org/').then(
      response => console.log(response.data),
      error => console.log(error)
    )
  }

  // 获取经纬度
  getLocation = (IP)=> {
    axios.get(`http://restapi.amap.com/v5/ip?key=dded86ede2d404ae10310257acf49cea&type=4&ip=${IP}`).then(
      response => {
        console.log(response.data.location);
      },error => console.log(error)
    )
  }

  // 获取城市
  getCity = (IP)=> {
    axios.get(`http://restapi.amap.com/v5/ip?key=dded86ede2d404ae10310257acf49cea&type=4&ip=${IP}`).then(
      response => {
        console.log(response);
      },error => console.log(error)
    )
  }

  // 自动获取
  autoGet = ()=> {
    // 获取IP
    axios.get('https://api.ipify.org/').then(
      response => {
        // 获取城市
        axios.get(`http://restapi.amap.com/v5/ip?key=dded86ede2d404ae10310257acf49cea&type=4&ip=${response.data}`).then(
          response => {
            if(response.data.district!="")
              this.getWeather(response.data.district);
            else this.getWeather(response.data.city);
          },error => console.log(error)
        )
      },error => console.log(error)
    )
  }

  render() {
    return (
      <div>
        {/* <TopBar/> */}
        {
          this.state.checked===0?
          <div>
            <br/>
            <br/>
            <h3 style={{textAlign: 'center'}}>超级无敌天气更改器</h3>
            <br/>
            <ChooseCity onChange={this.onChange}/>
          </div>:this.state.checked===1?
          <div>
            <br/>
            <br/>
            <h3 style={{textAlign: 'center'}}>超级无敌天气更改器</h3>
            <CurrentWeather {...this.state}/>
            <ChangeWeather {...this.state} onReturn={this.onReturn} />
          </div>:
          <div>
            <False onReturn={this.onReturn} />
          </div>
        }
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}
