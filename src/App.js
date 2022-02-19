/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect}from 'react'
import Axios from 'axios'
import './App.css';
import {Card} from 'react-bootstrap'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch student data and store it in state
  useEffect(()=>{
    async function fetchStudentData(){
      try{
        const res = await Axios.get('https://api.hatchways.io/assessment/students')
        setStudents(res.data.students)
        setLoading(false)
        console.log(students)
      }catch(err){
        console.log(err)
      }
    }
    fetchStudentData()
  },[])


  // calculate Average Score
  function getAverageGrade(gradeArray){
    let gradeNumber = gradeArray.map(i=>Number(i))
    let average = gradeNumber.reduce((accumulator, currentValue) => {
      return accumulator+currentValue
    })
    return average/gradeArray.length
  }


  return (
    <div className='mainContainer'>
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
