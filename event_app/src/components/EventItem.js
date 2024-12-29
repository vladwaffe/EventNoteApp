import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const EventItem = ({ event, onDelete, onEdit, showActions, updateCounter }) => {
    const [imageUrl, setImageUrl] = useState('');

    const fetchImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/image/${event.id}`, {
                responseType: 'blob',
            });
            const url = URL.createObjectURL(response.data);
            setImageUrl(url);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [event.id, updateCounter]);
    return (
        <div className="event-card">
            <h2>{event.title}</h2>
            {imageUrl && <img src={imageUrl} alt={event.title} className="event-image" />}
            <p>{event.description}</p>
            <p>Максимальное количество участников: {event.maxPeopleCanTakePart}</p>
            <p>Начало: {new Date(event.startTime).toLocaleString()}</p>
            <p>Окончание: {new Date(event.endTime).toLocaleString()}</p>
            <div className="event-tags">Тэги: {event.tags.join(', ')}</div>
            {showActions && (
                <div className="event-actions">
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default EventItem;
