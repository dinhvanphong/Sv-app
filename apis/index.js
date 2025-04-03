import axios from 'axios'




export const signupAPI = async (codeStudent) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_SIGN_UP}${codeStudent}`)
  return response.data
}

export const verifySignupAPI = async (id, codeStudent, name) => {
  console.log(process.env.EXPO_PUBLIC_CLERK_SECRET_KEY)
  const response = await axios(`http://10.1.1.6:8081/signUp`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      id,codeStudent,name
    },
  })
  return response.data

}

export const getNewsHomeAPI = async () => {
  const response = await axios.get(`https://sv.hpu.edu.vn/api/article`)
  return response.data
}





// export const getCTDTAPI = async (msv) => {
//   const response = await axios.get(`${process.env.EXPO_PUBLIC_CTDT_API}${msv}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization : `Bearer ${await getToken({template: process.env.EXPO_PUBLIC_EDUMNG_TEMPLATE})}`
//     }
//   })
//   return response.data
// }

//Lấy chương trình đào tạo
export const getCTDTAPI = async (msv, token) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_CTDT_API}${msv}`, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`
    }
  })
  return response.data
}

// Lấy điểm toàn khoá của sinh viên
export const getAllScoreStudentAPI = async (msv, token) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_GET_ALL_SCORE_STUDENT_API}${msv}`, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`
    }
  })
  return response.data
}

// Lấy điểm học kỳ của sinh viên
export const getSemesterStudentAPI = async (msv, hocky ,namhoc, token) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_GET_SCORE_STUDENT_CURRENT_SEMESTER_API}${msv}/${hocky}/${namhoc}`, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`
    }
  })
  return response.data
}

export const getAVG_API = async (msv, token) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_AVG_API}${msv}`, {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`
    }
  })
  return response.data
}