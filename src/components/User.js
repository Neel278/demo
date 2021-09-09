import React, { useEffect, useState } from "react";
import "./User.css";

const API_URL =
  "https://cdn.shopify.com/s/files/1/1827/5807/files/test.json?v=12";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [uniqueData, setUniqueData] = useState([]);
  const [peopleNumber, setPeopleNumber] = useState();

  const getUserData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>Country</td>
          <td>Total People</td>
        </tr>
        {userData.map((data) => {
          if (uniqueData.indexOf(data.location.country) === -1) {
            uniqueData.push(data.location.country);
          }
          console.log(uniqueData);
        })}

        {uniqueData.map((data, index) => (
          <tr key={index}>
            <td>{data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default User;
