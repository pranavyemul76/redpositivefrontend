import React from "react";  
import '../Style/Home.css'
import axios from "axios";
import Userdata from "./Userdata";



class  Home extends React.Component{
constructor(props){
    super(props);
    this.state={
      username:'',
      email:"",
       phone:"",
       hobbies:"", 
       useremail:'',
      
     }
    this.onlyNumberKey= this.onlyNumberKey.bind(this);
    this.handleemail= this.handleemail.bind(this);
    this.handlehobbies= this.handlehobbies.bind(this);
    this.handleusername= this.handleusername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      url:"https://forbackend.herokuapp.com/userpost",
     method:"POST",
      data:{
      username:this.state.username,
      phone:this.state.phone,
      email:this.state.email,
      hobbies:this.state.hobbies,
       }
    })
  .then(res=>{
       this.props.history.push('/');
       alert(res.data.messeage);
    }) 
   
    
}

render(){
    const {phone}= this.state;
    return(
        <div>
       
       <button type="button" style={{margin:'20px'}} class="btn " data-toggle="modal" data-target="#exampleModal">
         ADD
        </button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="center">
        <form onSubmit={this.handleSubmit} >
      <div className="user_input">
          <input type="text" required placeholder="Name" onChange={this.handleusername}/>
         
        </div>
        <div className="user_input">
          <input type="text" required minLength="10" name='telephone' maxLength="10" value={phone} placeholder="Mobile NO" onChange={this.onlyNumberKey}/>
         
        </div>
        <div className="user_input">
          <input type="email" required placeholder="Email" name="email" onChange={this.handleemail}/>
         
        </div>
      <div className="user_input">
          <input type="text" required placeholder="Hobbies" onChange={this.handlehobbies}/>
         
        </div>
        <div style={{color:"red",textAlign:'center'}}>
        <input type="submit" value="Save" />

        </div>
      
      </form>
    </div>
  
   
    </div>
  </div>
</div>
<Userdata/>
        </div>
    )
}

}
export default Home;