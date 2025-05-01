import axios from 'axios';

export const fetchheadline = async () => {
    try {
        const response = await axios.get('http://localhost:5000//headline'); // Replace with your API endpoint
        return response.data; // Return the API data
    } catch (error) {
        console.error('Error fetching news data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
