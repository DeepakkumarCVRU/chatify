import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { TbMessageCircle } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import {Link} from "react-router-dom"
import { LoaderIcon } from "react-hot-toast";
import SignUpImage from "../assets/signup.png";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isSigningUp, signUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(formData);
    console.log(formData);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center p-4  bg-slate-900">
        <div className="relative  w-full max-w-6xl md:h-200 h-162.5 flex">
          {/* first part */}
          <div className="w-1/2 border-r">
            <div className="">
              {/* message image part */}
              <div className="flex flex-col gap-1 justify-center items-center">
                <TbMessageCircle size={50} />
                <h1>Create Account</h1>
                <p>singUp for new Account</p>
              </div>

              {/* form */}
              <div className="mt-10 border flex flex-col gap-4 items-center">
                <div>
                  <label className="auth-input-label">FullName</label>

                  <div className="relative">
                    <CiUser className="auth-input-icon" />
                    <input
                      type="text"
                      className="input"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="auth-input-label">Email</label>

                    <div className="relative">
                      <CiUser className="auth-input-icon" />
                      <input
                        type="text"
                        className="input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="auth-input-label">password</label>

                    <div className="relative">
                      <CiUser className="auth-input-icon" />
                      <input
                        type="password"
                        className="input"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                      <label className="auth-input-label">Confirm Password</label>

                      <div className="relative">
                        <CiUser className="auth-input-icon" />
                      <input 
                      type="text" 
                      className="input" 
                      value={formData.confirmPassword}
                      onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})}/>
                      </div>
                    </div>
                </div>
                <button className="auth-btn" onClick={handleSignUp} disabled={isSigningUp}>
                  {isSigningUp ? <LoaderIcon className="animate-spin" /> : "create account"}
                </button>
                <div className="mt-3 text-center">
                  <Link to="/login" className="auth-link">Allready have an account ? Login</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Form illustration - right side */}
          <div className="hidden md:w-1/2 md:flex justify-center items-center ">
            <div>
              <img src={SignUpImage} alt="" className="w-full h-auto object-contain" />
              <div className="mt-6 text-center">
                        <h3 className="text-xl font-medium text-cyan-500">Start your journey</h3>
                        <div className="mt-4 flex justify-center gap-4">
                          <span className="auth-badge">Free</span>
                          <span className="auth-badge">Private</span>
                          <span className="auth-badge">Easy Satup</span>
                        </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
