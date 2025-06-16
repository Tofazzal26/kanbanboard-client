"use client";
import { FolderPen, Trash } from "lucide-react";
import TaskCard from "./TaskCard";

const ColumnOne = () => {
  return (
    <div>
      <div>
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl lg:text-3xl">To Do</h2>
          <div>
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnOne;
