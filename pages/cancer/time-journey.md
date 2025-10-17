---
layout: time-journey
custom_css: time-journey.css
custom_js: time-journey.js
title: "time journey"
permalink: /pages/cancer/time-journey/
---

### reconstructing a journey
This page chronicles my journey from a cancer diagnosis through the treatments that led to remission. Please note this isn't a medical manual, nor is it a benchmark for how quickly or slowly a cancer journey should unfold.   **It is simply my story**.

As part of my [cancer archive](/pages/cancer/cancer-archive/), this is a **personal reconstruction of events**. My goal is to remember the long road I traveled, while hopefully helping someone else navigating the overwhelming experience of a (breast) cancer diagnosis.

 > I believe there is profound comfort in knowledge, and immense power in our ability to access it.

### how does this work
Explore the timeline below to see the pivotal moments that started in October 2023, the month I learned I had triple-negative breast cancer. You can click on each date (each dot) to **uncover the medical records from that day**. These files, images, and notes were the individual pieces that formed the larger picture of my diagnosis.

But before you dive in, let me share how I gathered all this data.
As I mention in [this other page](/pages/cancer/blood-data/), in Flanders, Belgium - where I live - patients can have access to their medical data through a **digital collaboration platform** called [CoZo](https://www.cozo.be/). Different types of data can be found there:
- blood analysis results, usually in pdf files
- letters of referrals from doctors
- hospital discharge letters 
- images of exams that take place at radiology
- medication plans and instructions
- ...

Now, I was particularly interested in the imaging data. If you are navigating CoZo, imaging datasets are displayed in a third-party platform called [Sectra Uniview](https://medical.sectra.com/product/sectra-uniview/). The experience online is really smooth (though it's always best to let a physician walk you through medical data), and from there you can even download a full set of images. 

This is great, of course, even though the only way to download the images is in the _DICOM format_. DICOM is the [standard format for Digital Imaging and Communications in Medicine](https://en.wikipedia.org/wiki/DICOM) that makes sure that different imaging machines and software from different manufacturers (like CT scanners, MRIs, X-ray machines, and computers) can easily read, store, and share the same images and patient data with each other. In one word: **interoperability**. I LOVE IT!

However, because the format contains image data along with patients metadata, you just can't go ahead and open an image like you normally would. There are open source viewers available online, but I really wanted to have access to the pixels, so I used the **[pydicom](https://pydicom.github.io/pydicom/stable/)** open source library. It's really easy to use, you can find a trivial script [here](/scripts/convert_dcm.py).




