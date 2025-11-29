import os
import shutil

source_dir = "react-interview-practice"
target_dir = "."

items_to_move = [
    "src",
    "public",
    "challenge_logs",
    "vite.config.js",
    "eslint.config.js",
    "index.html",
    "INTERVIEW_QUESTIONS.md",
    "README.md"
]

for item in items_to_move:
    src_path = os.path.join(source_dir, item)
    dst_path = os.path.join(target_dir, item)
    
    if os.path.exists(src_path):
        if os.path.isdir(src_path):
            if os.path.exists(dst_path):
                # Merge directories
                for root, dirs, files in os.walk(src_path):
                    relative_path = os.path.relpath(root, src_path)
                    target_sub_dir = os.path.join(dst_path, relative_path)
                    
                    if not os.path.exists(target_sub_dir):
                        os.makedirs(target_sub_dir)
                    
                    for file in files:
                        src_file = os.path.join(root, file)
                        dst_file = os.path.join(target_sub_dir, file)
                        shutil.copy2(src_file, dst_file)
            else:
                shutil.copytree(src_path, dst_path)
        else:
            shutil.copy2(src_path, dst_path)
        print(f"Copied {item}")

# Attempt to remove the source directory
try:
    shutil.rmtree(source_dir)
    print(f"Removed {source_dir}")
except Exception as e:
    print(f"Error removing directory: {e}")

