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
    if (activeTab) {
      const filteredData = filterAndUndefineFields(droppedFields[activeTab - 1]?.FieldData, droppedFields[activeTab - 1]?.FieldValue);
      const data = {
        FieldID: droppedFields[activeTab - 1].FieldID,
        FieldName: droppedFields[activeTab - 1].FieldName,
        FieldValue: droppedFields[activeTab - 1].FieldValue,
        FieldData: filteredData
      }
      generatePdf(data)
      const temp = await axios.post("http://localhost:5000/report", { data })
    } else {
      alert("Drop some fields to download")
    }
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
    </DndProvider >
  );
};

export default DropTable;
