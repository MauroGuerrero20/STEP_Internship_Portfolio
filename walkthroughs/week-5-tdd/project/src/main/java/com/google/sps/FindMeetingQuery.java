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

package com.google.sps;

import java.util.Collection;
import java.util.Collections;
import java.util.ArrayList;
import java.util.HashMap;

public final class FindMeetingQuery {

  /**
   * This method checks if an event contains no mandatory attendees using a MeetingRequest
   * @param request MeetingRequest object which contains list of attendees
   * @param event The Event object's attendees are compare with the request object
   * @return boolean if the provide event object contains no mandatory attendees
   */
  private boolean hasNoMandatoryAttendees(MeetingRequest request, Event event) {
    return Collections.disjoint(event.getAttendees(), request.getAttendees());
  }

  /**
   * This method checks if an event contains only optional Attendees using a MeetingRequest
   * @param request MeetingRequest object which contains list of optional attendees
   * @param event The Event object's attendees are compare with the request object
   * @return boolean if the provide event object contains only optional attendees
   */
  private boolean hasOnlyOptionalAttendees(MeetingRequest request, Event event) {

    for (String attendee : event.getAttendees()){
      if (request.getAttendees().contains(attendee)){
        return false;
      }
      if (!(request.getOptionalAttendees().contains(attendee))){
        return false;
      }
    }
    return true;
  }

  /**
   * This method returns the correct time ranges if optional attendees are taken into account
   * @param optionalEvents List of events with only optional attendees
   * @param timeRanges A list of available TimeRanges without taken into account optional events 
   * @return A list of TimeRanges depending on the optionalEvents list and final size of timeRanges
   */
  private Collection<TimeRange> resolveOptionalEventConflicts(ArrayList<Event> optionalEvents, 
        Collection<TimeRange> timeRanges) {

    ArrayList<TimeRange> removedTimeRanges = new ArrayList<TimeRange>();

    for (Event opEvent : optionalEvents){
      for (TimeRange timeRange : timeRanges){
        if (opEvent.getWhen().overlaps(timeRange)){
          removedTimeRanges.add(timeRange);
        }
      }
    }

    if (timeRanges.size() == removedTimeRanges.size()){
      return removedTimeRanges;
    }

    for (TimeRange removedTimeRange : removedTimeRanges){
      timeRanges.remove(removedTimeRange);
    }
    
    return timeRanges;
  }

  /**
   * This method checks if the previous and current time ranges are nested events
   * @param prevTimeRange Previous TimeRange object
   * @param currTimeRange Current TimeRange object
   * @return true if the TimeRange objects meet the criteria of nested events
   */
  private boolean nestedEventsCheck(TimeRange prevTimeRange, TimeRange currTimeRange) {
    if (prevTimeRange.start() < currTimeRange.start() && currTimeRange.end() < prevTimeRange.end()){
      return true;
    }
    return false;
  }

  /**
   * This method removes optional Events from iterator, timeRanges, if it contains mandatory attendees
   * @param timeRanges iterator, contains all events 
   * @param timeRangeEventMap HashMap object, utilize to find Event object based on given TimeRange
   * @param optionalEvents Empty ArrayList, will contain all optional Events
   * @param removeOpRanges Empty ArrayList, will contain all optional TimeRange objects
   * @param request MeetingRequest object, utilized to check if Event is optional
   * @param onlyOptionalEvents boolean, set to 'true' if timeRanges only contains optional events
   * @return onlyOptionalEvents
   */
  private boolean processOptionalEvents(ArrayList<TimeRange> timeRanges,
                                    HashMap<TimeRange, Event> timeRangeEventMap,
                                    ArrayList<Event> optionalEvents,
                                    ArrayList<TimeRange> removeOpRanges,
                                    MeetingRequest request) {

    for(TimeRange timeRange : timeRanges){

      Event currentEvent = timeRangeEventMap.get(timeRange);

      if (hasOnlyOptionalAttendees(request, currentEvent)){
        optionalEvents.add(currentEvent);
        removeOpRanges.add(timeRange);
      }
    }

    for (TimeRange opTimeRange : removeOpRanges){
      timeRanges.remove(opTimeRange);
    }

    return timeRanges.isEmpty();
  }

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    Collection<TimeRange> availableTimeRanges = new ArrayList<TimeRange>();

