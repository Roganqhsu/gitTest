import './App.css';
import { useState } from 'react'
// 引入axios
import Axios from 'axios'


function App() {

  const [name, setName] = useState('');

  const [age, setAge] = useState(0);

  const [country, setCountry] = useState('');

  const [position, setPosition] = useState('');
  // 
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([''])

  const [newWage, setNewWage] = useState(0)

  const [newName, setNewName] = useState('')

  const addEmployee = () => {
    Axios.post('http://localhost:3006/create'
      , {
        name: name,
        age: age,
        country: country,
        wage: wage,
      }
    ).then(
      (response) => {
        setEmployeeList([
          ...employeeList, {
            name: name,
            age: age,
            country: country,
            wage: wage
          }
        ])
      }
    )
  }
  const getEmployees = () => {
    Axios.get('http://localhost:3006/getEmployees').then((response) => {
      setEmployeeList(response.data)
      console.log(response.data);
    })
  }
  const update = (id) => {
    Axios.put('http://localhost:3006/update', { id: id, name: newName }).then(
      (response) => {
        setEmployeeList(
          employeeList.map(
            (val) => {
              return val.employeesid == id
                ? {
                  name: newName,
                  age: val.age,
                  country: val.country,
                  wage: val.wage
                } : val
            }
          )
        )


      }
    )
  }

  const deleteEmployees = (id) => {
    Axios.delete(`http://localhost:3006/delete/${id}`)
      .then((response) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.employeesid != id
          })
        )
      })
  }
  // console.log(newName);
  // 2209
  // 我跟github的都無法同步修改
  // 但教學影片可以
  // https://www.youtube.com/watch?v=AohARsUlwQk&t=835s
  return (
    <div className="App">
      <div className='information'>
        <label>Name</label>
        <input onChange={(e) => {
          setName(e.target.value)
          console.log(name);
        }}
          type='text' />
        <label>Age</label>
        <input onChange={(e) => {
          setAge(e.target.value)
          console.log(name);
        }} type='number' />
        <label>Country</label>
        <input onChange={(e) => {
          setCountry(e.target.value)
          console.log(name);
        }} type='text' />
        <label>Wage(year)</label>
        <input onChange={(e) => {
          setWage(e.target.value)
          console.log(name);
        }} type='number' />
        <div>
          <button onClick={addEmployee}>
            addEmployee</button>
          <br />
          <button onClick={getEmployees}>ShowEmployee</button>
          <br />
          <div>
            {/* name:{employeeList[1].name} */}
            {employeeList.map(
              (val, req) => {
                return (
                  <div>
                    id:{val.employeesid}
                    name:{val.name}
                    <input type="text" placeholder='newName' onChange={(e) => {
                      setNewName(e.target.value)
                    }} />
                    <button type='button' onClick={() => { update(val.employeesid) }}>
                      UPDATE
                    </button>
                    <button type='button' onClick={() => { deleteEmployees(val.employeesid) }}>Delete</button>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
