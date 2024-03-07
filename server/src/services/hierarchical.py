import sys
import json
import numpy as np
import pandas as pd
import scipy.spatial
import scipy.cluster
from scipy.cluster.hierarchy import dendrogram, linkage
from functools import reduce

# Nhận dữ liệu từ JavaScript qua đối số dòng lệnh
json_string_from_js = sys.argv[1]
# k = json_string_from_js[2]
# data = json_string_from_js[5:-1]
data = json.loads(json_string_from_js)
df= pd.DataFrame(data)
labels = labels = df.pop('Name')
id2name = dict(zip(range(len(labels)), labels))
data_to_cluster = [item for item in df[1:]]
X = np.array(data_to_cluster)
encoded_df = pd.get_dummies(df,columns=X)

Z = linkage(encoded_df, 'ward')
T = scipy.cluster.hierarchy.to_tree( Z , rd=False )

def add_node(node, parent ):
	# First create the new node and append it to its parent's children
	newNode = dict( node_id=node.id, children=[] )
	parent["children"].append( newNode )

	# Recursively add the current node's children
	if node.left: add_node( node.left, newNode )
	if node.right: add_node( node.right, newNode )

d3Dendro = dict(children=[], name="Root1")
add_node( T, d3Dendro )

def label_tree( n,parent_is_leaf=False ):

	if len(n["children"]) == 0:
		leafNames = [ id2name[n["node_id"]] ]
		n["name"] = "-".join(sorted(map(str, leafNames)))

	else:
		leafNames = []
		for c in n["children"]:
			leafNames.extend(label_tree(c, parent_is_leaf=False))
		if not parent_is_leaf:
			n["name"] = "node"
		# leafNames = reduce(lambda ls, c: ls + label_tree(c), n["children"], [])

        
	del n["node_id"]
	n["name"] = name = "-".join(sorted(map(str, leafNames)))
	return leafNames
label_tree( d3Dendro["children"][0] ,parent_is_leaf=False)

# Z_list = Z.tolist()
# result = {
#             "lebels":Z
#         }      
# print(json.dumps(label_tree))
print(json.dumps(d3Dendro))
# print(json.dump(d3Dendro, open("d3-dendrogram.json", "w"), sort_keys=True, indent=4))




