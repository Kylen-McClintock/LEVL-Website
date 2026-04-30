from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

# Let's sample a y column at x = 5% to find the background of the button
x = int(width * 0.05)
for y in range(0, height):
    r, g, b = img.getpixel((x, y))[:3]
    # Look for orange/copper (High R, moderate G, low B)
    if r > 150 and g < r - 30 and b < g - 30:
        print(f"Found copper at Y={y}")
        
        # Sample across the button
        w05 = int(width * 0.05)
        w50 = int(width * 0.5)
        w95 = int(width * 0.95)
        
        c1 = img.getpixel((w05, y))[:3]
        c2 = img.getpixel((w50, y))[:3]
        c3 = img.getpixel((w95, y))[:3]
        
        def to_hex(rgb):
            return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
            
        print(f"Left: {to_hex(c1)}")
        print(f"Middle: {to_hex(c2)}")
        print(f"Right: {to_hex(c3)}")
        break
