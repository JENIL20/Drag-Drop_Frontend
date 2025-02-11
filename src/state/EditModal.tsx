import React from "react";

type EditModalProps = {
  isOpen: boolean;
  currentValue: string; // Non-editable value
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, currentValue, value, onChange, onSave, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black  bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 ">
        <h4 className="font-bold mb-2">Current Field</h4>
        <input
          type="text"
          value={currentValue}
          disabled
          className="border p-2 mb-4 w-full bg-gray-200 rounded-md "
          readOnly
        />
        <h4 className="font-bold mb-2">Edit Field</h4>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md border-black"
        />
        <div className="flex justify-end">
          <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Save</button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;