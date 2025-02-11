// import React, { useState, useCallback, useEffect } from 'react';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faGripVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Field from './Field';
// import Accordion from './Accordion';
// import DroppableColumn from './DroppableColumn';
// import EditModal from './EditModal';
// import DeleteModal from './DeleteModal';
// import DataTable from './DataTable';


// interface FieldValue {
//   id: number | string;
//   label: string;
// }

// interface DataSection {
//   FieldName: string;
//   FieldValue: FieldValue[];
//   FieldData: any[];
// }

// let sampleData: DataSection[] = [
//   {
//     FieldName: "User fields",
//     FieldValue: [
//       { id: "id", label: "ID" },
//       { id: "name", label: "Name" },
//       { id: "age", label: "Age" },
//       { id: "email", label: "Email" }, // New field
//       { id: "role", label: "Role" }, // New field
//     ],
//     FieldData: [
//       { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com", role: "User" },
//       { id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com", role: "Admin" },
//       { id: 3, name: "Mike Johnson", age: 35, email: "mike.johnson@example.com", role: "User" },
//       { id: 4, name: "Emily Davis", age: 28, email: "emily.davis@example.com", role: "User" }, // New user
//       { id: 5, name: "Chris Evans", age: 40, email: "chris.evans@example.com", role: "Manager" }, // New user
//     ],
//   },
//   {
//     FieldName: "Food fields",
//     FieldValue: [
//       { id: 1, label: "Beer" },
//       { id: 2, label: "Vodka" },
//       { id: 3, label: "Desi" },
//       { id: 4, label: "Wine" },
//       { id: 5, label: "Whiskey" },
//     ],
//     FieldData: [
//       { 1: "Beer", 2: "Vodka", 3: "Desi", 4: "Red Wine", 5: "Bourbon" },
//       { 1: "Corona", 2: "Vodka", 3: "Thodu Kadak", 4: "Merlot", 5: "Scotch" },
//       { 1: "Blenders Pride", 2: "Whiskey", 3: "Vadhare Kadak", 4: "Chardonnay", 5: "Irish Whiskey" },
//       { 1: "Kingfisher", 2: "Gin", 3: "Desi", 4: "Sauvignon Blanc", 5: "Rye Whiskey" },
//       { 1: "Budweiser", 2: "Rum", 3: "Desi", 4: "Prosecco", 5: "Bourbon" },
//     ],
//   },
//   {
//     "FieldName": "Incident fields",
//     "FieldValue": [
//       { "id": "incidentID", "label": "Incident ID" },
//       { "id": "incidentName", "label": "Incident Name" },
//       { "id": "incidentDate", "label": "Incident Date" },
//       { "id": "incidentLocation", "label": "Incident Location" },
//       { "id": "reporter", "label": "Reporter" },
//       { "id": "creator", "label": "Creator" },
//       { "id": "severity", "label": "Severity" },
//       { "id": "contributingBehavior", "label": "Contributing Behavior" },
//       { "id": "contributingCondition", "label": "Contributing Condition" },
//       { "id": "witnesses", "label": "Witnesses" },
//       { "id": "incidentType", "label": "Incident Type" },
//       { "id": "status", "label": "Status" },
//       { "id": "actionTaken", "label": "Action Taken" },
//       { "id": "department", "label": "Department" },
//       { "id": "equipmentInvolved", "label": "Equipment Involved" },
//       { "id": "weatherCondition", "label": "Weather Condition" },
//       { "id": "timeOfIncident", "label": "Time of Incident" },
//       { "id": "injuries", "label": "Injuries" },
//       { "id": "medicalAttention", "label": "Medical Attention" },
//       { "id": "propertyDamage", "label": "Property Damage" },
//       { "id": "rootCause", "label": "Root Cause" },
//       { "id": "preventiveAction", "label": "Preventive Action" },
//       { "id": "assignedInvestigator", "label": "Assigned Investigator" },
//       { "id": "completionDate", "label": "Completion Date" },
//       { "id": "remarks", "label": "Remarks" }
//     ],
//     "FieldData": [
//       {
//         "incidentID": "INC001",
//         "incidentName": "Fire Outbreak",
//         "incidentDate": "2024-01-15",
//         "incidentLocation": "Warehouse",
//         "reporter": "John Doe",
//         "creator": "Admin",
//         "severity": "High",
//         "contributingBehavior": "Negligence",
//         "contributingCondition": "Overheated Equipment",
//         "witnesses": "Jane Smith, Alex Brown",
//         "incidentType": "Fire",
//         "status": "Resolved",
//         "actionTaken": "Fire Extinguished, Investigation Done",
//         "department": "Safety",
//         "equipmentInvolved": "Heating System",
//         "weatherCondition": "Dry",
//         "timeOfIncident": "14:30",
//         "injuries": "None",
//         "medicalAttention": "Not Required",
//         "propertyDamage": "Yes",
//         "rootCause": "Faulty Equipment",
//         "preventiveAction": "Regular Maintenance Scheduled",
//         "assignedInvestigator": "Michael Green",
//         "completionDate": "2024-01-20",
//         "remarks": "Equipment replaced"
//       },
//       {
//         "incidentID": "INC002",
//         "incidentName": "Slip and Fall",
//         "incidentDate": "2024-02-02",
//         "incidentLocation": "Lobby",
//         "reporter": "Emily Clark",
//         "creator": "HR",
//         "severity": "Medium",
//         "contributingBehavior": "Inattentiveness",
//         "contributingCondition": "Wet Floor",
//         "witnesses": "David Johnson",
//         "incidentType": "Fall",
//         "status": "Pending",
//         "actionTaken": "Warning Sign Placed",
//         "department": "Facility Management",
//         "equipmentInvolved": "None",
//         "weatherCondition": "Rainy",
//         "timeOfIncident": "09:00",
//         "injuries": "Mild Bruise",
//         "medicalAttention": "First Aid Given",
//         "propertyDamage": "No",
//         "rootCause": "Spilled Liquid",
//         "preventiveAction": "Regular Cleaning Inspection",
//         "assignedInvestigator": "Sarah Lee",
//         "completionDate": "",
//         "remarks": "Ongoing Investigation"
//       },
//       {
//         "incidentID": "INC003",
//         "incidentName": "Electrical Shock",
//         "incidentDate": "2024-01-28",
//         "incidentLocation": "Control Room",
//         "reporter": "Robert White",
//         "creator": "Safety Officer",
//         "severity": "High",
//         "contributingBehavior": "Improper Handling",
//         "contributingCondition": "Exposed Wires",
//         "witnesses": "Mark Taylor",
//         "incidentType": "Electrical Hazard",
//         "status": "Resolved",
//         "actionTaken": "Area Secured, Repairs Done",
//         "department": "Electrical Maintenance",
//         "equipmentInvolved": "Power Panel",
//         "weatherCondition": "Indoor",
//         "timeOfIncident": "11:15",
//         "injuries": "Minor Burn",
//         "medicalAttention": "Hospital Visit",
//         "propertyDamage": "Minimal",
//         "rootCause": "Damaged Wiring",
//         "preventiveAction": "Periodic Safety Checks",
//         "assignedInvestigator": "Tom Rogers",
//         "completionDate": "2024-02-01",
//         "remarks": "Training Required for Handling"
//       }
//     ]
//   },
//   {
//     FieldName: "Contact fields",
//     FieldValue: [
//       { id: "phone", label: "Phone Number" },
//       { id: "address", label: "Address" },
//       { id: "city", label: "City" },
//       { id: "country", label: "Country" }, // New field
//       { id: "zip", label: "ZIP Code" }, // New field
//     ],
//     FieldData: [
//       { phone: "123-456-7890", address: "123 Main St", city: "New York", country: "USA", zip: "10001" },
//       { phone: "987-654-3210", address: "456 Elm St", city: "Los Angeles", country: "USA", zip: "90001" }, // New entry
//       { phone: "555-555-5555", address: "789 Maple Ave", city: "Chicago", country: "USA", zip: "60601" }, // New entry
//     ],
//   },
//   {
//     FieldName: "Product fields",
//     FieldValue: [
//       { id: "productId", label: "Product ID" },
//       { id: "productName", label: "Product Name" },
//       { id: "category", label: "Category" },
//       { id: "price", label: "Price" }, // New field
//       { id: "stock", label: "Stock" }, // New field
//     ],
//     FieldData: [
//       { productId: 1, productName: "Laptop", category: "Electronics", price: 999.99, stock: 50 },
//       { productId: 2, productName: "Chair", category: "Furniture", price: 149.99, stock: 200 }, // New entry
//       { productId: 3, productName: "Shoes", category: "Footwear", price: 89.99, stock: 150 }, // New entry
//       { productId: 4, productName: "Coffee Maker", category: "Appliances", price: 49.99, stock: 80 }, // New entry
//     ],
//   },
//   {
//     FieldName: "Event fields",
//     FieldValue: [
//       { id: "eventName", label: "Event Name" },
//       { id: "eventDate", label: "Event Date" },
//       { id: "location", label: "Location" },
//       { id: "attendees", label: "Number of Attendees" }, // New field
//       { id: "organizer", label: "Organizer" }, // New field
//     ],
//     FieldData: [
//       { eventName: "Conference", eventDate: "2023-10-15", location: "Convention Center", attendees: 500, organizer: "Company A" },
//       { eventName: "Workshop", eventDate: "2023-11-05", location: "Community Hall", attendees: 50, organizer: "Organization B" }, // New entry
//       { eventName: "Webinar", eventDate: "2023-12-10", location: "Online", attendees: 100, organizer: "Company C" }, // New entry
//     ],
//   },
// ];


