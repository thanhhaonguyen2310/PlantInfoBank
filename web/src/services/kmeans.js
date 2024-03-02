
import { KMeansResult } from "ml-kmeans/lib/KMeansResult";
const data = [
    [1, 2],
    [2, 3],
    [8, 7],
    [5, 5],
    [7, 8],
    [3, 4],
    [9, 3]
  ];
export const KmeansCluster = (dataK) => {
  try {
    // Số nhóm bạn muốn phân chia
    const k = 3;

    // Tạo một đối tượng KMeans
    const kmeans = new KMeansResult({ maxIterations: 100 });

    // Thực hiện phân nhóm
    kmeans.cluster(data, k, (err, clusters) => {
      if (err) {
        console.error("Lỗi khi thực hiện phân nhóm:", err);
        return;
      }
      
      // In ra các nhóm
      
      clusters.forEach((cluster, index) => {
        console.log(`Nhóm ${index + 1}:`);
        console.log(cluster);
      });
      return clusters;
    });
    
  } catch (error) {
    console.log(error);
  }
};
