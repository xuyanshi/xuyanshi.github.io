---
title: Merge Sort
author: 
date: 2023-01-08 00:15 +0800
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


## Merge Sort (TODO)

[QuickSort - GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)

Like [Merge Sort](https://www.geeksforgeeks.org/merge-sort/), **QuickSort** is a[ Divide and Conquer algorithm](https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/). It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. 

- Always pick the first element as a pivot.
- Always pick the last element as a pivot (implemented below)
- Pick a random element as a pivot.
- Pick median as the pivot.

The key process in quickSort is a partition(). The target of partitions is, given an array and an element x of an array as the pivot, put x at its correct position in a sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.

![QuickSort](QuickSort.png)

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