// const DropTable: React.FC = () => {
//   // ... (rest of the code remains unchanged)
//   const [availableFields, setAvailableFields] = useState<{ [key: string]: FieldValue[] }>(() => {
//     const fields: { [key: string]: FieldValue[] } = {};
//     sampleData.forEach(section => {
//       fields[section.FieldName] = [...section.FieldValue];
//     });
//     return fields;
//   });

//   const [droppedFields, setDroppedFields] = useState<{ [key: string]: FieldValue[] }>(() => {
//     const fields: { [key: string]: FieldValue[] } = {};
//     sampleData.forEach(section => {
//       fields[section.FieldName] = [];
//     });
//     return fields;
//   });

//   const [activeTab, setActiveTab] = useState<string>(sampleData[0].FieldName);
//   const [isEditButtonVisible, setisEditButtonVisible] = useState(false)
//   const [editFieldId, setEditFieldId] = useState<string | number | null>(null);
//   const [editFieldValue, setEditFieldValue] = useState<string>("");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [originalFieldValue, setOriginalFieldValue] = useState<string>("");
//   const [openAccordion, setOpenAccordion] = useState<string | null>(null);
//   const [deleteModalOpen, setdeleteModalOpen] = useState<boolean>(false)
//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const [isDragButtonVisible, setisDragButtonVisible] = useState<boolean>(false)
//   const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
//   const [newFieldValue, setNewFieldValue] = useState<string>("");
//   const handleDropField = useCallback((field: FieldValue, sourceSection: string) => {
//     const sectionName = Object.keys(availableFields).find(key =>
//       availableFields[key].some(f => f.id === field.id)
//     ) || sourceSection;

