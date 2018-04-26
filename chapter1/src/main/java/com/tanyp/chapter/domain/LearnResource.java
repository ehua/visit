package com.tanyp.chapter.domain;

import java.io.Serializable;

/**
 * Created by tanyp on 2018/4/26
 */
public class LearnResource implements Serializable {

    private String author;
    private String title;
    private String url;

    public LearnResource(String author, String title, String url) {
        this.author = author;
        this.title = title;
        this.url = url;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
