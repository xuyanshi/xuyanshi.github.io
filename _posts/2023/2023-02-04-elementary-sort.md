---
title: Elementary Sort
author: 
date: 2023-02-04 11:11 +0800
categories: [Code, Algorithm]
tags: [sorting]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202301/

---


## Selection Sort

[Selection Sort - GeeksforGeeks](https://www.geeksforgeeks.org/selection-sort/)

**Selection sort** is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list. The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted portion. This process is repeated for the remaining unsorted portion of the list until the entire list is sorted. One variation of selection sort is called “Bidirectional selection sort” that goes through the list of elements by alternating between the smallest and largest element, this way the algorithm can be faster in some cases.

The algorithm maintains two subarrays in a given array.

- The subarray which already sorted. 
- The remaining subarray was unsorted.

In every iteration of the selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the beginning of unsorted subarray. 

After every iteration sorted subarray size increase by one and unsorted subarray size decrease by one.

After N (size of array) iteration we will get sorted array.

```java
public class Selection {
    
    /* Core Algorithm */
    public static void sort(Comparable[] a) {
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
            exchange(a, min, i);
        }
    }

    
    private static boolean less(Comparable v, Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exchange(Comparable[] a, int i, int j) {
        Comparable temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    private static boolean isSorted(Comparable[] a) {
        for (int i = 1; i < a.length; i++) {
            if (less(a[i], a[i - 1])) {
                return false;
            }
        }
        return true;
    }

    private static void printArray(Comparable[] a) {
        for (Comparable element : a) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Integer[] a = new Integer[]{2, 4, 3, 5, 1};
        printArray(a);
        Selection.sort(a);
        printArray(a);
    }
}
```

