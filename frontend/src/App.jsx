import {Route, Routes} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <>
    <div className="min-h-screen bg-slate-800 relative flex justify-center items-center p-4 overflow-hidden text-white">

     <Routes>
      <Route path="/" element={<ChatPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
     </Routes>
    </div>
    </>
  )
}

export default App