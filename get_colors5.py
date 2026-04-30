from PIL import Image

img = Image.open("/Users/kylenmcclintock/.gemini/antigravity/brain/f31cce1e-2a1e-48b0-be10-6be867635ca1/media__1777507922559.png")
width, height = img.size

def to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

# Find the first pixel that is not black
target_y = -1
for y in range(height):
    rgb = img.getpixel((width//2, y))[:3]
    if rgb[0] > 50 or rgb[1] > 50 or rgb[2] > 50:
        target_y = y + 20 # go a bit deeper into the button
        break

print(f"Target Y: {target_y}")

if target_y != -1:
    # Find left bound
    left_x = 0
    for x in range(width):
        rgb = img.getpixel((x, target_y))[:3]
        if rgb[0] > 50 or rgb[1] > 50 or rgb[2] > 50:
            left_x = x
            break
            
    # Find right bound
    right_x = width - 1
    for x in range(width-1, -1, -1):
        rgb = img.getpixel((x, target_y))[:3]
        if rgb[0] > 50 or rgb[1] > 50 or rgb[2] > 50:
            right_x = x
            break
            
    print(f"Left X: {left_x}, Right X: {right_x}")
    
    # Sample at 5%, 50%, 95% of the button width
    button_w = right_x - left_x
    w05 = left_x + int(button_w * 0.05)
    w50 = left_x + int(button_w * 0.5)
    w95 = left_x + int(button_w * 0.95)
    
    c1 = img.getpixel((w05, target_y))[:3]
    c2 = img.getpixel((w50, target_y))[:3]
    c3 = img.getpixel((w95, target_y))[:3]
    
    print(f"Left: {to_hex(c1)}")
    print(f"Middle: {to_hex(c2)}")
    print(f"Right: {to_hex(c3)}")
