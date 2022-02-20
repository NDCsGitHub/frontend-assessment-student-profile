

export default function getAverageGrade(gradeArray) {

    let gradeNumber = gradeArray.map(i=>Number(i))
    let average = gradeNumber.reduce((accumulator, currentValue) => {
      return accumulator+currentValue
    })
    return average/gradeArray.length
}
