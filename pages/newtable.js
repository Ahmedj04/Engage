import React,{useState,useEffect} from "react";
import Tables from "../components/utils/Tables";
import { InitialActions, ColorToggler } from '../components/initalActions';
var language;
var currentProperty;
var currentroom;
var currentLogged;
let colorToggle;
function abc() {
  alert("saved");
}
function def() {
  alert("deleted");
}

const NewTable = () => {
  const [property_name, setProperty_name] = useState("")
  const [color, setColor] = useState({})
  const [mode, setMode] = useState()
  /** Use Effect to fetch details from the Local Storage **/
  useEffect(() => {
    const resp = InitialActions({ setColor, setMode })
    language = resp?.language;
    currentLogged = resp?.currentLogged;
    currentProperty = resp?.currentProperty;
    currentroom = localStorage.getItem('RoomId');
    setProperty_name(resp?.currentProperty?.property_name);
    colorToggle = resp?.colorToggle

  }, [])
  return (
    <>
      <Tables
        color={color}
        language={language}
        deleteMultiple={()=>alert("action for delete all")}
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
                label: "Edit",
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
        addEntity={{"action":()=>alert('new add clicked'),
      "label":"Add New"}}
      inlineEdit={true}
      editInfo={
        [
          {"col_name":"ID",
          "input_type":"text",
          "onChangeAction":()=>alert("ID"),
          
        },
        {"col_name":"Name",
          "input_type":"text",
          "onChangeAction":()=>alert("name"),
          
        },
        {"col_name":"Position",
          "input_type":"dropdown",
          "onChangeAction":()=>alert("position"),
          "values":[{
            "label":"item1",
            "value":"item1",
          },{
            "label":"item2",
            "value":"item2",
          },{
            "label":"item3",
            "value":"item3",
          }]
        }
         ]
        }
      />
    </>
  );
};

export default NewTable;
