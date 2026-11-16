import { useAddDataMutation, useDeleteDataMutation, useGetStudentsQuery, useEditDataMutation, useAddImageDataMutation, useDeleteImgMutation, useStatusDataMutation } from "../services/studentApi";
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";


type FormData = {
  name: string,
  desc: string,
  image: FileList,
}



function Home() {

  const { data, isError, isLoading, refetch, requestId } = useGetStudentsQuery(null);

  const [deleteFn, { isLoading: isLoading2, }] = useDeleteDataMutation()

  const [addFn, { isLoading: isLoading3, }] = useAddDataMutation()

  const [editFn, { isLoading: isLoading4, }] = useEditDataMutation()

  const [addImageFn, { isLoading: isImageLoading }] = useAddImageDataMutation();

  const [deleteImageFn] = useDeleteImgMutation();

  const [completedFn] = useStatusDataMutation();

  const [openImage, setOpenImage] = useState(false);


  const addForm = useForm<FormData>();
  const editForm = useForm<FormData>();
  const addImgForm = useForm<FormData>();

  const [imageTodoId, setImageTodoId] = useState<number | null>(null);

  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    deleteFn(id)
    refetch()
  }

  const handleEdit = (el: IData) => {
    setEditId(el.id);

    editForm.reset({
      name: el.name,
      desc: el.description,
    });
  };

  const onSubmitEdit = (data: FormData) => {

    editFn({
      id: editId,
      name: data.name,
      description: data.desc,
    });

    refetch()
  };

  const onSubmitAdd = (data: FormData) => {
    const formData = new FormData();

    formData.append("Name", data.name);
    formData.append("Description", data.desc);
    formData.append("Images", data.image[0]);

    addFn(formData);

    refetch()
  };

  const onSubmitAddImage = (data: FormData) => {
    const formData = new FormData();
    formData.append("Images", data.image[0]);

    addImageFn({
      todoId: imageTodoId,
      formData,
    });

    refetch();
    addImgForm.reset();
    setOpenImage(false);
  };

  if (isLoading || isLoading2 || isLoading3 || isLoading4 || isImageLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Хато ҳангоми гирифтани маълумот!</h2>;
  }

  return (

    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Student List</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your students</p>
        </div>

        <Dialog>
          <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-blue-200 transition">
            + Add Student
          </DialogTrigger>
          <DialogContent>
            <div className="flex justify-center items-center">
              <div className="bg-white p-8 w-full rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">+ Add New User</h1>
                <form onSubmit={addForm.handleSubmit(onSubmitAdd)} className="flex flex-col gap-4">
                  <div>
                    <input
                      type="file"
                      className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                      {...addForm.register("image", { required: "image is required" })}
                    />
                    {addForm.formState.errors.image && (
                      <p className="text-red-500 text-sm mt-1">{addForm.formState.errors.image.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your name...."
                      {...addForm.register("name", { required: "Name is required" })}
                    />
                    {addForm.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{addForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your description...."
                      {...addForm.register("desc", { required: "Description is required" })}
                    />
                    {addForm.formState.errors.desc && (
                      <p className="text-red-500 text-sm mt-1">{addForm.formState.errors.desc.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
                  >
                    Save
                  </button>
                </form>
                {addForm.formState.isSubmitSuccessful && (
                  <p className="text-green-600 mt-3 text-center">
                    Registration successful!
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          data?.data.map((el) => {
            return (
              <div key={el.id} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl ">

                <div className="flex items-center justify-between mb-3">
                  <input
                    type="checkbox"
                    checked={el.isCompleted}
                    onChange={() => completedFn(el.id)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                </div>

                <img
                  src={`https://to-dos-api.softclub.tj/images/${el?.images?.[0]?.imageName}`}
                  className="w-full h-48 object-cover rounded-xl bg-slate-100"
                />

                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-lg font-bold text-slate-800 mt-4">
                      {el.name}
                    </h1>

                    <h1 className="text-sm text-slate-500 mt-2 leading-relaxed">
                      {el.description}
                    </h1>
                  </div>
                  <div className="mt-3">
                    <h1 className={el.isCompleted ? "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600" : "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-500"}>
                      {el.isCompleted ? "Active" : "Inactive"}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">

                  <button
                    onClick={() => handleDelete(el.id)}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white py-2 px-3 rounded-lg text-sm font-semibold transition"
                  >
                    Delete
                  </button>

                  <Dialog>
                    <DialogTrigger
                      onClick={() => handleEdit(el)}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-3 rounded-lg text-sm font-semibold transition"
                    >
                      Edit
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex justify-center items-center">
                        <div className="bg-white p-8 w-full rounded-2xl">
                          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit User</h1>
                          <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-3">
                              {el.images?.map((image) => (
                                <div className="relative">
                                  <img
                                    key={image.id}
                                    src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                                    className="w-[100px] h-[100px] object-cover rounded-xl border border-slate-200"
                                  />

                                  <button
                                    type="button"
                                    onClick={() => deleteImageFn(image.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white hover:bg-red-600 rounded-full w-6 h-6 shadow-md transition"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div>
                              <input
                                className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your name...."
                                {...editForm.register("name", { required: "Name is required" })}
                              />
                              {editForm.formState.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{editForm.formState.errors.name.message}</p>
                              )}
                            </div>
                            <div>
                              <input
                                className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your description...."
                                {...editForm.register("desc", { required: "Description is required" })}
                              />
                              {editForm.formState.errors.desc && (
                                <p className="text-red-500 text-sm mt-1">{editForm.formState.errors.desc.message}</p>
                              )}
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openImage && imageTodoId === el.id} onOpenChange={setOpenImage}>
                    <DialogTrigger
                      onClick={() => setImageTodoId(el.id)}
                      className="w-full bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white py-2 px-3 rounded-lg text-sm font-semibold transition"
                    >
                      + Add Image
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex justify-center items-center">
                        <div className="bg-white p-8 w-full rounded-2xl">
                          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">+ Add New Img</h1>
                          <form onSubmit={addImgForm.handleSubmit(onSubmitAddImage)} className="flex flex-col gap-4">
                            <div>
                              <input
                                type="file"
                                className="w-full p-3 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:border-blue-500"
                                {...addImgForm.register("image", { required: "image is required" })}
                              />
                              {addImgForm.formState.errors.image && (
                                <p className="text-red-500 text-sm mt-1">{addImgForm.formState.errors.image.message}</p>
                              )}
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>

  );
}

export default Home;