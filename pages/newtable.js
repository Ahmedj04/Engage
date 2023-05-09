import React from "react";
import Tables from "../components/utils/Tables";
function abc() {
  alert("saved");
}
function def() {
  alert("deleted");
}

const newTable = () => {
  return (
    <>
      <Tables
        cols={["checkbox", "ID", "Name", "Position", "Actions"]}
        data={[
          {
            checkbox: { operation: () => alert("checkbox clicked") },
            ID: "0",
            Name: "Full Stack Developement Program",
            Position: "89,999",
            Actions: [
              {
                type: "button",
                label: "save",
                operation: abc,
              },
              {
                type: "button",
                label: "delete",
                operation: def,
              },
            ],
          },

          {
            ID: "1",
            Name: "Python Automation Testing Program",
            Position: "64,999",
            Actions: [
              {
                type: "button",
                label: "save",
                operation: abc,
              },
              {
                type: "button",
                label: "delete",
                operation: def,
              },
            ]
          },

          {
            ID: 2,
            Name: "UI/UX Program",
            Position: "89,999",
            Actions: [
              {
                type: "button",
                label: "save",
                operation: abc,
              },
              {
                type: "button",
                label: "delete",
                operation: def,
              },
            ]
          },
          {
            ID: 3,
            Name: "Data Science Program",
            Position: "99,989",
            Actions: [
              {
                type: "button",
                label: "save",
                operation: abc,
              },
              {
                type: "button",
                label: "delete",
                operation: def,
              },
            ]
          },
        ]}
      />
    </>
  );
};

export default newTable;
