from PIL import Image
import os

def split_image(input_path, output_dir, prefix, grid_size=(2, 2)):
    img = Image.open(input_path)
    width, height = img.size
    rows, cols = grid_size
    
    cell_width = width // cols
    cell_height = height // rows
    
    for r in range(rows):
        for c in range(cols):
            left = c * cell_width
            top = r * cell_height
            right = left + cell_width
            bottom = top + cell_height
            
            # Crop the cell
            cropped = img.crop((left, top, right, bottom))
            
            # Save
            index = r * cols + c
            output_path = os.path.join(output_dir, f"{prefix}_{index}.png")
            cropped.save(output_path)
            print(f"Saved: {output_path}")

# Batch 1: PostgreSQL, Spring Boot, GSAP, Three.js
split_image(
    r"C:\Users\rishi\.gemini\antigravity\brain\2bbddffe-6a5c-4b25-b47b-4a357dbe5210\skill_icons_batch_1_1778070646830.png",
    r"c:\Users\rishi\Downloads\dev-portfolio-master\dev-portfolio-master\public\images\skills",
    "batch1"
)

# Batch 2: Locomotive, TanStack, VS Code (3 icons, 2x2 grid, index 0,1,2 used)
split_image(
    r"C:\Users\rishi\.gemini\antigravity\brain\2bbddffe-6a5c-4b25-b47b-4a357dbe5210\skill_icons_batch_2_1778070665820.png",
    r"c:\Users\rishi\Downloads\dev-portfolio-master\dev-portfolio-master\public\images\skills",
    "batch2"
)
