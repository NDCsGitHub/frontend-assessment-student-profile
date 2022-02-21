/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'

export default function Tags({student, allStudents, index}) {


  // keydown event enter for tag
  const [tags, setTags]=useState([])
  const [tagName, setTagName]=useState('')

  function handleKeyDown(e){
    if (e.key === 'Enter'){
        setTags([...tags, e.target.value])
        // eachStudent['tags'] = tags
        // console.log(eachStudent)

        if(student.tags){
          student['tags']=[...student.tags, e.target.value]
        }else{
          student['tags'] = [e.target.value]
        }
        setTagName('')
    }
  }


  useEffect(()=>{
    // console.log(student.tags)
    // console.log(allStudents)
  },[tags])

  function onChangeTagName(e){
    setTagName(e.target.value)
  }



  return (
    <div>
        <div className='tagContainer'>
          {student.tags? (
            <>
             {student.tags.map((tag, index) => 
              <div className='tags'>{tag}</div>
            )}
            </>
          ):(
            <>
              {tags.map((tag, index) => 
                <div className='tags'>{tag}</div>
              )}
            </>
          )
          }
         
        </div>
        <input className='searchInputTag' value={tagName} placeholder='Add a tag' onChange={onChangeTagName} onKeyPress={(e)=>handleKeyDown(e)}/>
    </div>
  )
}
