import pydicom
from PIL import Image
import numpy as np
import os
from pathlib import Path

def convert_dicom_to_jpg(dicom_path, output_path):
    """
    Convert a DICOM file to JPG format.
    
    Args:
        dicom_path: Path to the DICOM file
        output_path: Path where the JPG will be saved
    """
    try:
        # Read DICOM file
        ds = pydicom.dcmread(dicom_path)
        
        # Get pixel array
        pixel_array = ds.pixel_array
        
        # Normalize to 0-255 range
        pixel_array = pixel_array.astype(float)
        pixel_array = (pixel_array - pixel_array.min()) / (pixel_array.max() - pixel_array.min()) * 255
        pixel_array = pixel_array.astype(np.uint8)
        
        # Convert to PIL Image and save
        image = Image.fromarray(pixel_array)
        image.save(output_path, 'JPEG')
        
        print(f"✓ Converted: {os.path.basename(dicom_path)} -> {os.path.basename(output_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error converting {os.path.basename(dicom_path)}: {str(e)}")
        return False

def process_dicom_folder(input_folder, output_folder):
    """
    Process all DICOM files in a folder and convert them to JPG.
    
    Args:
        input_folder: Path to folder containing DICOM files
        output_folder: Path to folder where JPGs will be saved
    """
    # Create output folder if it doesn't exist
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    # Get all files in input folder
    input_path = Path(input_folder)
    
    # Common DICOM extensions (including files with no extension)
    dicom_files = []
    for file in input_path.iterdir():
        if file.is_file():
            # Try to add all files - we'll filter during reading
            dicom_files.append(file)
    
    if not dicom_files:
        print(f"No files found in {input_folder}")
        return
    
    print(f"Found {len(dicom_files)} files to process\n")
    
    success_count = 0
    fail_count = 0
    
    # Process each file
    for dicom_file in dicom_files:
        # Create output filename (same name but with .jpg extension)
        output_filename = dicom_file.stem + '.jpg'
        output_path = Path(output_folder) / output_filename
        
        # Convert
        if convert_dicom_to_jpg(str(dicom_file), str(output_path)):
            success_count += 1
        else:
            fail_count += 1
    
    print(f"\n{'='*50}")
    print(f"Processing complete!")
    print(f"Successfully converted: {success_count}")
    print(f"Failed: {fail_count}")
    print(f"Output folder: {output_folder}")

if __name__ == "__main__":
    
    INPUT_FOLDER = ""  
    OUTPUT_FOLDER = "" 
    
    process_dicom_folder(INPUT_FOLDER, OUTPUT_FOLDER)