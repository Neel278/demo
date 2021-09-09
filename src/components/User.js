import React, { useEffect, useState } from "react";
import "./User.css";

const API_URL =
	"https://cdn.shopify.com/s/files/1/1827/5807/files/test.json?v=12";

const User = () => {
	const [userData, setUserData] = useState(new Map());

	const setPopulationAccordingToCountry = (dataOfUsers) => {
		let usersCountryList = new Map();
		dataOfUsers.forEach((dataOfUser) => {
			if (usersCountryList.has(dataOfUser.location.country)) {
				let oldPopulation = usersCountryList.get(dataOfUser.location.country);
				usersCountryList.set(dataOfUser.location.country, ++oldPopulation);
			} else {
				usersCountryList.set(dataOfUser.location.country, 1);
			}
		});
		setUserData(usersCountryList);
	};

	const getUserData = () => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => {
				setPopulationAccordingToCountry(data.results);
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
				{[...userData.entries()].map((data, index) => (
					<tr key={index}>
						<td>{data[0]}</td>
						<td>{data[1]}</td>
					</tr>
				))}

				{/* 	{uniqueData.map((data, index) => (
					<tr key={index}>
						<td>{data}</td>
						<td>{data}</td>
					</tr>
				))} */}
			</tbody>
		</table>
	);
};

export default User;
