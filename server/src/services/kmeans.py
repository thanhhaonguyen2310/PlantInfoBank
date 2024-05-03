import sys
import json
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE


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
filePath = "D:\\LVTN\\LVTN_1\\server\\src\\services\\data.json"
# Nhận dữ liệu từ JavaScript qua đối số dòng lệnh
json_string_from_js = sys.argv[1]
# k = json_string_from_js[2]
# data = json_string_from_js[5:-1]
# data = json.loads(json_string_from_js)
data = read_json_file(filePath)
k = data[0]
data = data[1]
df = pd.DataFrame(data)
# df.fillna(-1, inplace=True)
# df.replace(' ', -1, inplace=True)
# PCA


data_to_cluster = [item for item in df[1:]]

X = np.array(data_to_cluster)
encoded_df = pd.get_dummies(df,columns=X)

k=int(k)
kmeans = KMeans(n_clusters=k)
kmeans.fit_predict(encoded_df)

labels = kmeans.labels_
        
centroids = kmeans.cluster_centers_

result = {
            "labels": labels.tolist(),
            "centroids": centroids.tolist()
        }      
# print(json.dumps(labels))

# pca = PCA(n_components=2)
pca = TSNE(n_components=2,random_state=0)
X_pca = pca.fit_transform(df)
kmeans = KMeans(n_clusters=k)
kmeans.fit_predict(X_pca)
centroid = kmeans.cluster_centers_
label = kmeans.labels_
u_labels = np.unique(label)
plt.figure(figsize=(12, 12))

for i in range(len(X_pca)):
    plt.scatter(X_pca[i][0], X_pca[i][1], c='C'+str(labels[i]), marker='o')

# for i in range(len(centroids_pca)):
#     plt.text(centroids_pca[i][0], centroids_pca[i][1], f'Group {i+1}', fontsize=12, color='black')

# plt.xlim(-10, 20)
# plt.ylim(-10, 15)
# plt.scatter(centroids[:,0] , centroids[:,1] , s = 80, color = 'k')
# plt.xlabel('Principal Component 1')
# plt.ylabel('Principal Component 2')
plt.title('KMeans Clustering  và hiển thị bằng PCA')
plt.legend()
plt.savefig('D:/LVTN/LVTN_1/web/src/assets/kmeans.png')

print(json.dumps(result))




