import os
import re
import json

def magic(path, name, path_annotations, naming):
    """
    This function processes images and labels in a given directory, renames them, 
    and adds missing tags to label files based on the annotations provided in a COCO JSON file.

    Parameters:
    path (str): The path to the directory containing image and label subdirectories.
    name (str): The base name for renaming the images and their corresponding labels.
    path_annotations (str): The path to the COCO-style annotations JSON file.
    naming (list): A list of valid tag names that are used to compare against the tags in the annotations.
    """

    # Load COCO-style annotations with tags in it
    with open(path_annotations, 'r') as file:
        data = json.load(file)
    images = data["images"]

    # Get the list of directories in the provided path
    listdir = os.listdir(path)
    list_path = [os.path.join(path, dir) for dir in listdir]

    # Ensure that there are at least two subdirectories (one for images and one for labels)
    if len(list_path) < 2:
        print("Missing folder as images or labels")
        return

    imagePathBase = list_path[0]  # Assuming first directory is for images
    labelPathBase = list_path[1]  # Assuming second directory is for labels
    listdirImages = os.listdir(imagePathBase)
    listdirLabels = os.listdir(labelPathBase)

    iteration = 1  # Counter for renaming files

    # Iterate through the list of image files
    for imagePath in listdirImages:
        imageMotherName, extensionImage = os.path.splitext(imagePath)

        # Find the matching entry in the annotations for the current image
        matching_entry = next((item for item in images if item['file_name'] == imagePath), None)

        # Iterate through the list of label files
        for labelPath in listdirLabels:
            # Find the corresponding label file based on the image name
            if re.search(imageMotherName, labelPath):
                # Generate new names for the image and label files
                newName = name + str(iteration)
                second_part = '_'.join(imageMotherName.split('_')[1:])
                if second_part and second_part[0] != "_":
                    second_part = '_' + second_part

                labelMotherName, extensionLabel = os.path.splitext(os.path.basename(labelPath))
                newImagePath = os.path.join(imagePathBase, newName + second_part + extensionImage)
                newLabelPath = os.path.join(labelPathBase, newName + second_part + extensionLabel)

                # Find the present tags in the matching entry in annotations
                if matching_entry:
                    presentTags = matching_entry['extra']['user_tags']
                    match_indices = [naming.index(item) for item in presentTags if item in naming]

                # Open the label file and extract indices and coordinates
                with open(os.path.join(labelPathBase, labelPath), 'r') as fr:
                    lines = fr.readlines()

                presentIndices = []
                for line in lines:
                    parts = line.split()
                    coordinates = parts[1:]  # Get the coordinates
                    formatted_coordinates = [f"{float(coord):.10f}" for coord in coordinates]  # Format coords
                    presentIndices.append(parts[0])  # Extract the index

                # Open the label file in append mode to add missing indices
                with open(os.path.join(labelPathBase, labelPath), 'a+') as fa:
                    fa.seek(0, os.SEEK_END)
                    if fa.tell() > 0:
                        fa.write('\n')

                    # Append all missing indices with the same coordinates
                    for indice in match_indices:
                        if str(indice) not in presentIndices:
                            fa.write(f"{str(indice)} {' '.join(formatted_coordinates)}\n")

                # Rename the image and label files
                os.rename(os.path.join(imagePathBase, imagePath), newImagePath)
                os.rename(os.path.join(labelPathBase, labelPath), newLabelPath)

                print(f"{newImagePath} ---  {newLabelPath}")
                print("--------------------------------")

                # Increment the iteration count after processing each pair
                iteration += 1


# Define the paths and parameters
path_glass = "C:/Users/mtx/Downloads/glass"
path_plastic = "C:/Users/mtx/Downloads/plastic"
path_annotations = "C:/Users/mtx/Downloads/_annotations.coco.json"
naming = ['glass', 'plastic', 'PET', 'pepsi', 'cocacola', 'water', 'HDPE', 'juice', 'milk', 'dasani', 'aquafina', 
          'evian', 'soft-drink', 'cristaline', 'sprite', 'oil', 'cleaning', 'auchan', 'vittel', 'cristaline-juice', 
          'sun-tropics', 'ocean-spray', 'orangina', 'paturages', 'lesieur', 'maxer', 'crystal-geyser', 'arrowhead', 
          'TRITAN', 'verka', 'washing', 'sodocalcique', 'alcohol', 'core-hydration', 'innocent', 'spring-water']

# Call the function with the desired paths and parameters
magic(path_plastic, 'plastic', path_annotations, naming)