"use client";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
// this is a first priority task sort function
const sortByPriority = (tasks) => {
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  return tasks?.slice().sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const MainTask = () => {
  const { AllTask, AllDataRefetch } = useContext(AuthKanabanBoard);
  // set the locally all task to db for instant status change useEffect
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(AllTask);
  }, [AllTask]);
  // fitler the status data by task
  const groupedTasks = {
    todo: localTasks?.filter((task) => task.status === "todo"),
    inProgress: localTasks?.filter((task) => task.status === "in_progress"),
    completed: localTasks?.filter((task) => task.status === "completed"),
  };
  // this is a task drag and drop function
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = statusMap[destination.droppableId];
    // check the previus and current task status
    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === draggableId ? { ...task, status: newStatus } : task
      )
    );
    // update the drag and drop task status for db
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/task/taskStatus/${draggableId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      AllDataRefetch();
    } catch (error) {
      toast.error("Failed to update task.");
      console.error("Update error", error.message);
    }
  };
  // this is a task delete task function
  const handleDeleteTask = async (id) => {
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
          // this is a task delete oparation
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/task/taskDelete/${id}`
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
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6">Task Management</h2>
        <Modal />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3 lg:gap-5 mt-4">
          {Object.entries(columns).map(([statusKey, title]) => (
            <Droppable droppableId={statusKey} key={statusKey}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="shadow-lg rounded-lg p-6 bg-white min-h-[300px]"
                >
                  <h2 className="text-2xl font-bold mb-3">{title}</h2>

                  {sortByPriority(groupedTasks[statusKey])?.map(
                    (task, index) => (
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
                            className={`p-5 mb-3 rounded-md shadow-md cursor-move ${
                              task.priority === "High"
                                ? "bg-red-50"
                                : task.priority === "Medium"
                                ? "bg-yellow-50"
                                : "bg-green-50"
                            }`}
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

                            <div className="mt-2">
                              <span className="font-medium text-sm mr-2">
                                Priority:
                              </span>
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  task.priority === "High"
                                    ? "bg-red-400 text-white"
                                    : task.priority === "Medium"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-green-400 text-black"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mt-3">
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
                    )
                  )}
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
