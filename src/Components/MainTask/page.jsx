import React from "react";
import ColumnOne from "../ColumnOne/page";
import Modal from "../Modal/Modal";

const MainTask = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div>
          <div className="flex justify-between items-center py-3 lg:py-5">
            <h2 className="text-xl lg:text-xl">Task Management</h2>
            <Modal />
          </div>
          <div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 lg:gap-4">
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
