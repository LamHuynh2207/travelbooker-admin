import React, { useEffect, useState } from 'react';

interface Listing {
    id: string;
    title: string;
    description: string;
    // Add more properties as needed
}

interface ListingPageProps {
    listingId: string;
}

const ListingPage: React.FC<ListingPageProps> = ({ listingId }) => {
    const [listing, setListing] = useState<Listing | null>(null);

    useEffect(() => {
        // Fetch the listing data from your API or database
        const fetchListing = async () => {
            try {
                const response = await fetch(`/api/listings/${listingId}`);
                const data = await response.json();
                setListing(data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };

        fetchListing();
    }, [listingId]);

    if (!listing) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            {/* Render other listing details */}
        </div>
    );
};

export default ListingPage;