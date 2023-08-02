import React, { useState, useEffect } from 'react'
import foodJsonData from '../config.json';

const Food = () => {
    const [foods, setFoods] = useState([])
    const { API_URL, API_KEY, FDCIDS } = foodJsonData
    const FETCH_API_URL = `${API_URL}?api_key=${API_KEY}&fdcIds=${FDCIDS}`

    // useEffect(() => {
    //     fetch(FETCH_API_URL)
    //     .then(response => response.json())
    //     .then(data => setFoods(data))
    // }, [])

    useEffect(() => {
        fetch(FETCH_API_URL)
            .then(response => response.json())
            .then(data => {
                // Assuming the 'foodNutrients' array is in the API response
                if (data && data.length > 0) {
                    console.log(data)
                    setFoods(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className="container">
            <h1>Food List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>UnitName</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foods.map(food => {
                            return food.foodNutrients.map(data => (
                                <tr key={data.id}>
                                    <td>{data.nutrient.id}</td>
                                    <td>{data.nutrient.number}</td>
                                    <td>{data.nutrient.name}</td>
                                    <td>{data.nutrient.rank}</td>
                                    <td>{data.nutrient.unitName}</td>
                                </tr>
                            ))
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Food