import React,{Component} from 'react';
import axios from 'axios';
class Employee extends Component{

constructor(){
  super();
  this.state = {
emps : [],
name : "",
dept : "",
btn_stt : true,
update_id : ''
  }
  
}

updateRecord = ()=>{
  console.log('The update i is',this.state.update_id)
  axios.put("https://my-test-project-38e69.firebaseio.com/employees/"+this.state.update_id+".json",{
    
   name : this.state.name,
   dept : this.state.dept
  }).then((res)=>{
console.log('Recored updated')
  })
  .catch((err)=>{
    console.log('The error  is ',err)
  })
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

editRecord = (data)=>{
this.setState({
  name : data.record.name,
  dept : data.record.dept,
  btn_stt : false,
  update_id : data.key
})
}

render(){
  return (//JUSX Template
    <div>
<p>
Name : <input value={this.state.name} onChange={(evt)=>this.setState({name : evt.target.value})} />
</p>
<p>
Department : <input value={this.state.dept} onChange={(evt)=>this.setState({dept : evt.target.value})}/>
</p>
<p>
{
(this.state.btn_stt==true)? <button onClick={()=>this.saveRecord()}>Save</button> : <button onClick={()=>this.updateRecord()}>Update</button>


}
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

<button onClick={()=>this.editRecord(emp)}>Edit</button> | 


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




