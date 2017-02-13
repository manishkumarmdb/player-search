import React, { Component } from 'react';
import superagent from 'superagent';
import Slider from 'react-slick';
import {settings, imageStyle, containerStyle, inputStyle} from './styles';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      message: null,
        body: null
    };
    this.onChange = this.onChange.bind(this);
  }

    onChange(event) {
        const self = this;
        const text = event.target.value;
        //console.log('text is ',text);
        superagent
            .get('/getBody/'+text)
            .end((err, res) => {
                //console.log('res is ', res);
                if(res && res.body && res.body.length === 1) {
                    self.setState({body: res.body[0]});
                }
                //console.log('body is ', res.body);
            });
    }


  render() {

    const {error, message, body} = this.state;
    const {onChange} = this;
    let slider = <h2>No player to show!!!</h2>;
    if(body) {
        //console.log('body is ', body);
        slider = <div>
            <div style={{display: 'inline'}}>
                <p><span style={{color: 'red', marginRight: 40}}>Name:</span> {body.name}</p>
                <p><span style={{color: 'red', marginRight: 27}}>Country:</span> {body.country}</p>
                <p><span style={{color: 'red', marginRight: 40}}>Sports:</span> {body.sports}</p>
            </div>
            <div style={{display: 'inline'}}>
                <Slider {...settings}>
                    {body.imageURL.map(image => <div><img style={imageStyle} src={image}/></div>)}
                </Slider>
            </div>
        </div>
    }

    return (
        <div className='container' style={containerStyle}>
            <input placeholder="Enter a player's name" style={inputStyle} type="text" onChange={onChange}/>
            {slider}
        </div>
    );
  }
}
