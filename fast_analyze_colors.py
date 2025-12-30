
from PIL import Image

def get_colors(image_path):
    try:
        img = Image.open(image_path)
        img = img.resize((50, 50))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Simple frequency analysis
        pixels = list(img.getdata())
        from collections import Counter
        counts = Counter(pixels)
        most_common = counts.most_common(6)
        
        print("Dominant colors:")
        for color, count in most_common:
            hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
            print(f"{hex_color}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_colors("public/IQMath.webp")
