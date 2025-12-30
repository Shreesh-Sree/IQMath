
import colorgram

def get_base_brand_color(image_path):
    try:
        # Extract 6 colors from an image.
        colors = colorgram.extract(image_path, 6)
        
        print("Found colors:")
        for color in colors:
            rgb = color.rgb
            hex_color = '#{:02x}{:02x}{:02x}'.format(rgb.r, rgb.g, rgb.b)
            print(f"- {hex_color} (proportion: {color.proportion})")

    except Exception as e:
        print(f"Error analyzing image: {e}")

if __name__ == "__main__":
    get_base_brand_color("public/IQMath.webp")
