import React from "react";
import ColumnOne from "../ColumnOne/page";

const MainTask = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div>
          <div className="flex justify-between items-center py-3 lg:py-5">
            <h2 className="text-xl lg:text-xl">Task Management</h2>
            <button className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
              Add Task
            </button>
          </div>
          <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 lg:gap-4">
              <div>
                <ColumnOne />
              </div>
              <div>
                <ColumnOne />
              </div>
              <div>
                <ColumnOne />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTask;
