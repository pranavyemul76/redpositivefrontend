import React from "react";
import { Route, BrowserRouter}  from "react-router-dom";
import Home from "./Components/Home";
import Userdata from "./Components/Userdata";

const Router =()=>{
return(
<BrowserRouter>

<Route  exact path='/' component={Home} />
<Route path ="/userdata" component={Userdata}/>

</BrowserRouter>
)


}
export default Router;