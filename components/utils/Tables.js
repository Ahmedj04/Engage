import React from 'react'

function Tables({ cols = [], data = [{}] }) {
        return (
                <div className="table">
                        <h1>Table</h1>
                        <table>
                                <thead>
                                        <tr>
                                                {cols.map((col, index) => {
                                                        return <th key={index}>{col === "checkbox" ? <input type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" /> : col}</th>
                                                })}
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                data.map((item, key) => {
                                                        return (<tr key={key}>
                                                                {cols.map((col, ID) => (
                                                                        <td key={ID}>
                                                                                {col === "Actions" ? <>{(item[col]?.map((i, idx) => {
                                                                                        return (<button key={idx} onClick={() => { i?.operation() }}>{i?.label}</button>)
                                                                                }))}
                                                                                </> : col === 'checkbox' ? <><input type="checkbox" className="bg-gray-50 border-gray-300 text-cyan-600  focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" /></> : item[col]}
                                                                        </td>
                                                                )
                                                                )}
                                                        </tr>)
                                                }
                                                )
                                        }
                                </tbody>
                        </table>
                </div>)
}
export default Tables 
