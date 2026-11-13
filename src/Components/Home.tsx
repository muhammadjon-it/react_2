
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  name: string;
  email: string;
};

const api =""

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  //// ASYNC FUNCTION

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        api,
        data
      );

      console.log("Server response:", response.data);
      alert("Data successfully sent!");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
    Register Form
  </h1>

  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
    <input
      placeholder="Name"
      {...register("name", {
        required: "Name is required",
      })}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.name && (
      <p className="text-xs text-red-500 -mt-1">{errors.name.message}</p>
    )}

    <input
      placeholder="Email"
      {...register("email", {
        required: "Email is required",
      })}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.email && (
      <p className="text-xs text-red-500 -mt-1">{errors.email.message}</p>
    )}

    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-md transition cursor-pointer disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Sending..." : "Register"}
    </button>
  </form>
</div>

  );
};

export default Home;
