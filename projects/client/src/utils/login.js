import axios from "axios"

export const LoginAccount = async(inputEmail,inputPassword, toogle)=>{
    console.log(inputEmail)
   
    
        let response = toogle==true?
         await axios.post('http://localhost:8000/admin/login', {email:inputEmail,password:inputPassword})
          :
          console.log('user') // taro disini buat API user
            console.log(response)
    
        if(!response) return null
        return{
            id:response.data.data.token,
            username:response.data.data.username
        }  
   
}