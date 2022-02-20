/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Axios from 'axios'
import './App.css';
import {Card} from 'react-bootstrap'
import getAverageGrade from './utils/getAverageGrade'

function App() {
  const [students, setStudents] = useState([])
  const [searchStudent, setSearchedStudent] = useState([])
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(true)

  // fetch student data and store it in state
  useEffect(()=>{
    async function fetchStudentData(){
      try{
        const res = await Axios.get('https://api.hatchways.io/assessment/students')
        setStudents(res.data.students)
        setSearchedStudent(res.data.students)
        setLoading(false)
        console.log(students)
      }catch(err){
        console.log(err)
      }
    }
    fetchStudentData()
  },[])

  // search and filter student
  function searchStudentFilter(){
    return students && search !== "" ? students.filter(student => student.firstName[0].startsWith(search.toLowerCase()) || student.lastName.startsWith(search.toLowerCase())) : students;
  }

  


  return (
    <div className='mainContainer'>
      <input className='searchInput' placeholder='Search by name' 
      onChange={(e)=>{
        setSearch(e.target.value)
      }}
      />
      
      {students.map((student, index) => {
        return(
          <Card className='studentCardContainer' key={index}>
            <Card.Img className='studentImg' src={student.pic} ></Card.Img>

            <div className='nameContainer'>
              <div className='firstName'>{(student.firstName+" "+student.lastName).toUpperCase()}</div>
              <div className='detailContainer'>
                <div>Email: {student.email}</div>
                <div>Company: {student.company}</div>
                <div>Skill: {student.skill}</div>
                <div>Average: {getAverageGrade(student.grades)}%</div>

              </div>
            </div>
          </Card>

        )
      })

      }
    </div>
  )
}

export default App;
