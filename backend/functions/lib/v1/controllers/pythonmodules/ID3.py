import pandas as pd
import numpy as np
from sklearn import tree
import CSVWriter as csvwr
import sys


glucose=sys.argv[1]
blood_pressure=sys.argv[2]
skin_thickness=sys.argv[3]
insulin=sys.argv[4]
bmi=sys.argv[5]
dpf=sys.argv[6]
age=sys.argv[7]

input_file =csvwr.data

df = pd.DataFrame(input_file, columns = ['glucose', 'blood_pressure','skin_thickness','insulin','bmi','dpf','age','outcome']) 


features = list(df.columns[:7])

y = df["outcome"]
X = df[features]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X,y)

result=clf.predict([[glucose,blood_pressure,skin_thickness,insulin,bmi,dpf,age]])
print(result)
sys.stdout.flush()