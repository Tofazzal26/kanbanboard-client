"use client";
import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

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

    // যদি ড্রপ না করে বা একই column এ ড্রপ করে
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = statusMap[destination.droppableId];

    try {
      await axios.patch(
        `http://localhost:4000/task/taskStatus/${draggableId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success("Status updated!");
      AllDataRefetch();
    } catch (error) {
      console.error("Update error", error.message);
      toast.error("Failed to update task.");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-6">Task Management</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.entries(columns).map(([statusKey, title]) => (
            <Droppable
              droppableId={statusKey}
              key={statusKey}
              // isDropDisabled অবশ্যই boolean দিতে হবে,
              // এখন disabled করছি না তাই false
              isDropDisabled={false}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="shadow-lg rounded-lg p-6 bg-white min-h-[300px]"
                >
                  <h2 className="text-xl font-bold mb-3">{title}</h2>
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
                          className="p-3 mb-3 rounded-md bg-gray-100 shadow-md cursor-move"
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {task.dueDate?.split("T")[0]}
                          </p>
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
