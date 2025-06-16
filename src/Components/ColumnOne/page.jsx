"use client";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const ColumnOne = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.serial_id,
  });

  return (
    <div ref={setNodeRef}>
      <div className="rounded-lg p-6  min-h-[400px]">
        <h2 className="text-xl lg:text-3xl">{column?.title}</h2>
        <div>
          {tasks?.map((task, idx) => (
            <TaskCard key={idx} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnOne;
