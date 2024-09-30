package com.eventservice.service;


import com.eventservice.exceptions.EventNotFoundException;
import com.eventservice.hibernate.HibernateUtils;
import com.eventservice.model.event.DTO.EventDTO;
import com.eventservice.model.event.DTO.EventMapper;
import com.eventservice.model.event.Event;
import org.hibernate.Session;
import org.hibernate.Transaction;


import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;


@Service
public class EventService {


    private static final Logger logger = LoggerFactory.getLogger(EventService.class);

    private final ConnectService connectService;
    @Autowired
    public EventService(ConnectService connectService) {
        this.connectService = connectService;
    }


    public EventDTO findById(Long id) {
        try {
            Event event = HibernateUtils.startSession().get(Event.class, id);
            HibernateUtils.closeSession();
            if (event == null) {
                return null;
            } else {
                EventDTO eventDTO = EventMapper.INSTANCE.eventToEventDTO(event);
                return eventDTO;
            }
        } catch (Exception e) {
            logger.error("Error in findById: ", e);
            return null;
        }
    }

    public EventDTO saveEvent(EventDTO eventDTO) {
        Session session = null;
        try {
            Event event = EventMapper.INSTANCE.eventDTOToEvent(eventDTO);
            session = HibernateUtils.startSession();
            session.getTransaction().begin();
            session.persist(event);
            session.getTransaction().commit();
            connectService.addTagList(event.getId(),eventDTO.getTags());
        } catch (Exception e) {
            logger.error("Error in saveBook: ", e);
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
        return eventDTO;
    }

    public List<EventDTO> findAll() {
        Session session = null;
        try {
            session = HibernateUtils.startSession();
            List<Event> events = session.createQuery("FROM Event").list();
            List<EventDTO> eventDTOs = new ArrayList<>();
            for (Event event : events) {
                EventDTO eventDTO = EventMapper.INSTANCE.eventToEventDTO(event);
                eventDTO.setTags(connectService.getTagList(eventDTO.getId()));
                eventDTOs.add(eventDTO);
            }
            return eventDTOs;
        } catch (Exception e) {
            logger.error("Error in findAll: ", e);
            return new ArrayList<>();
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
    }

    public void deleteById(Long id) {
        Session session = null;
        try {
            session = HibernateUtils.startSession();
            Event book = session.get(Event.class, id);
            if(book==null){
                throw new EventNotFoundException("Ивент не найдена: " + id);
            }
            else {
                session.beginTransaction();
                session.remove(book);
                session.getTransaction().commit();
            }
        } catch (Exception e) {
            logger.error("Error in deleteById: ", e);
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
    }

    public List<EventDTO> findByTitle(String title) {
        Session session = null;
        try {
            session = HibernateUtils.startSession();
            String hql = "FROM Event WHERE title = :name";
            Query<Event> query = session.createQuery(hql);
            query.setParameter("name", title);
            List<Event> events = query.getResultList();
            if(events.size() == 0){
                throw new EventNotFoundException("Ивенты не найдены");
            }
            else {
                List<EventDTO> eventDTOs = new ArrayList<>();
                for (Event event : events) {
                    EventDTO eventDTO = EventMapper.INSTANCE.eventToEventDTO(event);
                    eventDTO.setTags(connectService.getTagList(eventDTO.getId()));
                    eventDTOs.add(eventDTO);
                }
                return eventDTOs;
            }
        } catch (Exception e) {
            logger.error("Error in findByIsbn: ", e);
            return new ArrayList<>();
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
    }


    public EventDTO updateEvent(EventDTO eventDTO) {
        Session session = HibernateUtils.startSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(EventMapper.INSTANCE.eventDTOToEvent(eventDTO));
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        } finally {
            HibernateUtils.closeSession();
        }
        return eventDTO;
    }



}
