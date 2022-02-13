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
    <>
      {students.map((student, index) => {
        return(
          <Card className='studentCardContainer' key={index}>
            <Card.Img className='studentImg' src={student.pic} ></Card.Img>

            <h3>{student.firstName} {student.lastName}</h3>

            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Average: {getAverageGrade(student.grades)}%</p>
          </Card>
        )
      })

      }
    </>
  )
}

export default App;
