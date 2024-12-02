import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import useAuthStore from 'Store/authStore'
import { apiService } from 'middleware/ApiServices'
interface LoginValues {
  emailAddress: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const loginValue = useFormik<LoginValues>({
    initialValues: {
      emailAddress: '',
      password: '',
    },

    onSubmit: async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiService.userLogin(loginValue.values)
        console.log(response)

        if (response.status_code === '0') {
          const loginUser = response.user_detail
          const { email_address, firstname, lastname } = loginUser

          login({
            email_address,
            firstname,
            lastname,
            isAuthenticated: +response.status_code === 0,
          })
          toast.success(response.message)
          navigate('/')
        } else {
          toast.error(response.message)
        }
        setLoading(false)
      } catch (error: any) {
        console.log(error)
        toast.error(error.message)
        setError(error.message)
        setLoading(false)
      }
    },
  })

  return (
    <div className="flex items-center justify-center h-screen bg-dull_white">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-[#fff] text-dark_color border border-dull_white max-w-xl mx-auto rounded-md">
          <div className="px-10 py-6">
            <div className="flex flex-col items-center justify-between mb-5">
              <h4 className="text-sm font-semibold">Login</h4>
            </div>
            <div>
              <form onSubmit={loginValue.handleSubmit}>
                <div className="flex flex-col text-left gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="emailAddress"
                      name="emailAddress"
                      value={loginValue.values.emailAddress}
                      onChange={loginValue.handleChange}
                      onBlur={loginValue.handleBlur}
                    />
                    {loginValue.touched.emailAddress &&
                    loginValue.errors.emailAddress ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {loginValue.errors.emailAddress}
                      </p>
                    ) : null}
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="text-xs font-semibold">
                      Password:
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                        id="password"
                        name="password"
                        value={loginValue.values.password}
                        onChange={loginValue.handleChange}
                        onBlur={loginValue.handleBlur}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {loginValue.touched.password &&
                    loginValue.errors.password ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {loginValue.errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col items-center w-full">
                  <button
                    className="flex items-center justify-center w-full px-4 py-3 mt-5 text-xs font-semibold text-center text-white rounded bg-secondary"
                    type="submit"
                    disabled={loading}
                  >
                    Login
                  </button>
                  <Link
                    to="/resetPassword"
                    className="text-sm font-semibold underline"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
