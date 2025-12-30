from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=3):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150))      # Resize for faster processing
        pixels = list(image.getdata())
        counts = Counter(pixels)
        dominant = counts.most_common(num_colors)
        
        print("Extracted Colors:")
        for color, count in dominant:
            hex_color = "#{:02x}{:02x}{:02x}".format(color[0], color[1], color[2])
            print(hex_color)
            
    except Exception as e:
        print(f"Error: {e}")

get_dominant_colors(r"C:/Users/Shreesh/.gemini/antigravity/brain/422595d1-a46a-411d-b178-475b76cb2b66/uploaded_image_1767095407794.png")
