import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import SignOut from "./pages/SignOut"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/signin" element={<SignIn/>}/>
<Route path="/signup" element={<SignUp/>}/>
<Route path="/signout" element={<SignOut/>}/>

</Routes>

</BrowserRouter>

)

}

export default App