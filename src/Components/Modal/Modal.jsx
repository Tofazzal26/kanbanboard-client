"use client";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { AllDataRefetch } = useContext(AuthKanabanBoard);
  const [priority, setPriority] = useState("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setPriority(""); // reset priority when modal closes
  }

  // handle task submit
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const dueDate = e.target.dueDate.value;

    if (!title || !description || !dueDate || !priority) {
      toast.error("Please fill all fields.");
      return;
    }

    const allData = { title, description, dueDate, priority };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/task/taskAdd`,
        allData
      );
      if (resp?.data?.status === 200) {
        AllDataRefetch();
        toast.success("Task added successfully!");
        close(); // close modal after success
        e.target.reset(); // clear form fields
      }
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  return (
    <div>
      <Button
        className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white cursor-pointer"
        onClick={open}
      >
        Add Task
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <DialogTitle
                as="h3"
                className="font-medium text-center uppercase text-xl"
              >
                Add Task
              </DialogTitle>
              <div className="mt-4">
                <form onSubmit={handleSubmitTask}>
                  <div>
                    <label className="text-gray-500 text-lg">Title *</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full mt-2 mb-4 px-3 py-2 bg-[#f3f4f7] border border-[#e5e5e5] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-lg">Date *</label>
                    <input
                      type="date"
                      name="dueDate"
                      required
                      className="w-full mt-2 mb-4 px-3 py-2 bg-[#f3f4f7] border border-[#e5e5e5] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-lg">Priority *</label>
                    <select
                      name="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full mt-2 mb-4 px-3 py-2 bg-[#f3f4f7] border border-[#e5e5e5] outline-none"
                      required
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-500 text-lg">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      rows={4}
                      required
                      className="w-full mt-2 mb-4 px-3 py-2 bg-[#f3f4f7] border border-[#e5e5e5] outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white cursor-pointer"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
