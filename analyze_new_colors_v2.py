from PIL import Image
from collections import Counter

def get_colors(image_path):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150))
        pixels = list(image.getdata())
        
        # Filter out near-white and near-black
        filtered_pixels = []
        for r, g, b in pixels:
            # Skip white-ish
            if r > 240 and g > 240 and b > 240:
                continue
            # Skip black-ish (text)
            if r < 20 and g < 20 and b < 20:
                continue
            filtered_pixels.append((r, g, b))
            
        if not filtered_pixels:
            print("No colored pixels found")
            return

        counts = Counter(filtered_pixels)
        dominant = counts.most_common(50) # Get top 50 to find distinct ones
        
        # Simple clustering/grouping to find distinct colors
        distinct_colors = []
        seen_colors = []
        
        for color, count in dominant:
            r, g, b = color
            is_new = True
            for sr, sg, sb in seen_colors:
                dist = abs(r-sr) + abs(g-sg) + abs(b-sb)
                if dist < 50: # Threshold
                    is_new = False
                    break
            
            if is_new:
                seen_colors.append(color)
                hex_color = "#{:02x}{:02x}{:02x}".format(r, g, b)
                distinct_colors.append(hex_color)
                if len(distinct_colors) >= 3:
                    break
        
        print("Extracted Distinct Colors:")
        for c in distinct_colors:
            print(c)
            
    except Exception as e:
        print(f"Error: {e}")

get_colors(r"C:/Users/Shreesh/.gemini/antigravity/brain/422595d1-a46a-411d-b178-475b76cb2b66/uploaded_image_1767095407794.png")
