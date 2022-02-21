/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Axios from 'axios'
import './App.css';
import StudentCard from './Components/StudentCard'


function App() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [searchedStudent, setSearchedStudent] =useState([])


  // fetch student data and store it in state
  useEffect(()=>{
    async function fetchStudentData(){
      try{
        const res = await Axios.get('https://api.hatchways.io/assessment/students')
        setStudents(res.data.students)
        setSearchedStudent(res.data.students)
      }catch(err){
        console.log(err)
      }
    }
    fetchStudentData()
  },[])


  // search student first and last name
  function handleSearchInputChange(e){
    e.preventDefault()
    let searchTerm = e.target.value.toLowerCase();
    let searchedList = students.filter((item) => 
      item.firstName.toLowerCase().includes(searchTerm) ||
      item.lastName.toLowerCase().includes(searchTerm)
    )
    setSearchedStudent(searchedList)
  }

  // function searchStudentFilter(){
  //   if(search !==""){
  //     return students.filter((student) => {
  //       return student.firstName.toLowerCase().startsWith(search) || student.lastName.toLowerCase().startsWith(search)
  //     })
  //   }else{
  //     return students
  //   }
  // }




  return (
    <div className='mainContainer'>

      <input className='searchInput' placeholder='Search by name' 
        onChange={handleSearchInputChange}
      />

      {searchedStudent.map((student, index) => {
        return(
          <StudentCard key={student.id} student={student} allStudents={students} index={index} />
        )
      })}

    </div>
  )
}

export default App;
