import React, { useState } from 'react';

interface ListingFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    title: string;
    description: string;
    price: number;
}

const ListingForm: React.FC<ListingFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <br />
            <label>
                Price:
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ListingForm;