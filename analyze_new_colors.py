import cv2
import numpy as np
from sklearn.cluster import KMeans
from collections import Counter

def get_palette(image_path, n_colors=3):
    image = cv2.imread(image_path)
    if image is None:
        print(f"Error: Could not read image {image_path}")
        return

    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = image.reshape((image.shape[0] * image.shape[1], 3))

    clf = KMeans(n_clusters=n_colors)
    labels = clf.fit_predict(image)
    
    counts = Counter(labels)
    center_colors = clf.cluster_centers_

    ordered_colors = [center_colors[i] for i in counts.keys()]
    hex_colors = [
        "#{:02x}{:02x}{:02x}".format(int(c[0]), int(c[1]), int(c[2])) 
        for c in ordered_colors
    ]

    print("Extracted Colors:")
    for color in hex_colors:
        print(color)

get_palette(r"C:/Users/Shreesh/.gemini/antigravity/brain/422595d1-a46a-411d-b178-475b76cb2b66/uploaded_image_1767095407794.png")
