import axios from "axios";
import React from "react";




class Userdata extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userdata:[],
            updateData:[],
            username:'',
            email:"",
             phone:"",
             hobbies:"",
             id:""

        }
       this.handledelete= this.handledelete.bind(this)
       this.handleupdate= this.handleupdate.bind(this);
       this.onlyNumberKey= this.onlyNumberKey.bind(this);
       this.handleemail= this.handleemail.bind(this);
      this.handlehobbies= this.handlehobbies.bind(this);
      this.handleusername= this.handleusername.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleupdate=(item)=>{
      this.setState({updateData:[item],_id:item._id,username:item.username,phone:item.phone,email:item.email,hobbies:item.hobbies});
}
    handleemail(event){
      this.setState({email:event.target.value})
    }
  
    handlehobbies(event){
      this.setState({hobbies:event.target.value})
    }
    handleusername(event){
      this.setState({username:event.target.value})
    }
     
    onlyNumberKey(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({phone: e.target.value})
        }
     }
     handleSubmit(event) {
      alert('A name was submitted: ');
       event.preventDefault();
      
      axios({
        url:"https://forbackend.herokuapp.com/userupdate",
       method:"PUT",
     
       data:{
        id:this.state._id,
        username:this.state.username,
        phone:this.state.phone,
        email:this.state.email,
        hobbies:this.state.hobbies,
      }
    })
    .then(res=>{alert(res.data.messeage)}) 
    
}
  
  
    componentDidMount(){
      
        axios(
            {
              url:`https://forbackend.herokuapp.com/userget`,
              method:"GET",
              header:{'content-type':'application/json'},
      
            }) 
          .then(res=>{
            this.setState({userdata:res.data.user})
           })
         
    }
   
        handledelete=(email_id)=>{
       const veer= email_id;
       console.log(veer);
       axios({
       url:`https://forbackend.herokuapp.com/deletedata/${veer}`,
       method:"DELETE",
        })
        .then(res=>{alert(res.data.messeage)})
      }
  
         

    render(){
        const {userdata,updateData}= this.state;
        
        return(
           
         <div>
           <div class="modal fade" id="exampleModalOne" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div class="modal-dialog" role="document">
            <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="center">
     {
    updateData.map((item)=>{ return <div>
           <form onSubmit={this.handleSubmit} >
            <div className="user_input">
     <input type="text" required placeholder="Name" defaultValue={item.username} onChange={this.handleusername}/>
    
   </div>
   <div className="user_input">
     <input type="text" required minLength="10" name='telephone' maxLength="10" 
    defaultValue={item.phone} placeholder="Mobile NO" onChange={this.onlyNumberKey}/>
    
   </div>
   <div className="user_input">
     <input type="email" required placeholder="Email" name="email" defaultValue={item.email}onChange={this.handleemail}/>
    
   </div>
  <div className="user_input">
     <input type="text" required defaultValue={item.hobbies} placeholder="Hobbies" onChange={this.handlehobbies}/>
    
   </div>
   <div style={{color:"red",textAlign:'center'}}>
   <input type="submit" value="Update"/>

   </div>
   </form>
         </div>
   })
        }
  </div>
</div>
  </div>
</div>

<table class="table">
  <thead class="thead-dark">
    <tr>
    <th scope="col">select</th>
      <th scope="col"> #</th>
      <th scope="col"> name</th>
      <th scope="col">phone</th>
      <th scope="col">email</th>
      <th scope="col">Hobbies</th>
      <th scope="col"> Actions</th>
    
    </tr>
  </thead>
  <tbody>
    
    
 
      {
          userdata.map((item,index)=>{
                    
            return    <tr>
               <td><input type="checkbox" /></td>
               <td> {index+1}</td>
                <td> {item.username}</td>
                <td> {item.phone}</td>
                <td> {item.email}</td>
                <td> {item.hobbies}</td>
                <td> <button className="btn" onClick={()=>{this.sendmail(item)}}> Send </button>
                <button type="button" style={{margin:'4px'}} class="btn "  data-toggle="modal" data-target="#exampleModalOne" onClick={()=>{this.handleupdate(item)}}>
                   Update
                 </button>
                 <button className="btn" onClick={()=>{this.handledelete(item.email)}}> Delete </button>
                </td>
           
                  </tr>
          })

      }
   
    
  </tbody>
</table>

         </div>      
          
        )
        }
  
}
export default Userdata