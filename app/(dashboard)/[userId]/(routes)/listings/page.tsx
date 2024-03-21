import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Listing {
    id: number;
    title: string;
    description: string;
    // Add more properties as needed
}

const ListingsPage: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/listings'); // Replace with your API endpoint
                setListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div>
            <h1>All Listings</h1>
            {listings.map((listing) => (
                <div key={listing.id}>
                    <h2>{listing.title}</h2>
                    <p>{listing.description}</p>
                    {/* Render other listing details here */}
                </div>
            ))}
        </div>
    );
};

export default ListingsPage;