
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../API/AuthApi";
import { useForm } from "react-hook-form";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [registerUser, { isLoading, error }] = useRegisterMutation();

    const navigate = useNavigate()

    const onSubmit = async (data) => {

    const res = await registerUser(data)
        if (res.data) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            navigate("/")
        } else {
            console.log(error);

        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-bold">Register</h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg border p-3"
                    {...register("name", {
                        required: "Name is required",
                    })}
                />

                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border p-3"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />

                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border p-3"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />

                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-blue-600 p-3 text-white"
                >
                    {isLoading ? "Loading..." : "Register"}
                </button>

                {error && (
                    <p className="text-red-500">Registration failed!</p>
                )}
            </form>
        </div>
    );
}

export default Register;