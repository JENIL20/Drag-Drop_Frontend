import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDrop } from 'react-dnd';

interface DroppableColumnProps {
  columnId: string;
  onDropField: (field: any) => {};
  children: React.ReactNode;
  canDrop: (item: any) => boolean;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  columnId,
  onDropField,
  children,
  canDrop
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "FIELD",
    drop: (item) => {
      onDropField(item.id);
    },
    canDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative bottom-0 overflow-hidden mt-2 outline-dashed  w-[100%] h-12 p-1  rounded-md px-1 flex justify-center items-center ${isOver ? "bg-[#A8DF8E]" : "bg-[#B0EACD]"}  overflow-auto`}
    >
      {/* <h3 className="font-bold text-center">{columnId}</h3> */}
      <FontAwesomeIcon icon={faBoxOpen} className='text-2xl' />
    </div>
  );
};

export default DroppableColumn;
