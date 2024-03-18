import React from "react";

/**
 * NameList Component
 *
 * A presentational component for rendering a list of names and their corresponding locations.
 *
 * @param {Array} list - An array of objects representing items in the list, each containing 'name' and 'location' properties.
 * @returns {JSX.Element} The JSX markup for the NameList component.
 */

const NameList = ({ list }) => {
  return (
    <div
      data-testid="name-list"
      className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg max-w-xl"
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NameList;
