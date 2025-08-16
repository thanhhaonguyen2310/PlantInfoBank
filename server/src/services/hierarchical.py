import sys
import json
import numpy as np
import pandas as pd
import scipy.spatial
import scipy.cluster
from scipy.cluster.hierarchy import dendrogram, linkage
from functools import reduce
import time
import datetime
import matplotlib.pyplot as plt

def read_json_file(file_path):
    try:
        with open(file_path, 'r',encoding='utf-8') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print("File not found!")
        return None
    except json.JSONDecodeError:
        print("Error decoding JSON!")
        return None

import os
# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))
filePath = os.path.join(current_dir, "data.json")

start_time = time.time()
# Nhận dữ liệu từ JavaScript qua đối số dòng lệnh
# json_string_from_js = sys.argv[1]
# k = json_string_from_js[2]
# data = json_string_from_js[5:-1]
data = read_json_file(filePath)
# data = json.loads(json_string_from_js)
df= pd.DataFrame(data)
labels = df.pop('Name')
id2name = dict(zip(range(len(labels)), labels))
data_to_cluster = [item for item in df[1:]]
X = np.array(data_to_cluster)
encoded_df = pd.get_dummies(df,columns=X)

Z = linkage(encoded_df, 'average')


plt.figure(figsize=(10, 7))
plt.title("Dendrogram")
dendrogram(Z, labels=[id2name[i] for i in range(len(id2name))], orientation='top')
plt.xticks(rotation=90)
plt.tight_layout()


end_time = time.time()
execution_time = end_time - start_time

current_datetime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
plt.text(1, 0.95, f"Date: {current_datetime}", horizontalalignment='right', verticalalignment='top', transform=plt.gca().transAxes)
plt.text(1, 0.9, f"Thực thi: {execution_time:.2f} giây", horizontalalignment='right', verticalalignment='top', transform=plt.gca().transAxes)

# Save to shared assets directory
output_dir = os.path.join(current_dir, '..', '..', '..', 'shared_assets', 'charts')
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, 'dendrogram.png')
plt.savefig(output_path)


Z_list = Z.tolist()
# result = {
#             "lebels":Z
#         }      
# print(json.dumps(label_tree))
print(json.dumps(Z_list))




