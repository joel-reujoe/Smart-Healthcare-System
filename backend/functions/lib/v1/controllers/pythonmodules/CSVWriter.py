import pandas as pd    
import ID3_controller as ID3C
import sys

input_file = ID3C.myresult

filename = "out.csv"
data = pd.read_csv(filename)

glucose=[]
blood_pressure=[]
skin_thickness=[]
insulin=[]
bmi=[]
dpf=[]
age=[]
outcome=[]

for item in input_file:
    glucose.append(item[1])
    blood_pressure.append(item[2])
    skin_thickness.append(item[3])
    insulin.append(item[4])
    bmi.append(item[5])
    dpf.append(item[6])
    age.append(item[7])
    outcome.append(item[8])


data["glucose"]=glucose
data["blood_pressure"]=blood_pressure
data["skin_thickness"]=skin_thickness
data["insulin"]=insulin
data["bmi"]=bmi
data["dpf"]=dpf
data["age"]=age
data["outcome"]=outcome




        
        