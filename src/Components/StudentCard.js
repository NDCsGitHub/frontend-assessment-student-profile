import React, {useState}from 'react'
import {Card} from 'react-bootstrap'
import getAverageGrade from '../utils/getAverageGrade'
import Tags from './Tags'

export default function StudentCard({student, allStudent, index}) {
  

    // state and function for expand
    const [expand, setExpand] = useState(false)
    const toggleExpand = (e)=>{
        e.preventDefault()
        setExpand(!expand)
      }

    
  return (
      <Card className='studentCardContainer'>
        <Card.Img className='studentImg' src={student.pic} ></Card.Img>

        <div className='nameContainer'>

          <div className='firstName'>{(student.firstName+" "+student.lastName).toUpperCase()}</div> 
          <button className='expandButton' onClick={(e)=>toggleExpand(e)}>
          {expand? <span className='buttonSign'>&#x2796;</span> : <span className='buttonSign'>&#x2795;</span> }
          </button>


          <div className='detailContainer'>
              <div>Email: {student.email}</div>
              <div>Company: {student.company}</div>
              <div>Skill: {student.skill}</div>
              <div>Average: {getAverageGrade(student.grades)}%</div>
          </div>



          {expand?(
            <div className='expandDetail'>{
              student.grades.map((grade) => {
                return (
                  <div className='gradeContainer'>
                    <div>Test{student.grades.indexOf(grade) + 1}:</div>
                    <div className='grades'>{grade}%</div>
                  </div>
                )
              })
            }</div> 
          ):(
            null
          )}
 


          <div className='tagsInputContainer'>
            <Tags allStudent={allStudent} student={student} index={index} />
          </div>




        </div>

      </Card>
  ) 
}
