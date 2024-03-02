import sys
import json
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans

# Nhận dữ liệu từ JavaScript qua đối số dòng lệnh
json_string_from_js = sys.argv[1]
# k = json_string_from_js[2]
# data = json_string_from_js[5:-1]
data = json.loads(json_string_from_js)

k = data[0]
data = data[1]
df = pd.DataFrame(data)
# df.fillna(-1, inplace=True)
# df.replace(' ', -1, inplace=True)

data_to_cluster = [item for item in df[1:]]

X = np.array(data_to_cluster)
encoded_df = pd.get_dummies(df,columns=X)

k=int(k)
kmeans = KMeans(n_clusters=k)
df['Cluster'] = kmeans.fit_predict(encoded_df)

labels = kmeans.labels_
        
centroids = kmeans.cluster_centers_

result = {
            "labels": labels.tolist(),
            "centroids": centroids.tolist()
        }      
# print(json.dumps(labels))
print(json.dumps(result))




