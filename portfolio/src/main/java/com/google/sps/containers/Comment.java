package com.google.sps.containers;


/**
 * This Class is desgin to be a container for comments.
 *
 * The Comment object stores message, author's name, and date posted of a comment.
 */
 public final class Comment{

  private String name;
  private String cmtMsg;
  private String date;

  public Comment(String name, String cmtMsg, String date){
    this.name = name;
    this.cmtMsg = cmtMsg;
    this.date = date;
  }
}
