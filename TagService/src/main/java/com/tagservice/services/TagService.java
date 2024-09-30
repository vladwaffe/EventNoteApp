package com.tagservice.services;

import com.tagservice.exceptions.TagNotFoundException;
import com.tagservice.hibernate.HibernateUtils;
import com.tagservice.model.Tag;
import com.tagservice.model.TagEnum;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TagService {


    public Tag saveTag(Long id, List<TagEnum> tagEnumList) {
        Session session = null;
        StringBuilder tagStr = new StringBuilder();
        for(TagEnum tagEnum : tagEnumList){
            tagStr.append(tagEnum).append(",");
        }
        System.out.println(tagStr);
        Tag tag = new Tag(id, tagStr.toString());
        try {
            session = HibernateUtils.startSession();
            session.getTransaction().begin();
            session.persist(tag);
            session.getTransaction().commit();
        } catch (Exception e) {
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
        return tag;
    }


    public List<TagEnum> getTagsById(Long id){
        List<TagEnum> tagEnumList = new ArrayList<>();
        Session session = null;
        try{
            session = HibernateUtils.startSession();
            Tag tag = session.get(Tag.class, id);
            if(tag == null){
                throw new TagNotFoundException("Тег не найден " + id);
            }else{
                String tagString = tag.getTags();
                System.out.println(tagString);
                String[] splitedTags = tagString.split(",");
                System.out.println(Arrays.toString(splitedTags));
                for (String a : splitedTags) {
                    System.out.println(a);
                    tagEnumList.add(TagEnum.valueOf(a));
                }
            }
        } catch (Exception e) {
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
        System.out.println(tagEnumList);
        return tagEnumList;
    }

    public void deleteById(Long id) {
        Session session = null;
        try {
            session = HibernateUtils.startSession();
            Tag tag = session.get(Tag.class, id);
            if(tag==null){
                throw new TagNotFoundException("Книга не найдена: " + id);
            }
            else {
                session.beginTransaction();
                session.remove(tag);
                session.getTransaction().commit();
            }
        } catch (Exception e) {
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                HibernateUtils.closeSession();
            }
        }
    }
    public Tag updateTag(Tag tag) {
        Session session = HibernateUtils.startSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(tag);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        } finally {
            HibernateUtils.closeSession();
        }
        return tag;
    }



}
