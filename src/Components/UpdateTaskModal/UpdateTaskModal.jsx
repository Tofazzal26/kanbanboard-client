"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FolderPen } from "lucide-react";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";

const UpdateTaskModal = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState(null);
  const [newPriority, setNewPriority] = useState("");
  const { AllDataRefetch } = useContext(AuthKanabanBoard);

  useEffect(() => {
    if (isOpen && taskId) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/task/singleTask/${taskId}`
          );
          setTask(res?.data?.data);
        } catch (err) {
          console.error("Error fetching task", err);
        }
      };
      fetchTask();
    }
  }, [isOpen, taskId]);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setTask(null);
    setNewPriority("");
  };

  const { title, description, dueDate, priority: taskPriority } = task || {};

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    const titleValue = e.target.title.value.trim();
    const descriptionValue = e.target.description.value.trim();
    const dueDateValue = e.target.dueDate.value;

    const updatedTask = {
      title: titleValue !== "" ? titleValue : title,
      description: descriptionValue !== "" ? descriptionValue : description,
      dueDate: dueDateValue !== "" ? dueDateValue : dueDate,
      priority: newPriority !== "" ? newPriority : taskPriority,
    };
    console.log(updatedTask, "updateTask");

    try {
      const resp = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/task/singleTaskUpdate/${taskId}`,
        updatedTask
      );
      console.log(resp);
      if (resp?.data?.status === 200) {
        AllDataRefetch();
        toast.success("Task updated successfully");
        close();
      }
    } catch (error) {
      console.error("Task update failed", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div>
      <Button onClick={open} className="cursor-pointer">
        <span>
          <FolderPen color="#57c1ee" size={20} />
        </span>
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg howCardShadow rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-medium text-center uppercase text-xl"
              >
                Edit Task
              </DialogTitle>
              <div className="mt-4">
                <form onSubmit={handleTaskUpdate}>
                  <div>
                    <label className="text-gray-500 text-lg">Title *</label>
                    <br />
                    <input
                      type="text"
                      name="title"
                      defaultValue={title}
                      className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border border-[#e5e5e5] outline-none rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-gray-500 text-lg">Date *</label>
                    <br />
                    <input
                      type="date"
                      name="dueDate"
                      defaultValue={dueDate}
                      className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border border-[#e5e5e5] outline-none rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-gray-500 text-lg">Priority *</label>
                    <br />
                    <select
                      name="priority"
                      className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border border-[#e5e5e5] outline-none rounded-none"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
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
                    <br />
                    <textarea
                      name="description"
                      cols={5}
                      rows={5}
                      defaultValue={description}
                      className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border border-[#e5e5e5] outline-none rounded-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white hover:bg-[#45add6] transition"
                  >
                    Update
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

export default UpdateTaskModal;
