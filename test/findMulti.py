import os
import re
import json

def multi(path):
    listdir = os.listdir(path)
    
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


    if listdirImages and listdirImages:
        for labelPath in listdirLabels:
            fr = open(labelPathBase+"/"+labelPath,'r')
            lines = fr.readlines()
            if len(lines) > 1:
                print(labelPathBase+"/"+labelPath)
            fr.close()

# find images where there are multiples labelled bottles from raw data from roboflow
path = "C:/Users/mtx/Downloads/glass"
path2 = "C:/Users/mtx/Downloads/plastic"
multi(path)
multi(path2)