//     if (!sectionName) return;

//     setAvailableFields(prev => ({
//       ...prev,
//       [sectionName]: prev[sectionName].filter(f => f.id !== field.id)
//     }));

//     setDroppedFields(prev => ({
//       ...prev,
//       [sectionName]: [...(prev[sectionName] || []), field]
//     }));

//     setActiveTab(sectionName);
//   }, [availableFields]);

//   const handleAccordionToggle = (title: string) => {
//     setOpenAccordion(prevTitle => (prevTitle === title ? null : title));
//   };
//   const handleSaveFieldName = () => {

//     console.log("old = ", fieldToEdit, "new = ", newFieldValue);
//     let field = sampleData.find((item) => item.FieldName === fieldToEdit)
//     field.FieldName = newFieldValue
//     let temp = sampleData.filter((item) => item.FieldName !== fieldToEdit)
//     console.log("temp", temp);

//     setAvailableFields((prevFields) => {
//       const updatedFields = { ...prevFields };
//       if (fieldToEdit && newFieldValue) {
//         updatedFields[newFieldValue] = updatedFields[fieldToEdit];
//         delete updatedFields[fieldToEdit];
//       }
//       return updatedFields;
//     });
//     setDroppedFields((prevFields) => {
//       const updatedFields = { ...prevFields };
//       if (fieldToEdit && newFieldValue) {
//         updatedFields[newFieldValue] = updatedFields[fieldToEdit];
//         delete updatedFields[fieldToEdit];
//       }
//       return updatedFields;
//     });
//     setActiveTab(newFieldValue)

//     setIsEditModalOpen(false);
//   };
//   const handleEditFieldName = (fieldName: string) => {
//     setFieldToEdit(fieldName);
//     setNewFieldValue(fieldName);
//     setIsEditModalOpen(true);
//   };


//   const findField = (val: FieldValue) => {
//     let temp = sampleData.find((item) => item.FieldName == activeTab).FieldValue.find((it) => it.id == val.id)
//     return temp
//   }
//   useEffect(() => {
//     setisEditButtonVisible(false)
//     setisDragButtonVisible(false)
//   }, [activeTab])
//   const handleRemoveField = (field: FieldValue, sectionName: string) => {
//     if (!droppedFields[sectionName]) return;

//     findField(field);

//     setDroppedFields(prev => {
//       const updatedFields = {
//         ...prev,
//         [sectionName]: prev[sectionName].filter(f => f.id !== field.id)
//       };

//       if (updatedFields[sectionName].length === 0) {
//         const nonEmptyTabs = Object.keys(updatedFields).filter(
//           key => updatedFields[key].length > 0
//         );
//         console.log(nonEmptyTabs, "i am not khali")

//         setActiveTab(nonEmptyTabs.length > 0 ? nonEmptyTabs[nonEmptyTabs.length - 1] : "");
//       }

//       return updatedFields;
//     });

//     setAvailableFields(prev => ({
//       ...prev,
//       [sectionName]: [...(prev[sectionName] || []), findField(field)]
//     }));
//   };

//   const bulkRemoveFields = (sectionName: string) => {
//     const temp = sampleData.find(it => it.FieldName === sectionName)?.FieldValue || [];

//     setAvailableFields(prev => ({
//       ...prev,
//       [sectionName]: temp
//     }));

//     setDroppedFields(prev => {
//       const updatedFields = {
//         ...prev,
//         [sectionName]: []
//       };

//       const nonEmptyTabs = Object.keys(updatedFields).filter(
//         key => updatedFields[key].length > 0
//       );

//       setActiveTab(nonEmptyTabs.length > 0 ? nonEmptyTabs[nonEmptyTabs.length - 1] : "");

//       return updatedFields;
//     });

//     setdeleteModalOpen(false);
//   };
//   const handleEditFields = (field: FieldValue, sectionName: string) => {
//     setEditFieldId(field.id);
//     setEditFieldValue(field.label);
//     setOriginalFieldValue(field.label);
//   };

//   const handleEditSubmit = () => {
//     if (editFieldId === null) return;

//     setDroppedFields(prev => {
//       const updated = { ...prev };
//       Object.keys(updated).forEach(sectionName => {
//         if (updated[sectionName]) {
//           updated[sectionName] = updated[sectionName].map(field =>
//             field.id === editFieldId ? { ...field, label: editFieldValue } : field
//           );
//         }
//       });
//       setisEditButtonVisible(true)

//       return updated;
//     });

//     setEditFieldId(null);
//     setEditFieldValue("");
//     setOriginalFieldValue("");
//   };

