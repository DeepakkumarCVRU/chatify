import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { TbMessageCircle } from 'react-icons/tb';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';

const LoginPage = () => {

  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const { Login, isLoginIn } = useAuthStore();
  
    const handleLogin = (e) => {
      e.preventDefault();
      Login(formData);
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
                
                <button className="auth-btn" onClick={handleLogin} disabled={isLoginIn}>
                  {isLoginIn ? <LoaderIcon className="animate-spin" /> : "Login"}
                </button>
                <div className="mt-3 text-center">
                  <Link to="/signup" className="auth-link">You don't have account! SignUp</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage