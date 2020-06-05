package com.google.sps.containers;


/**
 * This Class is desgin to be a container for comments.
 *
 * The Comment object stores message and author's name of a comment.
 */
 public final class Comment{

  private String name;
  private String cmtMsg;

  public Comment(String name, String cmtMsg){
    this.name = name;
    this.cmtMsg = cmtMsg;
  }
}
