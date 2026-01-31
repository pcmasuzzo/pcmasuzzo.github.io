---
layout: default
title: "my cancer chronicle: methodology"
permalink: /pages/cancer/cancer-chronicle-methodology/
---

### my cancer chronicle: methodology 

This page illustrates a bit how I gathered the data presented in [my cancer chronicle](/pages/cancer/cancer-chronicle/).
As I mention in [this other page](/pages/cancer/blood-data/), in Flanders, Belgium - where I live - patients can have access to their medical data through a **digital collaboration platform** called [CoZo](https://www.cozo.be/){:target="_blank"}. Different types of data can be found there:
- blood analysis results, usually in _pdf_ files
- letters of referrals from doctors
- hospital discharge letters 
- images of exams that take place at radiology
- medication plans and instructions
- ...

### imaging data: from DICOM to an open format that I could look at and reuse
Now, I was particularly interested in the imaging data. If you are navigating CoZo, imaging datasets are displayed in a third-party platform called [Sectra Uniview](https://medical.sectra.com/product/sectra-uniview/){:target="_blank"}. The experience online is really smooth (though it's always best to let a physician walk you through medical data), and from there you can even download a full set of images. 

This is great, of course, but once you have downloaded the images, you realize that they are stored in a format that your computer doesn't know how to open or process. This format is called _DICOM_ and it's **the** [standard format for Digital Imaging and Communications in Medicine](https://en.wikipedia.org/wiki/DICOM){:target="_blank"}. This common format makes sure that different imaging machines and software from different manufacturers (like CT scanners, MRIs, X-ray machines, and computers) can easily read, store, and share the same images and patient data with each other. In one word, the format ensures **interoperability**. This means that your data can be read across hospitals, research units, different machines in the same hospital. Lovely concept, really.

But still, because the format contains patients metadata along with the image data, you can't just go ahead and open an image like you would normally do. There are open source viewers available online ([this](https://weasis.org/en/index.html){:target="_blank"} seems like a good one), but I really wanted to have access to the pixels, so I ended up using the **[pydicom](https://pydicom.github.io/pydicom/stable/){:target="_blank"}** open source library.  

It's really easy to use, you can find a rather trivial script [here](/scripts/convert_dcm.py){:target="_blank"}.
