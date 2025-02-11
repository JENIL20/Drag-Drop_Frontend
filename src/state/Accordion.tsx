import React, { useState, useRef, useEffect, Children } from 'react';
import Field from './Field';
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface DataSection {
  FieldID: number
  FieldName: string;
  FieldValue: FieldValue[];
  FieldData: any[];
}
interface FieldValue {
  id: number | string;
  label: string;
}
interface AccordionProps {
  title: string;
  fieldId?: number
  children?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  defaultOpen?: boolean
  availableFields?: DataSection[];
}


const Accordion: React.FC<AccordionProps> = ({ title, defaultOpen, fieldId, availableFields, isOpen, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-600 rounded-lg shadow-lg mb-4 transition duration-300 ease-in-out">
      <button
        className={`w-full text-left ${!isOpen ? "text-gray-800" : "bg-blue-600 text-white"} p-1 px-2 hover:opacity-100 bg-opacity-80 font-medium text-gray-800 transition duration-100 ease-in-out flex justify-between items-center rounded-t-lg`}
        onClick={onToggle}
      >
        <span className="text-lg">{title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? '-rotate-180' : ''}`}>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </button>
      <div
        ref={contentRef}
        className={`accordion-content overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 bg-gray-50 rounded-b-lg shadow-inner">
          <div className="flex flex-col gap-2 mb-4">
            <div className="relative flex justify-center">
              {availableFields.find((item) => item.FieldID === fieldId && item.FieldValue.length > 0) ? (
                <>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded-full pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                  <button
                    className="absolute right-2 top-2 pr-2 text-gray-500 hover:text-red-600 transition duration-200"
                    onClick={() => setSearchTerm("")} // Clear search input
                    aria-label="Clear search"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </>
              ) : (
                <div>No Fields Here</div>
              )}
            </div>
          </div>

          {availableFields.find((item) => item.FieldID === fieldId) && (
            <div>
              {availableFields.find((item) => item.FieldID === fieldId).FieldValue
                ?.filter((item: any) =>
                  item.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                ?.map((field: any) => (
                  <Field key={field.id} field={field} handleEditFields={function (field: any): {} {
                    throw new Error('Function not implemented.');
                  }} onRemove={function (field: any): void {
                    throw new Error('Function not implemented.');
                  }} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
