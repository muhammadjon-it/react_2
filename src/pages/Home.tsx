import { useAddDataMutation, useDeleteDataMutation, useGetStudentsQuery } from "../services/studentApi";
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"


type FormData = {
  name: string,
  desc: string,
  image: FileList,
}



function Home() {

  const { data, isError, isLoading, refetch, requestId } = useGetStudentsQuery(null);
 
  const [deleteFn, { data: data2, isLoading: isLoading2, }] = useDeleteDataMutation()
 
  const [addFn, { data: data3, isLoading: isLoading3, }] = useAddDataMutation()

  const handleDelete = (id: number) => {
    deleteFn(id)
    refetch()
  }

  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    addFn(data)
    refetch()

  }
  
  if (isLoading || isLoading2 || isLoading3) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Хато ҳангоми гирифтани маълумот!</h2>;
  }
  
  return (
    <div>
      <div>
        <h1>Student List</h1>
        <Dialog>
          <DialogTrigger>Add +</DialogTrigger>
          <DialogContent>
            <div className="flex justify-center items-center">
              <div className="bg-white p-8 w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">+ Add New User</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="file"
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      {...register("image", { required: "image is required" })}
                    />
                    {errors.image && (
                      <p className="text-[red] text-sm mt-1">{errors.image.message}</p>
                    )}
                  </div>
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
                      placeholder="Enter your description...."
                      {...register("desc", { required: "Description is required" })}
                    />
                    {errors.desc && (
                      <p className="text-[red] text-sm mt-1">{errors.desc.message}</p>
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
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {
        data?.data.map((el) => {
          return (
            <div key={el.id} className="border-2 rounded-lg py-2 px-3 m-3 w-100">
              <h1>
                {el.name}
              </h1>
              <button onClick={() => handleDelete(el.id)}>delete</button>
            </div>

          )
        })
      }

    </div>
  );
}

export default Home;