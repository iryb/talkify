import React from "react";

export const AddChat = () => {
  return (
    <div>
      <h1>Add Chat</h1>
      <form action="">
        <label htmlFor="level">Level of English</label>
        <select name="level" id="level">
          <option value="a1">A1</option>
          <option value="a2">A2</option>
          <option value="b1">B1</option>
          <option value="b2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
        <label htmlFor="topic">Topic</label>
        <input type="text" id="topic" />
      </form>
    </div>
  );
};
