---
title: Application and uses of Quick Sort
author: 
date: 2023-01-19 01:10 +0800
categories: [Code, Algorithm]
tags: [sorting]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202301/

---

[Quick Sort](https://xuyanshi.github.io/posts/quick-sort/)

## Quick Sort Template

There is a universal template of quick sorting below and we'd better memorize it completely.

```c++
/* Preparation */

void quick_sort(int a[], int l, int r) {
    if (l >= r) { return; }
    int pivot = a[l], i = l - 1, j = r + 1; // Two Pointers(双指针)
    while (i < j) {
        i++; j--;
        while (a[i] < pivot) { i++; }
        while (a[j] > pivot) { j--; }
        if(i<j) { swap(a[i],a[j]);}
    }
    quick_sort(a,l,j);
    quick_sort(a,j+1,r);
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

## LeetCode 215. Kth Largest Element in an Array

[LeetCode 215. Kth Largest Element in an Array](https://leetcode.cn/problems/kth-largest-element-in-an-array/)



Given an integer array `nums` and an integer `k`, return *the* `kth` *largest element in the array*.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

You must solve it in `O(n)` time complexity.

 

**Example 1:**

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**

```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

 

**Constraints:**

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`






## LeetCode Interview 17.14. Smallest K LCCI

[LeetCode Interview 17.14. Smallest K LCCI](https://leetcode.cn/problems/smallest-k-lcci/)



Design an algorithm to find the smallest K numbers in an array.

**Example:** 

```
Input:  arr = [1,3,5,7,2,4,6,8], k = 4
Output:  [1,2,3,4]
```

**Note:** 

- `0 <= len(arr) <= 100000`
- `0 <= k <= min(100000, len(arr))`



## LeetCode 1738. Find Kth Largest XOR Coordinate Value

[LeetCode 1738. Find Kth Largest XOR Coordinate Value](https://leetcode.cn/problems/find-kth-largest-xor-coordinate-value)
