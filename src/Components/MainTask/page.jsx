"use client";
import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // updated import
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";
import { FolderPen, Trash } from "lucide-react";
import Swal from "sweetalert2";
import UpdateTaskModal from "../UpdateTaskModal/UpdateTaskModal";

const columns = {
  todo: "To Do",
  inProgress: "In Progress",
  completed: "Completed",
};

const statusMap = {
  todo: "todo",
  inProgress: "in_progress",
  completed: "completed",
};

const MainTask = () => {
  const { AllTask, AllDataRefetch } = useContext(AuthKanabanBoard);

  const groupedTasks = {
    todo: AllTask?.filter((task) => task.status === "todo"),
    inProgress: AllTask?.filter((task) => task.status === "in_progress"),
    completed: AllTask?.filter((task) => task.status === "completed"),
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = statusMap[destination.droppableId];

    try {
      await axios.patch(
        `http://localhost:4000/task/taskStatus/${draggableId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      AllDataRefetch();
    } catch (error) {
      console.error("Update error", error.message);
      toast.error("Failed to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    console.log(id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            `http://localhost:4000/task/taskDelete/${id}`
          );
          if (response?.data?.status === 200) {
            AllDataRefetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6">Task Management</h2>
        <Modal />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {Object.entries(columns).map(([statusKey, title]) => (
            <Droppable droppableId={statusKey} key={statusKey}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="shadow-lg rounded-lg p-6 bg-white min-h-[300px]"
                >
                  <h2 className="text-2xl font-bold mb-3">{title}</h2>
                  {groupedTasks[statusKey]?.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-5 mb-3 rounded-md bg-gray-100 shadow-md cursor-move"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg mt-2">
                              {task.title}
                            </h3>
                            <p className="text-base text-gray-500 mt-1">
                              Due: {task.dueDate?.split("T")[0]}
                            </p>
                          </div>

                          <p className="text-base text-gray-600">
                            {task.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <button
                              onClick={() => handleDeleteTask(task?._id)}
                              className="cursor-pointer"
                            >
                              <Trash className="text-red-500" size={20} />
                            </button>
                            <UpdateTaskModal taskId={task?._id} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MainTask;
