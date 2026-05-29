---
title: "LeetCode 47. Permutations II"
slug: "leetcode-47-permutations-ii"
featured: false
draft: false
tags: [algorithm, backtracking, pruning]
description: "LeetCode 47. Permutations II (全排列 II)"
---

[LeetCode 47. Permutations II (全排列 II)](https://leetcode.cn/problems/permutations-ii/)

Given a collection of numbers, `nums`, that might contain duplicates, return _all possible unique permutations **in any order**._

**Example 1:**

```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**Example 2:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Constraints:**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

```python
nums.sort()
ans = []
visited = [0 for i in range(len(nums))]

def backtrack(sol, nums, visited):
    if len(sol) == len(nums):
        ans.append(sol)
        return
    for i in range(len(nums)):
        if visited[i] == 1:
            continue
        if i > 0 and nums[i] == nums[i - 1] and visited[i - 1] == 0:
            continue
        visited[i] = 1
        backtrack(sol + [nums[i]], nums, visited)
        visited[i] = 0

backtrack([], nums, visited)
return ans
```

Pruning means [decision tree pruning](https://en.wikipedia.org/wiki/Decision_tree_pruning).

Coding Test Q2 in [2023 ByteDance Youth Camp (5th)](https://youthcamp.bytedance.com).
