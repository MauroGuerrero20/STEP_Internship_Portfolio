// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.sps.containers.Comment;
import com.google.gson.Gson;
import java.util.Arrays;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** This Servlet handles and stores the comments provide on the main page */
@WebServlet("/comments")
public class DataServlet extends HttpServlet {

  // Default 20
  private int maxComments = 20;

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null || value.equals("")) {
      return defaultValue;
    }
    return value;
  }

  private String timeMillisToDateStr(long timeMillis){

    SimpleDateFormat dateFormatter = new SimpleDateFormat("d MMM yyyy");
    Date date = new Date(timeMillis);
    String dateStr = dateFormatter.format(date);

    return dateStr;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    
    int prevMaxCmt = maxComments;
    maxComments = Integer.parseInt(getParameter(request, "cmt-max-input", "-1"));

    if (maxComments == -1){
      maxComments = prevMaxCmt;
    }

    String commentStr = getParameter(request, "comments-input", "");
    String commentName = getParameter(request, "cmt-name-input", "Anonymous");
    
    if (!commentStr.equals("")){
      Entity commentEntity = new Entity("Comment");

      commentEntity.setProperty("comment_msg", commentStr);
      commentEntity.setProperty("name", commentName);
      commentEntity.setProperty("timeAtPOST", System.currentTimeMillis());

      datastore.put(commentEntity);
    }

    response.sendRedirect("/");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    
    ArrayList<Comment> commentsList = new ArrayList();

    Query commentsQuery = new Query("Comment").addSort("timeAtPOST", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(commentsQuery);

    for (Entity entity : results.asIterable()){

      Comment cmt = new Comment(
        (String) entity.getProperty("name"),
        (String) entity.getProperty("comment_msg"),
        timeMillisToDateStr((long) entity.getProperty("timeAtPOST")));

      commentsList.add(cmt);
    }

    // Deletes Arraylist items based on max comments
    if (maxComments == 0){
        commentsList.clear();
    }
    else if (maxComments > 0 && maxComments < commentsList.size()){
        commentsList.subList(maxComments, commentsList.size()).clear();
    }

    Gson gson = new Gson();
    String json = gson.toJson(commentsList);

    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}
