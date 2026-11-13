import { useForm } from 'react-hook-form'

type FormData = {
  name: string,
  age: number,
  email: string,
  password: string,
}

const About = () => {


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data);

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your name...."
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-[red] text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your age"
              {...register("age", { required: "Age is required", valueAsNumber: true, min: { value: 1, message: "Age must be greater than 0" } })}
            />
            {errors.age && (
              <p className="text-[red] text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Email is invalid" },
              })}
            />
            {errors.email && (
              <p className="text-[red] text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type='password'
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && (
              <p className="text-[red] text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
          >
            send
          </button>
        </form>
        {isSubmitSuccessful && (
          <p className="text-green-600">
            Registration successful!
          </p>
        )}

        <p>
          {isDirty ? "Маълумот тағйир ёфт" : "Маълумот тағйир наёфтааст"}
        </p> 
      </div>
    </div>

  )
}

export default About