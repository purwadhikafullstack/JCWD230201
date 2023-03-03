import axios from "axios"
export const CheckLogin = async() =>{
        try{
                let getTokenId = localStorage.getItem('token')
                // console.log(getTokenId)
                
                let response =await axios.get(`http://localhost:8000/admin/keep-login?token=${getTokenId}`)
                // console.log(response)   
                if(!response || !getTokenId)return null    
               
                  
                return{
                        id:response.data.data.token,
                        username:response.data.data.username,
                        role:response.data.data.role,
                        warehouse:response.data.data.warehouse
                }
        }catch(error){
                console.log(error)
                return{
                        id:null,
                        username:null
                }
        }
       
}