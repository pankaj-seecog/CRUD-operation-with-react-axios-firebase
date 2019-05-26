import React,{Component} from 'react';

class Button extends Component{
  first()
  {
    alert("This is first");
  }

  second()
  {
    alert("This is second");
  }

  third()
  {
    alert("This is third");
  }
  render(){
    return(
      <div>
      <button onClick={this.first}>Button1</button>
      <button onClick={this.second}>Button2</button>
      <button onClick={this.third}>Button3</button>
      </div>
    )
  }
}
export default Button;