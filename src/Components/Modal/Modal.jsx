"use client";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { AllDataRefetch } = useContext(AuthKanabanBoard);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const dueDate = e.target.dueDate.value;
    const allData = { title, description, dueDate };
    try {
      const resp = await axios.post(
        `http://localhost:4000/task/taskAdd`,
        allData
      );
      if (resp?.data?.status === 200) {
        AllDataRefetch();
        toast.success("Task Add Successfully");
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        onClick={open}
      >
        Add Task
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
                Add Task
              </DialogTitle>
              <div className="mt-4">
                <div>
                  <form onSubmit={handleSubmitTask}>
                    <div>
                      <label className="text-gray-500 text-lg">Title *</label>
                      <br />
                      <input
                        type="text"
                        name="title"
                        className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border-[1px] border-[#e5e5e5] outline-none rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-lg">Date *</label>
                      <br />
                      <input
                        type="date"
                        name="dueDate"
                        className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border-[1px] border-[#e5e5e5] outline-none rounded-none"
                      />
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
                        className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:px-5 bg-[#f3f4f7] border-[1px] border-[#e5e5e5] outline-none rounded-none"
                      ></textarea>
                    </div>
                    <button
                      className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white cursor-pointer"
                      onClick={close}
                    >
                      Add Task
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
