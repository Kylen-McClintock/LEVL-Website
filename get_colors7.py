from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

def to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

valid_pixels = []
for y in range(0, height, 5):
    for x in range(0, width, 5):
        r, g, b = img.getpixel((x, y))[:3]
        # Ignore black/dark gray and ignore white text
        if (r > 50 or g > 50 or b > 50) and not (r > 200 and g > 200 and b > 200):
            valid_pixels.append((x, y, r, g, b))

# Group valid pixels by X coordinate to find the leftmost, middle, rightmost bounds of the gradient
valid_pixels.sort(key=lambda p: p[0])
if valid_pixels:
    left_p = valid_pixels[0]
    right_p = valid_pixels[-1]
    
    # Let's find the gradient colors at a specific Y where we have a lot of valid pixels
    from collections import Counter
    y_counts = Counter([p[1] for p in valid_pixels])
    best_y = y_counts.most_common(1)[0][0]
    
    # Filter for best_y
    row_pixels = [p for p in valid_pixels if p[1] == best_y]
    row_pixels.sort(key=lambda p: p[0])
    
    if len(row_pixels) > 10:
        c1 = row_pixels[int(len(row_pixels)*0.05)]
        c2 = row_pixels[int(len(row_pixels)*0.5)]
        c3 = row_pixels[int(len(row_pixels)*0.95)]
        
        print(f"Left: {to_hex(c1[2:])}")
        print(f"Middle: {to_hex(c2[2:])}")
        print(f"Right: {to_hex(c3[2:])}")
