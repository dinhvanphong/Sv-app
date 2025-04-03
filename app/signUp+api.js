import axios from "axios";


export  async function PATCH(req) {
  const { id, codeStudent, name } = await req.json();
  
  const response = await axios(`https://api.clerk.dev/v1/users/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ process.env.CLERK_SECRET_KEY}`,
    },
    body: {
      public_metadata: { masv: codeStudent , fullname: name},
    },
  })
  return Response.json(response.data)
}

// axios('/signUp',{
// me}
// )