import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FaCamera } from 'react-icons/fa';
import './EditEventModal.css';

const tagOptions = [
    { value: 'SPORT', label: 'SPORT' },
    { value: 'VOLLEYBALL', label: 'VOLLEYBALL' },
    { value: 'TABLE_TENNIS', label: 'TABLE_TENNIS' },
    { value: 'FOOTBALL', label: 'FOOTBALL' },
    { value: 'COMPUTER_GAMES', label: 'COMPUTER_GAMES' },
    { value: 'PROGRAMING', label: 'PROGRAMING' },
    { value: 'VSU', label: 'VSU' },
    { value: 'FMIIT', label: 'FMIIT' },
    { value: 'GYM', label: 'GYM' },
    { value: 'ASSEMBLY_HALL', label: 'ASSEMBLY_HALL' },
];

const EditEventModal = ({ isOpen, onClose, onUpdate, initialData }) => {
    const [id, setId] = useState(initialData.id);
    const [title, setTitle] = useState(initialData.title);
    const [description, setDescription] = useState(initialData.description);
    const [maxPeopleCanTakePart, setMaxPeopleCanTakePart] = useState(initialData.maxPeopleCanTakePart);
    const [startTime, setStartTime] = useState(initialData.startTime);
    const [endTime, setEndTime] = useState(initialData.endTime);
    const [selectedTags, setSelectedTags] = useState(initialData.tags.map(tag => ({ value: tag, label: tag })));
    const [eventImage, setEventImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData.imageUrl);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/image/${initialData.id}`, {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImagePreview(imageUrl);
            } catch (error) {
                console.error('Ошибка при загрузке изображения:', error);
            }
        };

        fetchImage();

        setId(initialData.id);
        setTitle(initialData.title);
        setDescription(initialData.description);
        setMaxPeopleCanTakePart(initialData.maxPeopleCanTakePart);
        setStartTime(initialData.startTime);
        setEndTime(initialData.endTime);
        setSelectedTags(initialData.tags.map(tag => ({ value: tag, label: tag })));
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEventImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const eventData = {
            id,
            title,
            description,
            maxPeopleCanTakePart,
            startTime,
            endTime,
            tags: selectedTags.map(tag => tag.value)
        };

        onUpdate(eventData, eventImage);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay1">
            <div className="modal-content1 slide-in">
                <form className="allForm" onSubmit={handleUpdate}>
                    <div className="imageForm">
                        <input
                            type="file"
                            id="eventImage"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="eventImage" className="image-upload">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Event Preview" className="image-preview" />
                            ) : (
                                <FaCamera size={48} />
                            )}
                        </label>
                    </div>
                    <div className="form-fields">
                        <div className="titleForm Form">
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="descriptionForm Form">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="maxPeopleCanTakePartForm Form">
                            <label htmlFor="maxPeopleCanTakePart">Max People Can Take Part:</label>
                            <input type="number" id="maxPeopleCanTakePart" value={maxPeopleCanTakePart} onChange={(e) => setMaxPeopleCanTakePart(e.target.value)} required />
                        </div>
                        <div className="startTimeForm Form">
                            <label htmlFor="startTime">Start Time:</label>
                            <input id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                        </div>
                        <div className="endTimeForm Form">
                            <label htmlFor="endTime">End Time:</label>
                            <input id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                        </div>
                        <div className="tagsForm Form">
                            <label htmlFor="tags">Tags:</label>
                            <Select isMulti name="tags" options={tagOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={selectedTags}
                                    onChange={setSelectedTags} />
                        </div> <div className="buttonForm">
                        <button className="butSub" type="submit">Update Event</button>
                        <button type="button" onClick={onClose}>Close</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;