// import { faEdit, faGripVertical, faMinus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// const ItemType = "FIELD";

// interface FieldProps {
//   field: { id: number; label: string; };
//   onDrop?: (field: any) => void; // Callback when a field is dropped
//   onFieldSwap?: (draggedField: any) => void; // Callback for field swap
//   isDroppable?: boolean;
//   columnType?: string;
//   isEditButtonVisible?: boolean;
//   sectionName?: string;
//   isDragButtonVisible?: boolean;
//   handleEditFields: (field: any) => void;
//   onRemove: (field: any, sectionName: string) => void;
// }

// const Field: React.FC<FieldProps> = ({
//   field,
//   onDrop,
//   onFieldSwap,
//   isEditButtonVisible,
//   sectionName,
//   isDroppable = false,
//   columnType,
//   isDragButtonVisible,
//   onRemove,
//   handleEditFields
// }) => {
//   const [, drag] = useDrag({
//     type: ItemType,
//     item: field,
//     canDrag: columnType !== "second",
//   });

//   const [, drop] = useDrop({
//     accept: ItemType,
//     drop: (draggedField) => {
//       if (columnType === "second" && onFieldSwap) {
//         onFieldSwap(draggedField);
//       } else if (onDrop) {
//         onDrop(field);
//       }
//     },
//     canDrop: () => columnType === "second", // Only allow drop in second column
//   });

//   return (
//     <div
//       className={`p-2 h-6 w-[100%] text-xs flex flex-row ${columnType !== "second" ? "justify-start bg-[#E8F9FF] hover:bg-[#C4D9FF]" : "justify-between bg-[#C5EBAA] hover:bg-[#A5DD9B]"} rounded-md items-center gap-4 m-2 border border-black cursor-move ${isDroppable ? "bg-lightgray" : "bg-lightblue"}  text-center relative`}
//     >
//       {columnType !== "second" &&
//         <FontAwesomeIcon
//           draggable={false}
//           ref={isDroppable ? drop : drag}
//           icon={faGripVertical} />}
//       {<div ref={isDroppable ? drop : drag} >{field.label}</div>}

//       {
//         columnType === "second" && (
//           <>
//             {isDragButtonVisible && <FontAwesomeIcon icon={faGripVertical} />}
//             {
//               (!isDragButtonVisible && !isEditButtonVisible) &&
//               <button onClick={() => onRemove(field)} className='hover:bg-[#B73E3E] rounded-full w-4 h-4 flex justify-center items-center hover:text-white'>
//                 <FontAwesomeIcon icon={faMinus} />
//               </button>
//             }
//             {isEditButtonVisible &&
//               <button onClick={() => handleEditFields(field, sectionName)}>
//                 <FontAwesomeIcon icon={faPencil} className='text-[#624E88] rounded-full w-4 h-4 flex justify-center items-center hover:text-[#522258] ' />
//               </button>
//             }
//           </>
//         )
//       }
//     </div >
//   );
// };

// export default Field;

// import { faEdit, faGripVertical, faMinus, faPencil } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { useDrag, useDrop } from 'react-dnd';

// const ItemType = "FIELD";

// interface FieldProps {
//   field: { label: string; };
//   onDrop?: (field: any) => void; // Callback when a field is dropped
//   onFieldSwap?: (draggedField: any) => void; // Callback for field swap
//   isDroppable?: boolean;
//   columnType?: string;
//   isEditButtonVisible?: boolean;
//   sectionName?: string;
//   isDragButtonVisible?: boolean;
//   handleEditFields: (field: any) => {};
//   onRemove: (field: any) => void;
// }

// const Field: React.FC<FieldProps> = ({
//   field,
//   onDrop,
//   onFieldSwap,
//   isEditButtonVisible,
//   sectionName,
//   isDroppable = false,
//   columnType,
//   isDragButtonVisible,
//   onRemove,
//   handleEditFields
// }) => {
//   const [, drag, dragPreview] = useDrag({
//     type: ItemType,
//     item: field,
//     canDrag: columnType !== "second", // Allow dragging in both columns
//   });


//   const [, drop] = useDrop({
//     accept: "",
//     drop: (draggedField) => {
//       if (columnType === "second" && onFieldSwap) {
//         onFieldSwap(draggedField);
//       } else if (onDrop) {
//         onDrop(field);
//       }
//     },
//     canDrop: () => columnType === "second", // Only allow drop in the second column
//   });

