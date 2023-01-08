---
title: Merge Sort
author: 
date: 2023-01-08 23:17 +0800
categories: [Code, Algorithm]
tags: [sorting]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202301/

---


Quicksort is an efficient, general-purpose sorting algorithm. Of course, we could sort arrays with Standard Library or STL simply and quickly. However, sorting is a FAQ in interviews for a job. I will try to sort arrays in different ways.

## Preparation

Same with the preparation of [quick sort](https://xuyanshi.github.io/posts/quick-sort/#preparation).


## Merge Sort

[Merge Sort - GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)

The **Merge Sort** algorithm is a sorting algorithm that is based on the **Divide and Conquer** paradigm. In this algorithm, the array is initially divided into two equal halves and then they are combined in a sorted manner.

Merge Sort Working Process:

Think of it as a recursive algorithm continuously splits the array in half until it cannot be further divided. This means that if the array becomes empty or has only one element left, the dividing will stop, i.e. it is the base case to stop the recursion. If the array has multiple elements, split the array into halves and recursively invoke the merge sort on each of the halves. Finally, when both halves are sorted, the merge operation is applied. Merge operation is the process of taking two smaller sorted arrays and combining them to eventually make a larger one.

## Merge Sort Template (TODO)

There is a universal template of quick sorting below and we'd better memorize it completely.

```c++
/* Preparation */

void quick_sort(int q[], int l, int r) {
    if (l >= r) { return; }
    int pivot = q[l], i = l - 1, j = r + 1; // Two Pointers(双指针)
    while (i < j) {
        i++; j--;
        while (q[i] < pivot) { i++; }
        while (q[j] > pivot) { j--; }
        if(i<j) { swap(q[i],q[j]);}
    }
    quick_sort(q,l,j);
    quick_sort(q,j+1,r);
}

// demo
int main() {
    int nums[] = {3, 1, 4, 5, 2, 6, 3};
    print(nums); // 3 1 4 5 2 6 3
    quick_sort(nums, 0, length(nums) - 1);
    print(nums); // 1 2 3 3 4 5 6
    return 0;
}
```



## Others about Quick Sort (TODO)

- Time complexity of QuickSort is O(**nLogn**)
- In-place algorithm
- NOT stable
