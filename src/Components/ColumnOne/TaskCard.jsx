"use client";
import { FolderPen, Trash } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
    data: {
      task,
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <div className="rounded-lg my-6 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-xl">{task?.title}</h2>
          <span className="text-gray-600">{task?.dueDate}</span>
        </div>
        <h2 className="text-sm lg:text-base mt-2 text-gray-600">
          {task?.description}
        </h2>
        <div className="flex justify-between items-center mt-2">
          <button className="cursor-pointer">
            <Trash className="text-red-500" size={20} />
          </button>
          <button className="cursor-pointer">
            <FolderPen color="#57c1ee" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
