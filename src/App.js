/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useRef, useEffect}from 'react'
import Axios from 'axios'
import './App.css';
import StudentCard from './Components/StudentCard'


function App() {
  const searchInput = useRef()
  const tagInput = useRef()
  const [students, setStudents] = useState([])
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
  function handleSearchInputChange(){
    let searchedList = students.filter((item) =>{
        if(tagInput.current.value.toLowerCase() !== ''){
          if(item.tags){
            for(let i = 0; i<item.tags.length; i++){
              if(
                item.tags[i].toLowerCase().includes(tagInput.current.value.toLowerCase())&&
                (item.firstName.toLowerCase().includes(searchInput.current.value.toLowerCase())||
                item.lastName.toLowerCase().includes(searchInput.current.value.toLowerCase()))
              ){
                return true
              }
            }
          }else{
            return false
          }
      
        }else{
          return(
            item.firstName.toLowerCase().includes(searchInput.current.value.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchInput.current.value.toLowerCase())
          )
        }

    })
    setSearchedStudent(searchedList)
  }


  // // search by tag 
  // function handleTagSearchInput(){
  //   let searchedList = students.filter((item) => {
  //     if(tagInput.current.value.toLowerCase() !==''){
       

  //     }else{
  //       return students
  //     }
      
  //   })
  //   setSearchedStudent(searchedList)


  //   if(searchedStudent===students){
  //     console.log('same')
  //   }



  // }





  return (
    <div className='mainContainer'>

      <input className='searchInput' ref={searchInput} placeholder='Search by name' 
        onChange={handleSearchInputChange}
      />

      <input classNAme='searchInput' ref={tagInput} placeholder='Search by tag' 
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
