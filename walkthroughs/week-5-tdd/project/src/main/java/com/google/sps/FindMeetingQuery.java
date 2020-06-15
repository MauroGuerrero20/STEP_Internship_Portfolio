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
import java.util.ArrayList;
import java.util.HashMap;

public final class FindMeetingQuery {

  private boolean eventNoMandatoryAttendees(MeetingRequest request, Event event){
    for (String attendee : event.getAttendees()){
      if (request.getAttendees().contains(attendee)){
        return false;
      }
    }
    return true;
  }

  private boolean nestedEventsCheck(TimeRange prevTimeRange, TimeRange currTimeRange){
    if(prevTimeRange.start() < currTimeRange.start() && currTimeRange.end() < prevTimeRange.end()){
      return true;
    }
    return false;
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


    int avaliableStart = TimeRange.START_OF_DAY;
    int avaliableEnd;

    for (int index = 0; index < timeRanges.size(); index++){

      Event currentEvent = timeRangeEventMap.get(timeRanges.get(index));

      if (eventNoMandatoryAttendees(request, currentEvent)){
        avaliableEnd = TimeRange.END_OF_DAY;
        availableTimeRanges.add(TimeRange.fromStartEnd(avaliableStart, avaliableEnd, true));
        continue;
      }

      avaliableEnd = timeRanges.get(index).start();
      
      // [##, ##)
      TimeRange avaliableTimeExclusive = TimeRange.fromStartEnd(avaliableStart, avaliableEnd, false);
      // [##, ## + 1)
      TimeRange avaliableTimeInclusive = TimeRange.fromStartEnd(avaliableStart, avaliableEnd, true);

      // Valid TimeRanges Check
      if (!(avaliableTimeExclusive.overlaps(timeRanges.get(index)) || avaliableTimeExclusive.duration() < request.getDuration())){
        availableTimeRanges.add(avaliableTimeExclusive);
      }

      if(!(avaliableTimeInclusive.overlaps(timeRanges.get(index)) || avaliableTimeInclusive.duration() < request.getDuration())){
        availableTimeRanges.add(avaliableTimeInclusive);
      }

      // Nested Events Check
      if (index != 0){

        if (nestedEventsCheck(timeRanges.get(index - 1), timeRanges.get(index))){

          if (index == timeRanges.size() - 1){
            avaliableEnd = TimeRange.END_OF_DAY;
            availableTimeRanges.add(TimeRange.fromStartEnd(avaliableStart, avaliableEnd, true));
          }
          else {
            avaliableEnd = timeRanges.get(index + 1).start();
            availableTimeRanges.add(TimeRange.fromStartEnd(avaliableStart, avaliableEnd, false));
          }
        continue;
        }
      }
      
      // Last Event on list
      if (index == timeRanges.size() - 1){
        
        avaliableStart = timeRanges.get(index).end();
        avaliableEnd = TimeRange.END_OF_DAY;

        TimeRange lastTimeRange = TimeRange.fromStartEnd(avaliableStart, avaliableEnd, true);

        if (!(lastTimeRange.duration() < request.getDuration())){        
          availableTimeRanges.add(lastTimeRange);
        }
      }

      avaliableStart = timeRanges.get(index).end();
    }

    return availableTimeRanges;
  }
}
