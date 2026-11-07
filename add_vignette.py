import sys
import os
import math
from PIL import Image

def apply_vignette(input_path, output_path):
    img = Image.open(input_path).convert('RGB')
    width, height = img.size
    
    # Calculate center and max radius
    cx = width / 2
    cy = height / 2
    # Use the smaller dimension to ensure the vignette reaches the closest edge,
    # or just use distance to center relative to width/height to make it elliptical
    
    data = img.getdata()
    newData = []
    
    # We want it to start fading at 50% from center to edge, and be 0% at 90% to edge
    inner_radius = 0.5
    outer_radius = 0.85
    
    for y in range(height):
        for x in range(width):
            # Normalized distance from center (0 to 1)
            # Elliptical distance
            dx = (x - cx) / cx
            dy = (y - cy) / cy
            dist = math.sqrt(dx*dx + dy*dy)
            
            if dist < inner_radius:
                factor = 1.0
            elif dist > outer_radius:
                factor = 0.0
            else:
                # Smoothstep or linear fade
                t = (dist - inner_radius) / (outer_radius - inner_radius)
                factor = 1.0 - t
                # Smoothstep for better falloff
                factor = factor * factor * (3 - 2 * factor)
                
            idx = y * width + x
            r, g, b = data[idx]
            
            new_r = int(r * factor)
            new_g = int(g * factor)
            new_b = int(b * factor)
            
            newData.append((new_r, new_g, new_b))
            
    img.putdata(newData)
    img.save(output_path, "PNG")

def main():
    base_dir = '/Users/kylenmcclintock/.gemini/antigravity/brain/6207a804-339d-4782-8977-662509a7f4da/'
    images = [
        ('platform_thesis_visual_1778704851137.png', 'platform-visual-2.png'),
        ('literature_engine_visual_1778704881276.png', 'literature_engine_visual.png'),
        ('longevity_graph_visual_1778704911001.png', 'platform-visual.png'),
        ('synergy_engine_visual_1778704934765.png', 'synergy_engine_visual.png'),
        ('protocol_app_visual_1778704959150.png', 'protocol_app_visual.png'),
        ('feedback_loop_visual_1778704989552.png', 'feedback_loop_visual.png'),
    ]

    for artifact_name, target_name in images:
        input_path = os.path.join(base_dir, artifact_name)
        output_path = os.path.join('public/images', target_name)
        print(f"Processing {input_path} -> {output_path}")
        try:
            apply_vignette(input_path, output_path)
            print("Success")
        except Exception as e:
            print(f"Failed: {e}")

if __name__ == "__main__":
    main()
