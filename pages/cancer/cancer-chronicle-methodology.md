---
layout: default
title: "my cancer chronicle: methodology"
permalink: /pages/cancer/cancer-chronicle-methodology/
---

### my cancer chronicle: methodology 

This page illustrates a bit how I gathered the data presented in the [cancer journey timeline](/pages/cancer/cancer-chronicle/).
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