//   return (
//     <div
//       aria-disabled
//       ref={(node) => dragPreview(drop(node))}
//       className={`p-2 h-6 w-[100%] text-xs flex flex-row ${columnType !== "second" ? "justify-start bg-[#E8F9FF] hover:bg-[#C4D9FF]" : "justify-between bg-[#C5EBAA] hover:bg-[#A5DD9B]"} rounded-md items-center gap-4 m-2 border border-black text-center relative`}
//     >
//       {columnType !== "second" && <div ref={drag}>
//         <FontAwesomeIcon
//           // draggable={false}
//           icon={faGripVertical}
//           className="cursor-move"
//         />
//       </div>}
//       <div>{field.label}</div>

//       {columnType === "second" && (
//         <>
//           {isDragButtonVisible &&
//             <div
//               ref={(node) => dragPreview(drag(node))}
//             // ref={drag}
//             >
//               <FontAwesomeIcon
//                 icon={faGripVertical}
//                 className="cursor-move"
//               />
//             </div>}
//           {(!isDragButtonVisible && !isEditButtonVisible) && (
//             <button
//               onClick={() => onRemove(field)}
//               className='hover:bg-[#B73E3E] rounded-full w-4 h-4 flex justify-center items-center hover:text-white'
//             >
//               <FontAwesomeIcon icon={faMinus} />
//             </button>
//           )}
//           {isEditButtonVisible && (
//             <button onClick={() => handleEditFields(field)}>
//               <FontAwesomeIcon icon={faPencil} className='text-[#624E88] rounded-full w-4 h-4 flex justify-center items-center hover:text-[#522258]' />
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Field;
import { faGripVertical, faMinus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = "FIELD";

interface FieldProps {
  field: { id: number; label: string; index: number; }; // Include index for swapping
  onDrop?: (field: any) => void;
  onFieldSwap?: (draggedField: any, targetField: any) => void; // Updated to include targetField
  isDroppable?: boolean;
  columnType?: string;
  isEditButtonVisible?: boolean;
  sectionName?: string;
  isDragButtonVisible?: boolean;
  handleEditFields: (field: any) => void;
  onRemove: (field: any, sectionName: string) => void;
}

const Field: React.FC<FieldProps> = ({
  field,
  onDrop,
  onFieldSwap,
  isEditButtonVisible,
  sectionName,
  isDroppable = false,
  columnType,
  isDragButtonVisible,
  onRemove,
  handleEditFields
}) => {

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { ...field }, // Pass entire field object
    canDrag: columnType !== "second",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedField) => {
      if (columnType === "second" && onFieldSwap) {
        onFieldSwap(draggedField, field); // Call swap function with both fields
      } else if (onDrop) {
        onDrop(field);
      }
    },
    canDrop: () => columnType === "second",
  });

  return (
    <motion.div
      ref={(node) => {
        if (isDroppable) drop(node);
        if (!isDroppable) drag(node);
      }}
      className={`p-2 h-6 w-[100%] text-xs flex flex-row ${columnType !== "second" ? "justify-start bg-[#E8F9FF] hover:bg-[#C4D9FF]" : "justify-between bg-[#C5EBAA] hover:bg-[#A5DD9B]"
        } rounded-md items-center gap-4 m-2 border border-black cursor-move ${isDroppable ? "bg-lightgray" : "bg-lightblue"
        } text-center relative`}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: isDragging ? 1.1 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {columnType !== "second" && <FontAwesomeIcon icon={faGripVertical} />}
      {field.label}

      {columnType === "second" && (
        <>
          {isDragButtonVisible && <FontAwesomeIcon icon={faGripVertical} />}
          {!isDragButtonVisible && !isEditButtonVisible && (
            <button onClick={() => onRemove(field, sectionName)} className='hover:bg-[#B73E3E] rounded-full w-4 h-4 flex justify-center items-center hover:text-white'>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          )}
          {isEditButtonVisible && (
            <button onClick={() => handleEditFields(field)}>
              <FontAwesomeIcon icon={faPencil} className='text-[#624E88] rounded-full w-4 h-4 flex justify-center items-center hover:text-[#522258]' />
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Field;