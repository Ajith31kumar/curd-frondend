import React from 'react';
import { MdClose } from "react-icons/md";
import "../App.css"

const Formtable = ({ handleSubmit, handleOnChange, handleclose, formData, isEdit }) => {
  return (
    <div className="addcontainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name :</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleOnChange} />

        <label htmlFor="mobile">Mobile :</label>
        <input type="number" id="mobile" name="mobile" value={formData.mobile} onChange={handleOnChange} />

        <button type="submit" className="btn">{isEdit ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default Formtable;
