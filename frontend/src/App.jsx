import {Navigate, Route, Routes} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import PageLoader from "./component/pageLoader.jsx";
import {Toaster} from "react-hot-toast"
const App = () => {

  const {authUser , isCheckingAuth , checkAuth} = useAuthStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth) return <PageLoader/>
  console.log({ "this is authUser:" :authUser })

  return (
    <>
    <div className="min-h-screen bg-slate-800 relative flex justify-center items-center p-4 overflow-hidden text-white">

     <Routes>
      <Route path="/" element={authUser? <ChatPage/> : <Navigate to="/login"/>}/>
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
      <Route path="/signup" element={!authUser  ? <SignUpPage/> : <Navigate to="/"/>}/>
     </Routes>

     <Toaster/>
    </div>
    </>
  )
}

export default App