//   const handleDragStart = (e: React.DragEvent, index: number, sectionName: string) => {
//     setDraggedIndex(index);
//     e.dataTransfer.setData("text/plain", JSON.stringify({ index, sectionName }));
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent, targetIndex: number, sectionName: string) => {
//     e.preventDefault();

//     const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));
//     const { index: draggedIndex, sectionName: draggedSection } = draggedData;

//     if (draggedIndex === targetIndex || sectionName !== draggedSection) return;

//     setDroppedFields(prev => {
//       const updatedFields = [...(prev[sectionName] || [])];

//       const [movedField] = updatedFields.splice(draggedIndex, 1);
//       updatedFields.splice(targetIndex, 0, movedField);

//       return { ...prev, [sectionName]: updatedFields };
//     });

//     setDraggedIndex(null);
//   };

//   const getDataToShow = (sectionName: string) => {
//     const section = sampleData.find(s => s.FieldName === sectionName);
//     const fields = droppedFields[sectionName];

//     if (!section || !fields || !fields.length) return [];

//     return section.FieldData.map(entry => {
//       const fieldValues: any = {};
//       fields.forEach(f => {
//         fieldValues[f.id] = entry[f.id] ?? "N/A";
//       });
//       return fieldValues;
//     });
//   };
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex p-6  bg-gray-50 min-h-screen">
//         {/* Left column */}
//         <div className="w-1/5 h-[700px]  p-4 bg-white shadow-lg rounded-lg  overflow-y-auto border border-gray-200 ">
//           {sampleData.map(section => (
//             <Accordion
//               key={section.FieldName}
//               title={section.FieldName}
//               defaultOpen={false}
//               availableFields={availableFields}
//               isOpen={openAccordion === section.FieldName}
//               onToggle={() => handleAccordionToggle(section.FieldName)}
//             />
//           ))}
//         </div>

//         {/* Middle column with added margin */}
//         <div className={`mx-4 w-1/5  p-4 ${isDragButtonVisible && " outline-green-500"} bg-white shadow-lg rounded-lg flex flex-col border border-gray-200 h-1/3 max-h-[700px] overflow-y-auto`}>
//           {(sampleData.find(section => (droppedFields[section.FieldName]?.length > 0))) ? (
//             <div className="flex justify-end mb-4 gap-3">
//               {
//                 <button
//                   onClick={() => setisEditButtonVisible((prev) => !prev)}
//                   className={`flex items-center px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md disabled:opacity-75`}
//                   disabled={isDragButtonVisible || isEditButtonVisible}
//                 >
//                   <FontAwesomeIcon icon={faPencil} />
//                 </button>
//               }
//               {
//                 // (!isDragButtonVisible && !isEditButtonVisible) &&
//                 <button
//                   onClick={() => setdeleteModalOpen(true)}
//                   className={`flex items-center px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700  transition-shadow shadow-md disabled:opacity-75`}
//                   disabled={(isDragButtonVisible || isEditButtonVisible)}
//                 >
//                   <FontAwesomeIcon icon={faTrash} className="" />
//                 </button>
//               }
//               {
//                 // (!isDragButtonVisible && !isEditButtonVisible) &&
//                 <button
//                   onClick={() => setisDragButtonVisible(true)}
//                   className={`flex items-center px-3 py-2 bg-[#399918] opacity-80 hover:opacity-100 text-white rounded-lg  transition-shadow shadow-md disabled:opacity-75`}
//                   disabled={(isDragButtonVisible || isEditButtonVisible)}
//                 >
//                   <FontAwesomeIcon icon={faGripVertical} />
//                 </button>
//               }
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center">Drop Field to build data</p>
//           )}

//           <div className="flex-grow overflow-auto justify-center items-center ">
//             {sampleData.map(section => (
//               droppedFields[section.FieldName]?.length > 0 && activeTab === section.FieldName && (
//                 <div key={section.FieldName} className="mb-4">
//                   <h4 className="font-medium text-lg text-gray-800 text-center mb-3 border border-l-orange-600 border-b-0  border-t-0 border-l-2 border-r-0">{section.FieldName}</h4>
//                   {droppedFields[section.FieldName].map((field, index) => (
//                     <div
//                       key={field.id}
//                       className=" flex  justify-start gap-2 h-6  items-center mb-2   bottom-2  "
//                       draggable
//                       onDragStart={(e) => isDragButtonVisible && handleDragStart(e, index, section.FieldName)}
//                       onDragOver={handleDragOver}
//                       onDrop={(e) => handleDrop(e, index, section.FieldName)}
//                     >
//                       <Field
//                         handleEditFields={handleEditFields}
//                         field={field}
//                         sectionName={section.FieldName}
//                         columnType="second"
//                         isEditButtonVisible={isEditButtonVisible}
//                         isDragButtonVisible={isDragButtonVisible}
//                         onRemove={() => handleRemoveField(field, section.FieldName)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )
//             ))}
//           </div>
//           {
//             (isDragButtonVisible || isEditButtonVisible) &&
//             <div
//               className={`bg-green-500 outline outline-blue-500 px-2 py-1 rounded-md text-white  flex justify-center my-3 `}
//               onClick={() => {
//                 setisDragButtonVisible(false)
//                 setisEditButtonVisible(false)
//               }}
//             >
//               <button>Save</button>
//             </div>
//           }
//           <DroppableColumn
//             columnId="Dropped Fields"
//             onDropField={() => handleDropField}
//             canDrop={(item) => {
//               return !Object.values(droppedFields).some(fields =>
//                 fields.some(f => f.id === item.id)
//               );
//             }}
//           />
//         </div>

//         {/* Right column with added margin */}
//         <div className="mx-4 w-3/5 h-full p-4 bg-white shadow-lg rounded-lg flex flex-col border border-gray-200 overflow-visible">
//           <h3 className="font-bold text-xl mb-4 text-gray-800">Data Display</h3>
//           <div className="flex space-x-4">
//             {sampleData.map((section) => (
//               droppedFields[section.FieldName]?.length > 0 && (
//                 <div key={section.FieldName} className='flex flex-row justify-center items-center gap-2'>
//                   <button
//                     className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out 
//     ${activeTab === section.FieldName
//                         ? "text-[black] bg-[#E5E5CB] rounded-t-2xl after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-[#D39D55] after:transition-all after:duration-300"
//                         : "text-gray-600 hover:text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#D39D55] hover:after:w-full after:transition-all after:duration-300 hover:bg-[#EEEEEE]  rounded-t-md"
//                       }`}
//                     onClick={() => setActiveTab(section.FieldName)}
//                   >
//                     {section.FieldName}
//                   </button>

//                   <FontAwesomeIcon
//                     icon={faPencil}
//                     className='text-[#624E88] rounded-full w-4 h-4 flex justify-center items-center hover:text-[#522258]'
//                     onClick={() => handleEditFieldName(section.FieldName)}
//                   />
//                 </div>
//               )
//             ))}
//             <EditModal
//               isOpen={isEditModalOpen}
//               currentValue={fieldToEdit || ''}
//               value={newFieldValue}
//               onChange={setNewFieldValue}
//               onSave={handleSaveFieldName}
//               onCancel={() => setIsEditModalOpen(false)}
//             />
//           </div>

//           {sampleData.map((section) => (
//             activeTab === section.FieldName && droppedFields[section.FieldName]?.length > 0 && (
//               <DataTable // Use the new DataTable component
//                 key={section.FieldName}
//                 fields={droppedFields[section.FieldName]}
//                 data={getDataToShow(section.FieldName)}
//               />
//             )
//           ))}
//         </div>
//       </div>

//       {editFieldId && (
//         <EditModal
//           currentValue={originalFieldValue}
//           isOpen={!!editFieldId}
//           value={editFieldValue}
//           onChange={setEditFieldValue}
//           onSave={handleEditSubmit}
//           onCancel={() => {
//             setEditFieldId(null);
//             setEditFieldValue("");
//             setOriginalFieldValue("");
//           }}
//         />
//       )}

//       {deleteModalOpen && (
//         <DeleteModal
//           isOpen={deleteModalOpen}
//           onClose={() => setdeleteModalOpen(false)}
//           onConfirm={() => bulkRemoveFields(activeTab)}
//         />
//       )}
//     </DndProvider>
//   );
// };

// export default DropTable;

import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGripVertical, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Field from './Field';
import Accordion from './Accordion';
import DroppableColumn from './DroppableColumn';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DataTable from './DataTable';
import axios from "axios"

interface FieldValue {
  id: number | string;
  label: string;
}

interface DataSection {
  FieldID: number
  FieldName: string;
  FieldValue: FieldValue[];
  FieldData: any[];
}

// const sampleData: DataSection[] = [
//   {
//     FieldID: 1,
//     FieldName: "User fields",
//     FieldValue: [
//       { id: "id", label: "ID" },
//       { id: "name", label: "Name" },
//       { id: "age", label: "Age" },
//       { id: "email", label: "Email" },
//       { id: "role", label: "Role" },
//       { id: "status", label: "Status" },
//       { id: "department", label: "Department" },
//     ],
//     FieldData: [
//       ...Array(5).fill(null).map((_, index) => ({
//         id: index + 1,
//         name: `User ${index + 1}`,
//         age: 20 + (index % 15),
//         email: `user${index + 1}@example.com`,
//         role: ["User", "Admin", "Manager"][index % 3],
//         status: ["Active", "Inactive"][index % 2],
//         department: ["HR", "IT", "Finance"][index % 3],
//       }))
//     ]
//   },
//   {
//     FieldID: 2,
//     FieldName: "Food fields",
//     FieldValue: [
//       { id: 1, label: "Beer" },
//       { id: 2, label: "Vodka" },
//       { id: 3, label: "Desi" },
//       { id: 4, label: "Wine" },
//       { id: 5, label: "Whiskey" },
//       { id: 6, label: "Cocktail" },
//       { id: 7, label: "Brandy" },
//     ],
//     FieldData: [
//       ...Array(5).fill(null).map((_, index) => ({
//         1: ["Budweiser", "Heineken", "Guinness"][index % 3],
//         2: ["Vodka", "Rum", "Gin"][index % 3],
//         3: ["Desi", "Mild Desi", "Strong Desi"][index % 3],
//         4: ["Red Wine", "White Wine", "Rosé"][index % 3],
//         5: ["Bourbon", "Scotch", "Irish Whiskey"][index % 3],
//         6: ["Margarita", "Mojito", "Pina Colada"][index % 3],
//         7: ["VS Brandy", "XO Brandy", "VSOP Brandy"][index % 3],
//       }))
//     ]
//   },
//   {
//     FieldID: 3,
//     FieldName: "Product fields",
//     FieldValue: [
//       { id: "productId", label: "ProductID" },
//       { id: "productName", label: "ProductName" },
//       { id: "category", label: "Category" },
//       { id: "price", label: "Price" },
//       { id: "stock", label: "Stock" },
//       { id: "rating", label: "Rating" },
//       { id: "brand", label: "Brand" },
//     ],
//     FieldData: [
//       ...Array(10).fill(null).map((_, index) => ({
//         productId: index + 1,
//         productName: `Product ${index + 1}`,
//         category: ["Electronics", "Furniture", "Clothing"][index % 3],
//         price: (index + 1) * 25.99,
//         stock: 100 + (index * 10),
//         rating: (Math.random() * 5).toFixed(1),
//         brand: ["Brand A", "Brand B", "Brand C"][index % 3],
//       }))
//     ]
//   },
//   {
//     FieldID: 4,
//     FieldName: "Contact fields",
//     FieldValue: [
//       { id: "phone", label: "Phone Number" },
//       { id: "address", label: "Address" },
//       { id: "city", label: "City" },
//       { id: "country", label: "Country" },
//       { id: "zip", label: "ZIP Code" },
//       { id: "state", label: "State" },
//       { id: "email", label: "Email" },
//     ],
//     FieldData: [
//       ...Array(10).fill(null).map((_, index) => ({
//         phone: `555-000-${1000 + index}`,
//         address: `${index + 1} Example St`,
//         city: ["New York", "Los Angeles", "Chicago"][index % 3],
//         country: "USA",
//         zip: `${10000 + index}`,
//         state: ["NY", "CA", "IL"][index % 3],
//         email: `contact${index + 1}@example.com`,
//       }))
//     ]
//   }
// ];

const DropTable: React.FC = () => {
  // ... (rest of the code remains unchanged)

  const [sampleData, setSampleData] = useState<DataSection>([])
  const [availableFields, setAvailableFields] = useState()

  const [droppedFields, setDroppedFields] = useState()
  const [activeTab, setActiveTab] = useState<number>(sampleData[0]?.FieldID);
  const [isEditButtonVisible, setisEditButtonVisible] = useState(false)
  const [editFieldId, setEditFieldId] = useState<string | number | null>(null);
  const [editFieldValue, setEditFieldValue] = useState<string>("");
  const [originalFieldValue, setOriginalFieldValue] = useState<string>("");
  const [deleteModalOpen, setdeleteModalOpen] = useState<boolean>(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isDragButtonVisible, setisDragButtonVisible] = useState<boolean>(false)
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
  const [newFieldValue, setNewFieldValue] = useState<string>("");
  const handleAccordionToggle = (title: number) => {
    setOpenAccordion(prevTitle => (prevTitle === title ? null : title));
  };

  const handleDropField = (fieldId: string): {} => {
    const field = sampleData.find(item => item.FieldID == openAccordion)?.FieldValue.find(item => item.id === fieldId)
    setActiveTab(openAccordion)
    setDroppedFields(prevData =>
      prevData.map(section => {
        if (section.FieldID == openAccordion) {

          return {
            ...section,
            FieldValue: [...section.FieldValue, field], // Add new field
          };
        }
        return section;
      })
    );
    setAvailableFields(prevData =>
      prevData.map(section => {
        if (section.FieldID == openAccordion) {
          return {
            ...section,
            FieldValue: section.FieldValue.filter(item => item.id !== field.id), // Add new field
          };
        }
        return section;
      })
    );
    return {}

  };

  const generatePdf = (data) => {
    const doc = new jsPDF();

    const title = (data.FieldName);
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    const tableColumn = data.FieldValue.map(field => field.label);
    const tableRows = data.FieldData.map(user =>
      data.FieldValue.map(field => {
        return (user[field.id])
      })
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30 // Start the table below the title
    });
    doc.save(`${data.FieldName}.pdf`); // Save the generated PDF
  }
  const exportReport = async () => {
    console.log(droppedFields[activeTab - 1]);
    const filteredData = filterAndUndefineFields(droppedFields[activeTab - 1]?.FieldData, droppedFields[activeTab - 1]?.FieldValue);
    const data = {
      FieldID: droppedFields[activeTab - 1].FieldID,
      FieldName: droppedFields[activeTab - 1].FieldName,
      FieldValue: droppedFields[activeTab - 1].FieldValue,
      FieldData: filteredData
    }
    generatePdf(data)
    // const temp = await axios.post("http://localhost:5000/report", { data })
  }
  function filterAndUndefineFields(fieldData, fieldValue) {
    const allowedFields = fieldValue?.map(field => field.id);

    return fieldData.map(item => {
      const filteredItem = {};
      Object.keys(item).forEach(field => {
        if (allowedFields.includes(field)) {
          filteredItem[field] = item[field];
        } else {
          filteredItem[field] = undefined;
        }
      });
      return filteredItem;
    });
  }
  const handleSaveFieldName = () => {

    setDroppedFields(prevData =>
      prevData.map(section => {
        if (section.FieldID === activeTab) {
          return {
            ...section,
            FieldName: newFieldValue
          };
        }
        return section;
      })
    );

    setIsEditModalOpen(false);
  };

  const handleEditFieldName = (fieldName: string) => {
    setFieldToEdit(fieldName);
    setNewFieldValue(fieldName);
    setIsEditModalOpen(true);
  };

  const handleRemoveField = (field: FieldValue, sectionId: number) => {
    setOpenAccordion(sectionId);
    const temp = sampleData.find((item) => item.FieldID === sectionId).FieldValue.find((item => item.id == field.id))
    setAvailableFields(prevData =>
      prevData.map(section => {
        if (section.FieldID === sectionId) {
          return {
            ...section,
            FieldValue: [...section.FieldValue, temp], // Add back the field
          };
        }
        return section;
      })
    );

    setDroppedFields(prevData => {
      const updatedFields = prevData.map(section => {
        if (section.FieldID === sectionId) {
          return {
            ...section,
            FieldValue: section.FieldValue.filter(item => item.id !== field.id), // Remove field
          };
        }
        return section;
      });

      // Find all non-empty sections
      const nonEmptyTabs = updatedFields.filter(section => section.FieldValue.length > 0);

      // Set active tab to the last non-empty section
      if (droppedFields[activeTab - 1]?.FieldValue.length == 1) {
        setActiveTab(nonEmptyTabs.length > 0 ? nonEmptyTabs[nonEmptyTabs.length - 1].FieldID : 0);
      }

      return updatedFields;
    });
  };

  const bulkRemoveFields = (sectionId: number) => {
    setOpenAccordion(sectionId);

    const temp = sampleData.find(it => it.FieldID === sectionId)?.FieldValue || [];

    setAvailableFields(prevData =>
      prevData.map(section => {
        if (section.FieldID === sectionId) {
          return {
            ...section,
            FieldValue: temp, // Restore original fields
          };
        }
        return section;
      })
    );

    setDroppedFields(prevData => {
      const updatedFields = prevData.map(section => {
        if (section.FieldID === sectionId) {
          return {
            ...section,
            FieldValue: [], // Clear all fields
          };
        }
        return section;
      });

      // Find all non-empty sections
      const nonEmptyTabs = updatedFields.filter(section => section.FieldValue.length > 0);

      // Set active tab to the last non-empty section
      setActiveTab(nonEmptyTabs.length > 0 ? nonEmptyTabs[nonEmptyTabs.length - 1].FieldID : null);

      return updatedFields;
    });

    setdeleteModalOpen(false);
  };

  const handleEditFields = (field: FieldValue) => {
    setEditFieldId(field.id);
    setEditFieldValue(field.label);
    setOriginalFieldValue(field.label);
    return {};
  };

  const handleEditSubmit = () => {
    if (editFieldId === null) return;

    setDroppedFields(prevData =>
      prevData.map(section => {
        if (section.FieldID === activeTab) {
          return {
            ...section,
            FieldValue: section.FieldValue.map(field =>
              field.id === editFieldId ? { ...field, label: editFieldValue } : field
            ),
          };
        }
        return section;
      })
    );
    setisEditButtonVisible(true)

    setEditFieldId(null);
    setEditFieldValue("");
    setOriginalFieldValue("");
  };

  const handleDragStart = (e: React.DragEvent, index: number, sectionName: string) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("text/plain", JSON.stringify({ index, sectionName }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number, sectionName: string) => {
    e.preventDefault();

    const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { index: draggedIndex, sectionName: draggedSection } = draggedData;

    if (draggedIndex === targetIndex || sectionName !== draggedSection) return;

    setDroppedFields(prev => {
      return prev.map(section => {
        if (section.FieldID === activeTab) {
          const updatedFields = [...section.FieldValue];

          // Swap the fields
          const temp = updatedFields[draggedIndex];
          updatedFields[draggedIndex] = updatedFields[targetIndex];
          updatedFields[targetIndex] = temp;

          return { ...section, FieldValue: updatedFields };
        }
        return section;
      });
    });

    setDraggedIndex(null);
  };

  const getDataToShow = (sectionId: number) => {
    const section = sampleData.find(s => s.FieldID === sectionId);
    const fields = droppedFields.find(item => item.FieldID === sectionId).FieldValue

    if (!section || !fields || !fields?.length) return [];

    return section.FieldData.map(entry => {
      const fieldValues: any = {};
      fields.forEach(f => {
        fieldValues[f.id] = entry[f.id] ?? "N/A";
      });
      return fieldValues;
    });
  };


  useEffect(() => {
    setisEditButtonVisible(false)
    setisDragButtonVisible(false)
  }, [activeTab])
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:5000/home")
      console.log(response);
      setSampleData(response.data.originalData)
      setAvailableFields(response.data.originalData)
      setDroppedFields(response.data.originalData.map((item) => {
        return ({
          FieldID: item.FieldID,
          FieldName: item.FieldName,
          FieldValue: [],
          FieldData: item.FieldData,
        })
      }))
    })()
  }, [])
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex p-6  bg-gray-50 h-screen">
        {/* Left column */}
        <div className="w-1/5 h-[98%]  p-4 bg-white shadow-lg rounded-lg  overflow-y-auto border border-gray-200 ">
          {sampleData?.map(section => (
            <Accordion
              key={section.FieldID}
              title={section.FieldName}
              defaultOpen={false}
              fieldId={section.FieldID}
              availableFields={availableFields}
              isOpen={openAccordion === section.FieldID}
              onToggle={() => handleAccordionToggle(section.FieldID)}
            />
          ))}
        </div>

        {/* Middle column with added margin */}
        <div className={`mx-4 w-1/5 h-[98%] p-4 ${isDragButtonVisible && " outline-green-500"} bg-white shadow-lg rounded-lg flex flex-col border border-gray-200 h-1/3 max-h-[700px] overflow-y-auto`}>
          {droppedFields?.filter((item) => item?.FieldValue?.length > 0) ? (
            <div className="flex justify-end mb-4 gap-3">
              {
                <button
                  onClick={() => setisEditButtonVisible((prev) => !prev)}
                  className={`flex items-center px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow  shadow-md disabled:opacity-75`}
                  disabled={isDragButtonVisible || isEditButtonVisible}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              }
              {
                // (!isDragButtonVisible && !isEditButtonVisible) &&
                <button
                  onClick={() => setdeleteModalOpen(true)}
                  className={`flex items-center px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700  transition-shadow shadow-md disabled:opacity-75`}
                  disabled={(isDragButtonVisible || isEditButtonVisible)}
                >
                  <FontAwesomeIcon icon={faTrash} className="" />
                </button>
              }
              {
                // (!isDragButtonVisible && !isEditButtonVisible) &&
                <button
                  onClick={() => setisDragButtonVisible(true)}
                  className={`flex items-center px-3 py-2 bg-[#399918] opacity-80 hover:opacity-100 text-white rounded-lg  transition-shadow shadow-md disabled:opacity-75`}
                  disabled={(isDragButtonVisible || isEditButtonVisible)}
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </button>
              }
            </div>
          ) : (
            <p className="text-gray-500 text-center">Drop Field to build data</p>
          )}

          <div className="flex-grow overflow-auto justify-center items-center ">
            {droppedFields?.map(section => (
              section.FieldValue?.length > 0 && activeTab === section.FieldID && (
                <div key={section.FieldID} className="mb-4">
                  <h4 className="font-medium text-lg text-gray-800 text-center mb-3 border border-l-orange-600 border-b-0  border-t-0 border-l-2 border-r-0">{section.FieldName}</h4>
                  {section?.FieldValue?.map((field, index) => (
                    <div
                      key={field.id}
                      className=" flex  justify-start gap-2 h-6  items-center mb-2   bottom-2  "
                      draggable
                      onDragStart={(e) => isDragButtonVisible && handleDragStart(e, index, section.FieldName)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index, section.FieldName)}
                    >
                      <Field
                        handleEditFields={handleEditFields}
                        field={field}
                        sectionName={section.FieldName}
                        columnType="second"
                        isEditButtonVisible={isEditButtonVisible}
                        isDragButtonVisible={isDragButtonVisible}
                        onRemove={() => handleRemoveField(field, section.FieldID)}
                      />
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
          {
            (isDragButtonVisible || isEditButtonVisible) &&
            <div
              className={`bg-green-500 outline outline-blue-500 px-2 py-1 rounded-md text-white  flex justify-center my-3 `}
              onClick={() => {
                setisDragButtonVisible(false)
                setisEditButtonVisible(false)
              }}
            >
              <button>Save</button>
            </div>
          }
          <DroppableColumn
            children
            columnId={"Dropped Fields"}
            onDropField={handleDropField}
            canDrop={(item) => {
              return !Object.values(droppedFields).find(fields =>
                fields.FieldValue.find(f => f.id === item.id)
              );
            }}
          />
        </div>

        {/* Right column with added margin */}
        <div className="mx-4 w-3/5 h-[98%] p-4 bg-white shadow-lg rounded-lg flex flex-col border border-gray-200 overflow-visible">
          <div className='flex justify-between'>
            <h3 className="font-bold text-xl mb-4 text-gray-800 ">Data Display</h3>
            <button className="font-bold text-xl mb-4 text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
              onClick={() => exportReport()}
            >Export Report</button>
          </div>
          <div className="flex space-x-4">
            {droppedFields?.map((section) => (
              section.FieldValue?.length > 0 && (
                <div key={section.FieldName} className='flex flex-row justify-center items-center gap-2'>
                  <button
                    className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ease-in-out 
    ${activeTab === section.FieldID
                        ? "text-[black] bg-[#E5E5CB] rounded-t-2xl after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-[#D39D55] after:transition-all after:duration-300"
                        : "text-gray-600 hover:text-gray-800 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#D39D55] hover:after:w-full after:transition-all after:duration-300 hover:bg-[#EEEEEE]  rounded-t-md"
                      }`}
                    onClick={() => setActiveTab(section.FieldID)}
                  >
                    {section.FieldName}
                  </button>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className='text-[#624E88] rounded-full w-4 h-4 flex justify-center items-center hover:text-[#522258]'
                    onClick={() => {
                      setActiveTab(section.FieldID);
                      handleEditFieldName(section.FieldName)
                    }
                    }
                  />
                </div>
              )
            ))}
            <EditModal
              isOpen={isEditModalOpen}
              currentValue={fieldToEdit || ''}
              value={newFieldValue}
              onChange={setNewFieldValue}
              onSave={handleSaveFieldName}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>

          {droppedFields?.map((section) => (
            activeTab === section.FieldID && section.FieldValue?.length > 0 && (
              <DataTable // Use the new DataTable component
                key={section.FieldName}
                fields={section.FieldValue}
                data={getDataToShow(section.FieldID)}
              />
            )
          ))}
        </div>

        {editFieldId && (
          <EditModal
            currentValue={originalFieldValue}
            isOpen={!!editFieldId}
            value={editFieldValue}
            onChange={setEditFieldValue}
            onSave={handleEditSubmit}
            onCancel={() => {
              setEditFieldId(null);
              setEditFieldValue("");
              setOriginalFieldValue("");
            }}
          />
        )}

        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setdeleteModalOpen(false)}
            onConfirm={() => bulkRemoveFields(activeTab)}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default DropTable;