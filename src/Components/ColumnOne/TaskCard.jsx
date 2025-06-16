import { FolderPen, Trash } from "lucide-react";

const TaskCard = () => {
  return (
    <div>
      <div className="bg-gray-100 rounded-lg my-6 p-8 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-xl">Researc Project</h2>
          <span className="text-gray-600">14-06-2025</span>
        </div>
        <h2 className="text-sm lg:text-base mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          ratione!
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
