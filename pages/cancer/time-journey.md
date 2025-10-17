---
layout: default
custom_css: time-journey.css
custom_js: time-journey.js
title: "time travel"
permalink: /pages/cancer/time-journey/
---

### traveling back in time

<div class="timeline-container">
  
<div class="timeline">
    {% assign first_date = site.data.timeline.first.date | date: "%s" %}
    {% assign last_date = site.data.timeline.last.date | date: "%s" %}
    {% assign total_range = last_date | minus: first_date %}
    
    {% for entry in site.data.timeline %}
      {% assign current_date = entry.date | date: "%s" %}
      {% assign days_from_start = current_date | minus: first_date %}
      {% assign position_percent = days_from_start | times: 100.0 | divided_by: total_range %}
      
      <div class="timeline-entry" 
           data-date="{{ entry.date }}"
           data-events='{{ entry.events | jsonify }}'
           style="margin-top: {{ position_percent }}%;">
        <div class="timeline-dot"></div>
        <div class="timeline-date">{{ entry.date | date: "%b %d, %Y" }}</div>
      </div>
    {% endfor %}
  </div>
  
</div>