import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import NewEventModal from './NewEventModal';
import EditEventModal from './EditEventModal';
import axios from 'axios';
import { useToken } from '../TokenContext';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 12;
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(0);
    const { token } = useToken();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/all');
                setEvents(response.data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        const checkAdminRole = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/auth/role', {
                        params: { token }
                    });
                    setIsAdmin(response.data === 'ADMIN');
                } catch (error) {
                    console.error('Ошибка проверки роли:', error);
                }
            } else {
                setIsAdmin(false);
            }
        };

        fetchEvents();
        checkAdminRole();
    }, [updateCounter, token]);

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/event/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleAddEvent = async (eventData, eventImage) => {
        try {
            const response = await axios.post('http://localhost:8080/event/add', eventData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const eventId = response.data.id;

            if (eventImage) {
                const formData = new FormData();
                formData.append('image', eventImage);

                await axios.post(`http://localhost:8080/image/${eventId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setEvents([...events, response.data]);
        } catch (error) {
            console.error('Error creating event:', error);
            console.log('Error response:', error.response);
        }
    };

    const handleEditEvent = (id) => {
        const eventToEdit = events.find(event => event.id === id);
        setCurrentEvent(eventToEdit);
        setShowEditEventModal(true);
    };

    const handleUpdateEvent = async (eventData, eventImage) => {
        try {
            const response = await axios.put('http://localhost:8080/event/edit', eventData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const updatedEvent = response.data;
            const eventId = updatedEvent.id;

            if (eventImage) {
                const formData = new FormData();
                formData.append('image', eventImage);

                await axios.put(`http://localhost:8080/image/${eventId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            setEvents(events.map(event => (event.id === eventData.id ? response.data : event)));
            setUpdateCounter(updateCounter + 1);
        } catch (error) {
            console.error('Error updating event:', error);
            console.log('Error response:', error.response);
        }
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(events.length / eventsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="eventListContainer">
            {token && isAdmin && (
                <button className="addEventButton" onClick={() => setShowNewEventModal(true)}>Add Event</button>
            )}
            <div className="eventList">
                {currentEvents.map((event) => (
                    <EventItem
                        key={event.id}
                        event={event}
                        onDelete={token && isAdmin ? () => handleDeleteEvent(event.id) : null}
                        onEdit={token && isAdmin ? () => handleEditEvent(event.id) : null}
                        showActions={token && isAdmin}
                        updateCounter={updateCounter}
                    />
                ))}
            </div>
            {events.length > eventsPerPage && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(events.length / eventsPerPage)}>
                        Next
                    </button>
                </div>
            )}
            <NewEventModal
                isOpen={showNewEventModal}
                onClose={() => setShowNewEventModal(false)}
                onCreate={handleAddEvent}
            />
            {currentEvent && (
                <EditEventModal
                    isOpen={showEditEventModal}
                    onClose={() => setShowEditEventModal(false)}
                    onUpdate={handleUpdateEvent}
                    initialData={currentEvent}
                />
            )}
        </div>
    );
};

export default EventList;
