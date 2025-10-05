import os

# Constants
IMAGE_FOLDER = "assets/images/igotup"
OUTPUT_FILE = "_includes/igotup-gallery.html"
VALID_EXTENSIONS = (".jpg", ".jpeg", ".png", ".gif", ".webp")

# Get sorted list of image files
images = sorted(
    f for f in os.listdir(IMAGE_FOLDER)
    if f.lower().endswith(VALID_EXTENSIONS)
)

# Ensure output folder exists
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

# Generate HTML
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    for img in images:
        f.write('  <div class="gallery-item">\n')
        f.write(f'    <div style="background-image: url(\'{{{{ site.baseurl }}}}/assets/images/igotup/{img}\')" alt="{img}" data-image-url="{{{{ site.baseurl }}}}/assets/images/igotup/{img}"></div>\n')
        f.write('  </div>\n')

print(f"✅ Gallery HTML generated: {OUTPUT_FILE}")
