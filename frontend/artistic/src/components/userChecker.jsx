import React,{useState,useEffect} from 'react'

function UserChecker() {
    const [check, setCheck] = useState({

    })
const UserLoader = async()=>{
  const response = await fetch("/users", {
    method: "GET",
  })
  const data = await response.json()
  setCheck(data)
  if(response.ok){
console.log(check.email)
    
  }  
}
  useEffect(() => {
    UserLoader()
  }, []);
  return (
    <>
   <div>
    </div>
    </>
  )
}

export default UserChecker