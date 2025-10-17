---
layout: default
custom_css: time-travel.css
custom_js: time-travel.js
title: "time travel"
permalink: /pages/cancer/time-travel/
---

### traveling back in time

<div class="timeline-container">
  <h1>My Cancer Journey</h1>
  
  <div class="timeline">
    {% for entry in site.data.timeline %}
      <div class="timeline-entry" data-date="{{ entry.date }}">
        <div class="timeline-dot"></div>
        <div class="timeline-date">{{ entry.date | date: "%b %d, %Y" }}</div>
      </div>
    {% endfor %}
  </div>
</div>