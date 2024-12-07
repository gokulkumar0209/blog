"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";

export default function Home() {
	const [isClient, setIsClient] = useState(false);
	const [data, setData] = useState(null); // State to hold the fetched data

	useEffect(() => {
		// This will run only on the client side
		async function fetchData() {
			try {
				const response = await axios.get(
					"https://forinterview.onrender.com/people"
				);
				setData(response.data); // Update the state with the fetched data
				console.log(response.data); // Log the data for debugging
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
		setIsClient(true); // Set the client flag to true
	}, []);

	if (!isClient) {
		return null; // Avoid rendering until the client-side is ready
	}

	return (
		<div className="bg-green-600">
			{/* Hero component */}
			<Hero />

			{/* You can render the fetched data here if needed */}
			{data && (
				<div>
					<h2>Fetched Data:</h2>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}
