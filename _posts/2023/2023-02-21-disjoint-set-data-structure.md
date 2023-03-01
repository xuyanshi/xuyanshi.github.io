---
title: Disjoint Set Data Structure
author: 
date: 2023-02-21 09:00 +0800
categories: [Code, Algorithm]
tags: [data structure]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202302/

---


What is a Disjoint set data structure?

Two sets are called disjoint sets if they don’t have any element in common, the intersection of sets is a null set.

A data structure that stores non overlapping or disjoint subset of elements is called disjoint set data structure. The disjoint set data structure supports following operations:


- Adding new sets to the disjoint set.
- Merging disjoint sets to a single disjoint set using Union operation.
- Finding representative of a disjoint set using Find operation.
- Check if two sets are disjoint or not. 

[Disjoint Set Data Structures - GeeksforGeeks](https://www.geeksforgeeks.org/heap-sort/)


```python
class UnionFind:
    def __init__(self, n):
        self.data = [-1 for i in range(n + 1)]
        # 0-index is skipped.
        # And -1 is for the root initially. -k means the size of this set is k.
        self.sets_count = n

    def find(self, p):
        root = p
        while self.data[root] > 0:
            root = self.data[root]
        while p != root:
            self.data[p], p = root, self.data[p]
        return root

    def union(self, p, q):
        root_p = self.find(p)
        root_q = self.find(q)
        if root_p == root_q:  # already union
            return
        if self.data[root_p] < self.data[root_q]:  # q has a bigger size than q. The size of root equals to -data[root].
            self.data[root_p] += self.data[root_q]
            self.data[root_q] = root_p
        else:
            self.data[root_q] += self.data[root_p]
            self.data[root_p] = root_q
        self.sets_count -= 1

    def is_connected(self, p, q):
        return self.find(p) == self.find(q)

```
