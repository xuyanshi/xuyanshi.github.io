---
title: Elementary Sorting Methods
author: 
date: 2023-02-04 11:11 +0800
categories: [Code, Algorithm]
tags: [sorting]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202302/

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



There is an implementation of selection sorting by [algs4](https://algs4.cs.princeton.edu/code/) below.

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

## Insertion Sort

[Insertion Sort - GeeksforGeeks](https://www.geeksforgeeks.org/insertion-sort/)

**Insertion sort** is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

- This algorithm is one of the simplest algorithm with simple implementation
- Basically, Insertion sort is efficient for small data values
- Insertion sort is adaptive in nature, i.e. it is appropriate for data sets which are already partially sorted.



There is an implementation of insertion sorting by [algs4](https://algs4.cs.princeton.edu/code/) below.

```java
public class Insertion {
    
    /* Core Algorithm */
    public static void sort(Comparable[] a) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            for (int j = i; j > 0; j--) {
                if (less(a[j], a[j - 1])) { // This implementation is similar to Bubble Sort, but not the same.
                    exchange(a, j, j - 1); // In fact, exchanging by only one time is enough.
                }
            }
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
        Integer[] a = new Integer[]{2, 4, 3, 6, 5, 1};
        printArray(a);
        Insertion.sort(a);
        printArray(a);
    }
}
```



## Shell Sort

[Shell Sort - GeeksforGeeks](https://www.geeksforgeeks.org/shellsort/)

Shell sort is mainly a variation of Insertion Sort. In insertion sort, we move elements only one position ahead. When an element has to be moved far ahead, many movements are involved. The idea of ShellSort is to allow the exchange of far items. In Shell sort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. An array is said to be h-sorted if all sublists of every h’th element are sorted.

Algorithm:

Step 1 − Start
Step 2 − Initialize the value of gap size. Example: h
Step 3 − Divide the list into smaller sub-part. Each must have equal intervals to h
Step 4 − Sort these sub-lists using insertion sort
Step 5 – Repeat this step 2 until the list is sorted.
Step 6 – Print a sorted list.
Step 7 – Stop.



There is an implementation of shell sorting by [algs4](https://algs4.cs.princeton.edu/code/) below.

```java
public class Shell {
    
    /* Core Algorithm */
    public static void sort(Comparable[] a) {
        int n = a.length;

        int h = 1;
        while (h < n / 3) {
            h = 3 * h + 1;
        }

        /* h-sort the array */
        while (h >= 1) {
            for (int i = h; i < n; i++) { // Insertion Sort
                for (int j = i; j >= h && less(a[j], a[j - h]); j -= h) {
                    exchange(a, j, j - h);
                }
            }
            h /= 3;
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
        Integer[] a = new Integer[]{2, 8, 4, 10, 3, 7, 6, 11, 5, 1, 9};
        printArray(a);
        Shell.sort(a);
        printArray(a);
    }
}

```



---

Thanks for [Algorithms Course](https://www.coursera.org/learn/algorithms-part1) offered by Princeton University on Coursera. 

