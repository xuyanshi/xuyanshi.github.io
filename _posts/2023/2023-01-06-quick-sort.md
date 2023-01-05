---
title: Quick Sort
author: 
date: 2023-01-05 02:12 +0800
categories: [Code, Algorithm]
tags: [algorithm]
math: true
mermaid: true
pin: true


---



## Quick Sort

Of course, we could sort arrays with Standard Library or STL simply and quickly. However, sorting is a FAQ in interviews for a job. I will try to sort arrays in different ways.

### Preparation

Print an array or get the length of it. 

```c++
#include <iostream>
#include <algorithm>

using namespace std;

//Just for arrays but not work for vectors.
template<class T>
int length(const T &a) { 
    return sizeof(a) / sizeof(a[0]);
}

template<class T>
void print(const T &a) {
    for (int i = 0; i < length(a); i++) {
        cout << a[i] << " ";
    }
    cout << endl;
}
```

### Standard Libraries/STL

We could include the algorithm library and sort an array with it.

```c++
int main() {
    int nums[] = {3, 1, 4, 5, 2, 6, 3}; 
    print(nums); // 3 1 4 5 2 6 3
    sort(nums, nums + length(nums));
    print(nums); // 1 2 3 3 4 5 6
    return 0;
}
```

Vectors also can be sorted by the sort() method.

```c++
// nums is a vector now.
int nums0[] = {3, 1, 4, 5, 2, 6, 3};
vector<int> nums(nums0, nums0 + length(nums0)); 
sort(nums.begin(), nums.end());
```

### Quick Sort

![QuickSort](/assets/img/posts/202301/QuickSort.png)

### Quick Sort Template

There is a universal template of quick sorting below and we'd better memorize it completely.

```c++
//TODO: Quick Sort
```

