import React, {useState}from 'react'
import {Card} from 'react-bootstrap'
import getAverageGrade from '../utils/getAverageGrade'


export default function StudentCard({student}) {

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

          <div>
            {expand? (
              <h1>hello</h1> 
            ):(
              null
            )}
          </div>
        

        </div>

    </Card>
  )
}