    if (request.getDuration() > (long)TimeRange.WHOLE_DAY.duration()){
      return availableTimeRanges;
    }

    if (events.isEmpty()){
      availableTimeRanges.add(TimeRange.WHOLE_DAY);
      return availableTimeRanges;
    }

    HashMap<TimeRange, Event> timeRangeEventMap = new HashMap<TimeRange, Event>();
    ArrayList<TimeRange> timeRanges = new ArrayList<TimeRange>();

    for (Event event : events){
      timeRangeEventMap.put(event.getWhen(), event);
      timeRanges.add(event.getWhen());
    }
    timeRanges.sort(TimeRange.ORDER_BY_START);


    boolean onlyOptionalEvents = false;
    ArrayList<Event> optionalEvents = new ArrayList<Event>();
    ArrayList<TimeRange> removeOpRanges = new ArrayList<TimeRange>();

    onlyOptionalEvents = processOptionalEvents(timeRanges, timeRangeEventMap, optionalEvents, 
                                  removeOpRanges, request);

    if (onlyOptionalEvents){
      timeRanges = removeOpRanges;
    }


    int availableStart = TimeRange.START_OF_DAY;
    int availableEnd;

    for (int index = 0; index < timeRanges.size(); index++){

      Event currentEvent = timeRangeEventMap.get(timeRanges.get(index));

      if (hasNoMandatoryAttendees(request, currentEvent)){
        if (timeRanges.size() == 1){
          availableEnd = TimeRange.END_OF_DAY;
          availableTimeRanges.add(TimeRange.fromStartEnd(availableStart, availableEnd, true));
        }
        if (!onlyOptionalEvents){
          continue;
        }
      }

      availableEnd = timeRanges.get(index).start();
      
      // [##, ##)
      TimeRange availableTimeExclusive = TimeRange.fromStartEnd(availableStart, availableEnd, false);
      // [##, ## + 1)
      TimeRange availableTimeInclusive = TimeRange.fromStartEnd(availableStart, availableEnd, true);

      // Valid TimeRanges Check
      if (!(availableTimeExclusive.overlaps(timeRanges.get(index)) || availableTimeExclusive.duration() < request.getDuration())){
        availableTimeRanges.add(availableTimeExclusive);
      }

      if(!(availableTimeInclusive.overlaps(timeRanges.get(index)) || availableTimeInclusive.duration() < request.getDuration())){
        availableTimeRanges.add(availableTimeInclusive);
      }

      // Nested Events Check
      if (index != 0){

        if (nestedEventsCheck(timeRanges.get(index - 1), timeRanges.get(index))){

          if (index == timeRanges.size() - 1){
            availableEnd = TimeRange.END_OF_DAY;
            availableTimeRanges.add(TimeRange.fromStartEnd(availableStart, availableEnd, true));
          }
          else {
            availableEnd = timeRanges.get(index + 1).start();

            // Extra Check for additional Nested Events
            if (availableStart > availableEnd){
              continue;
            }

            availableTimeRanges.add(TimeRange.fromStartEnd(availableStart, availableEnd, false));
          }
        continue;
        }
      }
      
      // Last Event on list
      if (index == timeRanges.size() - 1){
        
        availableStart = timeRanges.get(index).end();
        availableEnd = TimeRange.END_OF_DAY;

        TimeRange lastTimeRange = TimeRange.fromStartEnd(availableStart, availableEnd, true);

        if (!(lastTimeRange.duration() < request.getDuration())){        
          availableTimeRanges.add(lastTimeRange);
        }
      }

      availableStart = timeRanges.get(index).end();
    }

    availableTimeRanges = resolveOptionalEventConflicts(optionalEvents, availableTimeRanges);

    return availableTimeRanges;
  }
}
