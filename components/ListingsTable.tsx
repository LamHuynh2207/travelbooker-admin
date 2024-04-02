"use client";
import { Listing } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import axios from "axios";
import { useCallback, useState } from "react"; // Import useState
import toast from "react-hot-toast";

type Props = {
  listings: Listing[];
};

export default function ListingsTable({ listings: initialListings }: Props) {
  // Use useState to manage listings state
  const [listings, setListings] = useState<Listing[]>(initialListings);

  const onDelete = useCallback((id: string) => {
    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        // Update state to remove the deleted listing
        setListings(currentListings => currentListings.filter(listing => listing.id !== id));
        toast.success('Listing deleted');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  }, []);

  // Return with the updated `listings` state
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell>{listing.title}</TableCell>
            <TableCell>{listing.description}</TableCell>
            <TableCell>{listing.category}</TableCell>
            <TableCell>{listing.price}</TableCell>
            <TableCell>
              {/* Apply inline styles or classes for button formatting as needed */}
              <button
                style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}
                onClick={() => { onDelete(listing.id) }}
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}