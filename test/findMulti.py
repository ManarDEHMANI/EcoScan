import os


def multi(path):
    """
    Scans through label files in a given directory and identifies those that contain
    multiple labeled objects (i.e., more than one line in the label file).

    Parameters:
    path (str): The path to the directory containing two subdirectories:
                one for images and one for label files.
    """
    # Get the list of directories (images and labels)
    listdir = os.listdir(path)
    list_path = [os.path.join(path, dir) for dir in listdir]

    # Ensure that there are at least two subdirectories (one for images and one for labels)
    if len(list_path) < 2:
        print("Missing folder as images or labels")
        return

    imagePathBase = list_path[0]  # Assuming the first directory is for images
    labelPathBase = list_path[1]  # Assuming the second directory is for labels

    # List of image and label files
    listdirImages = os.listdir(imagePathBase)
    listdirLabels = os.listdir(labelPathBase)

    # Check if there are image and label files
    if not listdirImages or not listdirLabels:
        print("No images or labels found")
        return

    # Iterate through the label files
    for labelPath in listdirLabels:
        label_full_path = os.path.join(labelPathBase, labelPath)

        # Read the label file
        with open(label_full_path, 'r') as fr:
            lines = fr.readlines()

        # If the label file has more than one line, print the file path
        if len(lines) > 1:
            print(f"Multiple labels found: {label_full_path}")


# Paths to directories containing images and labels
path_glass = "C:/Users/mtx/Downloads/glass"
path_plastic = "C:/Users/mtx/Downloads/plastic"

# Run the function for each dataset
multi(path_glass)
multi(path_plastic)