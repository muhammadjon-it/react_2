
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

///// MOCK FUNCTION

const mocks = vi.hoisted(() => ({
  addFn: vi.fn(),
  deleteFn: vi.fn(),
  editFn: vi.fn(),
  addImageFn: vi.fn(),
  deleteImgFn: vi.fn(),
  statusFn: vi.fn(),
}));

//// MOCK API
vi.mock("../services/studentApi", () => ({
  useGetStudentsQuery: () => ({
    data: { data: [] },
    isError: false,
    isLoading: false,
    refetch: vi.fn(),
  }),

  useAddDataMutation: () => [mocks.addFn, { isLoading: false }],
  useDeleteDataMutation: () => [mocks.deleteFn, { isLoading: false }],
  useEditDataMutation: () => [mocks.editFn, { isLoading: false }],
  useAddImageDataMutation: () => [mocks.addImageFn, { isLoading: false }],
  useDeleteImgMutation: () => [mocks.deleteImgFn],
  useStatusDataMutation: () => [mocks.statusFn],
}));

/////  TEST

describe("Home component", () => {
 
it("should add a new Todo", async () => {
  const user = userEvent.setup();

  render(<Home />);

  //// OPEN DIALOG


  await user.click(
    screen.getByRole("button", { name: /Add Student/i })
  );

  //// INPUT NAME

  await user.type(
    screen.getByPlaceholderText("Enter your name...."),
    "Muhammad"
  );

  //// DESCRIPTION INPUT
  
  await user.type(
    screen.getByPlaceholderText("Enter your description...."),
    "Learning React"
  );

  //// IMG INPUT

  const file = new File(["image"], "photo.png", {
    type: "image/png",
  });

  const fileInput = document.querySelector(
    'input[name="image"]'
  ) as HTMLInputElement;

  await user.upload(fileInput, file);

  //// BTN SAVE

  await user.click(screen.getByRole("button", { name: "Save" }));


  await waitFor(() => {
    expect(mocks.addFn).toHaveBeenCalledTimes(1);
  });


  const formData = mocks.addFn.mock.calls[0][0] as FormData;

  expect(formData.get("Name")).toBe("Muhammad");
  expect(formData.get("Description")).toBe("Learning React");
  expect(formData.get("Images")).toBeInstanceOf(File);
});

});
