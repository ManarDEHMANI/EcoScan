import os
import re
import json

def magic(path,name):
    pathAnnotations = "C:/Users/mtx/Downloads/_annotations.coco.json"
    listdir = os.listdir(path)

    # load annotations with tags in it
    with open(pathAnnotations, 'r') as file:
        data = json.load(file)
    images = data["images"]

    list_path = []
    for dir in listdir:
        second_path = path+"/"+dir
        list_path.append(second_path)

    # get path and listdir of images and labels
    if list_path and list_path[0] and list_path[1]:
        imagePathBase = list_path[0]
        labelPathBase = list_path[1]
        listdirImages = os.listdir(list_path[0])
        listdirLabels = os.listdir(list_path[1])
    else:
        print("missing folder as images or labels")

    iteration = 1
    naming = ['glass', 'plastic','PET','pepsi','cocacola','water','HDPE','juice','milk','dasani','aquafina','evian','soft-drink',' '
                'cristaline','sprite','oil','cleaning','auchan','vittel','cristaline-juice','sun-tropics','ocean-spray','orangina','paturages',
                'lesieur','maxer','crystal-geyser','arrowhead','TRITAN','verka','washing','sodocalcique','alcohol','core-hydration','innocent','spring-water']

    if listdirImages and listdirImages:
        for imagePath in listdirImages:
            imageMotherName, extensionImage = os.path.splitext(imagePath)
            matching_entry  = next((item for item in images if item['file_name'] == imagePath), None)
            for labelPath in listdirLabels:
                if re.search(imageMotherName,labelPath):
                    # rename label and image file with iteration
                    newName = name+str(iteration)
                    second_part = '_'.join(imageMotherName.split('_')[1:])
                    if second_part[0]!= "_":
                        second_part = '_'+second_part
                    labelMotherName, extensionLabel = os.path.splitext(os.path.basename(labelPath))
                    newImagePath = os.path.join(imagePathBase+"/"+newName+second_part+extensionImage)
                    newLabelPath = os.path.join(labelPathBase+"/"+newName+second_part+extensionLabel)
                    
                    # find the present tags in the label file in naming
                    if matching_entry:
                        presentTags = matching_entry['extra']['user_tags']
                        match_indices = [naming.index(item) for item in presentTags if item in naming]
                        # for i in range(len(presentTags)):
                        #     print(presentTags[i]+" - "+str(match_indices[i]))
                    # print(labelPathBase+"/"+labelPath)
                    # read file txt ( label ) and extract indices and coordinates
                    fr = open(labelPathBase+"/"+labelPath,'r')
                    lines = fr.readlines()
                    presentIndices = []
                    for line in lines:
                        part = line.split()
                        coordinates = part[1:]
                        formatted_coordinates = [f"{float(coord):.10f}" for coord in coordinates]
                        presentIndices.append(part[0])
                    fr.close()
                    # open file txt ( label )
                    fa = open(labelPathBase+"/"+labelPath,'a+')
                    # add newline in the existing file
                    fa.seek(0, os.SEEK_END)
                    if fa.tell() > 0:
                        fa.write('\n')
                    # append all missing indices with same coordinates
                    for indice in match_indices:
                        if str(indice) not in presentIndices:
                            # print(str(indice)+" "+naming[indice])
                            # print(str(indice)+' '+' '.join(coordinates))
                            fa.write(f"{str(indice)} {' '.join(formatted_coordinates)}\n")
                    fa.close()
                    os.rename(imagePathBase+"/"+imagePath, newImagePath)
                    os.rename(labelPathBase+"/"+labelPath, newLabelPath)
                    print(newImagePath+" ---  "+newLabelPath)
                    print("--------------------------------")
                    iteration += 1


path = "C:/Users/mtx/Downloads/glass"
path2 = "C:/Users/mtx/Downloads/plastic"
# magic(path,'glass')
magic(path2,'plastic')