import React, { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { Link } from "react-router-dom";

const Showdata = () => {
  const [record, setrecord] = useState([]);

  const fetchdatafromdb = async () => {
    await getDocs(collection(db, "records")).then((data) => {
      const newdata = data.docs.map((rec) => ({
        ...rec.data(),
        id: rec.id,
      }));
      setrecord(newdata);
    });
  };
  console.log(record);

  // handledelete the data

  const handleDelete = (deleteItem) => {
    const deletedoc = deleteDoc(doc(db, "records", deleteItem))
      .then(() => {
        alert("Deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        alert("Cannot delete document. Please try again.");
      });
  };

  // handleubdate function to update current documebt

  const handleUpdate = (updateid) => {
    let name = prompt("Enter name to updated");
    let email = prompt("Enter email to updated");
    let place = prompt("Enter place to updated");
    let age = prompt("Enter age to updated");

    let updatevalue = {
      username: name,
      email: email,
      place: place,
      age: age,
    };

    const docRef = updateDoc(doc(db, "records", updateid), updatevalue)
      .then(() => {
        alert("updated");
      })
      .catch(() => {
        alert("cannot update");
      });
  };

  useEffect(() => {
    fetchdatafromdb();
  });
  return (
    <>
      <Link to="/Form" className="text-xl m-4 my-5">
        Back
      </Link>
      <div className="container">
        <h2 className="text-center text-success mt-4 text-decoration-underline">
          Users Details
        </h2>
        <br />

        {/* table */}
        <table
          className=" table table-success table-hover table-striped p-3"
          style={{ overflowoverflowX: "scroll" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Place</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {record.map((record, i) => {
              return (
                <tr key={i}>
                  <td>{record.username}</td>
                  <td>{record.email}</td>
                  <td>{record.place}</td>
                  <td>{record.age}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(record.id);
                      }}
                    >
                      Delete
                    </button>{" "}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleUpdate(record.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Showdata;
