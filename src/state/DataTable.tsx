import React, { useState } from 'react';

interface FieldValue {
  id: string | number;
  label: string;
}

interface DataRow {
  [key: string]: any;
}

interface DataTableProps {
  fields: FieldValue[];
  data: DataRow[];
}

const DataTable: React.FC<DataTableProps> = ({ fields, data }) => {
  const [filter, setFilter] = useState<string>('');

  // Function to handle filtering of data
  const filteredData = data.filter((row) =>
    fields.some((field) =>
      String(row[field.id]).toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (


    <div className=' mt-4 overflow-auto rounded-t-md max-h-[65%] ' >
      <table className=" w-full overflow-x-auto ">
        <thead className='bg-[#D39D55] text-sm font-figtree text-white rounded-md'>
          <tr>
            {fields.map((field) => (
              <th key={field.id} className="border-b bg-[#D39D55]  p-2 text-left">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=''>
          {filteredData.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-[#EAFAEA] ' : 'bg-[#F5F5F5]'}>
              {fields.map((field) => (
                <td key={field.id} className="border-r border-black p-2 text-xs">
                  {row[field.id]}
                </td>
              ))}
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan={fields.length} className="border-b p-2 text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  );
};

export default DataTable;

