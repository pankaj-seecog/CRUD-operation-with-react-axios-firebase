import React,{Component} from 'react';
import axios from 'axios';
class Employee extends Component{

constructor(){
  super();
  this.state = {
emps : [],
name : "",
dept : ""
  }
  
}

componentWillMount(){
this.getRecords();
}

getRecords=()=>{
  axios.get("https://my-test-project-38e69.firebaseio.com/employees.json").then((res)=>{


let keys = Object.keys(res.data);
let empList = keys.map((key)=>{
  return {
    key : key,
    record : res.data[key]
  }
})
console.log('The list is ',empList)
this.setState({
  emps : empList
})
  })
  .catch((err)=>{
    console.log('The error is ',err);
  })
}

clearField = ()=>{

  this.setState({
    name : "",
    dept : ""
  })
}

saveRecord=()=>{
console.log('Saving record.. ',this.state);
axios.post("https://my-test-project-38e69.firebaseio.com/employees.json",{name :this.state.name,dept : this.state.dept}).then((res)=>{
console.log('The save res is ',res.data.data);
this.getRecords();
// this.clearField();
})
.catch((err)=>{
  console.log('The error is ',err);
})
}

delRecord =(key)=>{
axios.delete("https://my-test-project-38e69.firebaseio.com/employees/"+key+".json").then((res)=>{
console.log('Record deleted');
this.getRecords();
// this.clearField();
})
.catch((err)=>{
  console.log('The error is ',err);
})
}


render(){
  return (//JUSX Template
    <div>
<p>
Name : <input onChange={(evt)=>this.setState({name : evt.target.value})} />
</p>
<p>
Department : <input onChange={(evt)=>this.setState({dept : evt.target.value})}/>
</p>
<p>
<button onClick={()=>this.saveRecord()}>Save</button>
</p>
<hr/>
<table >
<th>Name</th><th>Department</th><th>Action</th>
{
this.state.emps.map((emp)=>{
  return (
    <tr>
<td>{emp.record.name}</td>
<td>{emp.record.dept}</td>
<td>
<button onClick={()=>this.delRecord(emp.key)}>Del</button>
</td>
    </tr>
  )
})

}
</table>
    </div>
  )
}

}

export default Employee;




