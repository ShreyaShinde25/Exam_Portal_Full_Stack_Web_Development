package com.exam.model.exam;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="category")
public class Category{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;
    private String title;
    private String description;


    //relationship between Quiz and Category (1 category can have many quizzes)
    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER, cascade = CascadeType.ALL) //Quiz table me category column hoga which will be mapped by category variable
    @JsonIgnore
    private Set<Quiz> quizzes= new LinkedHashSet<>();

    public Category(String title, String description) {
        this.title =title;
        this.description=description;
    }

    public Category(){

    }

    public Long getCid() {
        return cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
