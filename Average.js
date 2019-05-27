import React,{Component} from 'react';
class Average extends Component{
  constructor(){
    super();
    this.state = {
      p : 50,
      c:60,
      m:80,
      h:90,
      e:90,
      a:0
    }
  }
average =() => {
  this.setState({a : (this.state.p + this.state.c + this.state.m +this.state.h + this.state.e)/5 });
}

render(){
  return(
    <div>
      <p>
        <h2>Phycs: {this.state.p}</h2> 
        <h2>Phycs: {this.state.c}</h2> 
        <h2>Phycs: {this.state.m}</h2> 
        <h2>Phycs: {this.state.h}</h2> 
        <h2>Phycs: {this.state.e}</h2> 
      </p>
      <button onClick={this.average} >Average</button>
    </div>
  )
  
}
}
export default Average