---
layout: default
custom_css: tumor-size-gallery.css
title: "tumor size"
permalink: /pages/cancer/tumor-size/
---

### how bad is it?
I don't know what people mostly ask when they receive a cancer diagnosis. Perhaps something along the line "am I gonna die? what are my options?".

When they told me I had cancer - way before I understood what it actually meant - the question I kind of obsessed over the first 48 hours was: _how bad is it?_. 

For a disease like breast cancer, stage, prognosis, and treatment plan, can all be better understood and planned by first knowing how big the tumor is and assessing the health status of axillary lymph nodes. Now, you might think that getting the _actual_ measurement of a tumor in a breast is an easy task, but it actually is not.  

In order to obtain a faithful estimation, **three measurements are usually correlated**.

The first, approximate measurement comes from an _echography_, which is then often followed by a _mammography_, and finally also by a _magnetic resonance imaging_ (MRI). The last exam is the one that supplies the most accurate measurement.

Knowing the size of the tumor is crucial not only to design the treatment plan, but also to understand if the treatment is working: if chemotherapy is doing what it's supposed to be doing, the tumor will shrink down. How much and how fast is impossible to predict, but the direction - the tumor becoming smaller and smaller - is clear.

### how big is my tumor?
During chemotherapy, I underwent a few ultrasound scans in order to measure my tumor and see if the response we were hoping for was there. The results were not always great, but around February 2024, before I started the last and hardest stretch of chemotherapy, things started moving in the right direction.

So, I took the tumor size as reported in the medical file prepared by my radiologist and I asked myself: **if I could hold this tumor in my hands, what would it look like? which are other things are more or less this size?** I guess a part of me thought it'd be extremely powerful and magical to be able to hold it in my hands and perhaps squeeze it, crash it to death.

Anyhow, I came up with a 8 different things, here they are!

<div class="gallery-grid">
  {% for i in (1..10) %}
  <div class="gallery-item">
    <div style="background-image: url('{{ site.baseurl }}/assets/images/cancer/tumor-size/{{ i }}.png')" alt="{{ i }}" data-image-url="{{ site.baseurl }}/assets/images/cancer/tumor-size/{{ i }}.png"></div>
  </div>
  {% endfor %}
</div>
