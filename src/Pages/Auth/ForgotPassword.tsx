import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import { apiService } from 'middleware/ApiServices'
interface ForgotPasswordValues {
  emailAddress: string
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const forgotPasswordValue = useFormik<ForgotPasswordValues>({
    initialValues: {
      emailAddress: '',
    },

    onSubmit: async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiService.forgotPassword(
          forgotPasswordValue.values
        )

        if (response.statusCode === '200') {
          navigate('/resetPassword')
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      } catch (error: any) {
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
            <div className="flex items-center justify-between mb-5 ">
              <h4 className="text-sm font-semibold">Login</h4>
            </div>
            <div>
              <form onSubmit={forgotPasswordValue.handleSubmit}>
                <div className="flex text-left gap-x-5 gap-y-5 ">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#f4f4f4] px-5 py-3 focus:outline-none rounded-md"
                      id="emailAddress"
                      name="emailAddress"
                      value={forgotPasswordValue.values.emailAddress}
                      onChange={forgotPasswordValue.handleChange}
                      onBlur={forgotPasswordValue.handleBlur}
                    />
                    {forgotPasswordValue.touched.emailAddress &&
                    forgotPasswordValue.errors.emailAddress ? (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {forgotPasswordValue.errors.emailAddress}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="flex justify-center w-full px-4 py-3 mt-5 text-xs font-semibold text-white rounded bg-secondary"
                    type="submit"
                    disabled={loading}
                  >
                    Send mail
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
