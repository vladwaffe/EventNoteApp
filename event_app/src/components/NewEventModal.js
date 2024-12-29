import React, { useState } from 'react';
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

const NewEventModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [maxPeopleCanTakePart, setMaxPeopleCanTakePart] = useState(100);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [eventImage, setEventImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');


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

    const handleCreate = async (e) => {
        e.preventDefault();

        const eventData = {
            title,
            description,
            maxPeopleCanTakePart,
            startTime,
            endTime,
            tags: selectedTags.map(tag => tag.value)
        };
        onCreate(eventData, eventImage);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay1">
            <div className="modal-content1 slide-in">
                <form className="allForm" onSubmit={handleCreate}>
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
                            <input type="datetime-local" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                        </div>
                        <div className="endTimeForm Form">
                            <label htmlFor="endTime">End Time:</label>
                            <input type="datetime-local" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                        </div>
                        <div className="tagsForm Form">
                            <label htmlFor="tags">Tags:</label>
                            <Select
                                isMulti
                                name="tags"
                                options={tagOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={setSelectedTags}
                            />
                        </div>
                        <div className="buttonForm">
                            <button className="butSub" type="submit">Create Event</button>
                            <button type="button" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEventModal;
