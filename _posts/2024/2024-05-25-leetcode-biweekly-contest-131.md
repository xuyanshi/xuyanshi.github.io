---
title: LeetCode Biweekly Contest 131
author: 
date: 2024-05-25 23:59 +0800
categories: [Code, Leetcode Contest]
tags: [array, hash]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---





## [Contest](https://leetcode.cn/contest/biweekly-contest-131/)



## Q1 Find the XOR of Numbers Which Appear Twice

You are given an array `nums`, where each number in the array appears **either** once or twice.

Return the bitwise `XOR` of all the numbers that appear twice in the array, or 0 if no number appears twice.

 

**Example 1:**

**Input:** nums = [1,2,1,3]

**Output:** 1

**Explanation:**

The only number that appears twice in `nums` is 1.

**Example 2:**

**Input:** nums = [1,2,3]

**Output:** 0

**Explanation:**

No number appears twice in `nums`.

**Example 3:**

**Input:** nums = [1,2,2,1]

**Output:** 3

**Explanation:**

Numbers 1 and 2 appeared twice. `1 XOR 2 == 3`.

 

**Constraints:**

- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`
- Each number in `nums` appears either once or twice.



### My solution during the contest

Count the occurrences of every numbers.

```python
class Solution:
    def duplicateNumbersXOR(self, nums: List[int]) -> int:
        ans = 0
        cnt = Counter(nums)
        for num in cnt:
            if cnt[num] == 2:
                ans ^= num
        return ans
```



### Better solution
```python

```




## Q2 Find Occurrences of an Element in an Array

You are given an integer array `nums`, an integer array `queries`, and an integer `x`.

For each `queries[i]`, you need to find the index of the `queries[i]th` occurrence of `x` in the `nums` array. If there are fewer than `queries[i]` occurrences of `x`, the answer should be -1 for that query.

Return an integer array `answer` containing the answers to all queries.

 

**Example 1:**

**Input:** nums = [1,3,1,7], queries = [1,3,2,4], x = 1

**Output:** [0,-1,2,-1]

**Explanation:**

- For the 1st query, the first occurrence of 1 is at index 0.
- For the 2nd query, there are only two occurrences of 1 in `nums`, so the answer is -1.
- For the 3rd query, the second occurrence of 1 is at index 2.
- For the 4th query, there are only two occurrences of 1 in `nums`, so the answer is -1.

**Example 2:**

**Input:** nums = [1,2,3], queries = [10], x = 5

**Output:** [-1]

**Explanation:**

- For the 1st query, 5 doesn't exist in `nums`, so the answer is -1.

 

**Constraints:**

- `1 <= nums.length, queries.length <= 10^5`
- `1 <= queries[i] <= 10^5`
- `1 <= nums[i], x <= 10^4`



### My solution during the contest

```python
class Solution:
    def occurrencesOfElement(self, nums: List[int], queries: List[int], x: int) -> List[int]:
        x_idx = []
        for i, num in enumerate(nums):
            if num == x:
                x_idx.append(i)
        ans = [-1] * (n := len(queries))
        for i in range(n):
            if queries[i] <= len(x_idx):
                ans[i] = x_idx[queries[i] - 1]
        return ans
```



### Better solution
```python

```






## Q3 Find the Number of Distinct Colors Among the Balls

You are given an integer `limit` and a 2D array `queries` of size `n x 2`.

There are `limit + 1` balls with **distinct** labels in the range `[0, limit]`. Initially, all balls are uncolored. For every query in `queries` that is of the form `[x, y]`, you mark ball `x` with the color `y`. After each query, you need to find the number of **distinct** colors among the balls.

Return an array `result` of length `n`, where `result[i]` denotes the number of distinct colors *after* `ith` query.

**Note** that when answering a query, lack of a color *will not* be considered as a color.

 

**Example 1:**

**Input:** limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]

**Output:** [1,2,2,3]

**Explanation:**

- After query 0, ball 1 has color 4.
- After query 1, ball 1 has color 4, and ball 2 has color 5.
- After query 2, ball 1 has color 3, and ball 2 has color 5.
- After query 3, ball 1 has color 3, ball 2 has color 5, and ball 3 has color 4.

**Example 2:**

**Input:** limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]

**Output:** [1,2,2,3,4]

**Explanation:**

- After query 0, ball 0 has color 1.
- After query 1, ball 0 has color 1, and ball 1 has color 2.
- After query 2, ball 0 has color 1, and balls 1 and 2 have color 2.
- After query 3, ball 0 has color 1, balls 1 and 2 have color 2, and ball 3 has color 4.
- After query 4, ball 0 has color 1, balls 1 and 2 have color 2, ball 3 has color 4, and ball 4 has color 5.

 

**Constraints:**

- `1 <= limit <= 10^9`
- `1 <= n == queries.length <= 10^5`
- `queries[i].length == 2`
- `0 <= queries[i][0] <= limit`
- `1 <= queries[i][1] <= 10^9`

### My solution during the contest

```python
class Solution:
    def queryResults(self, limit: int, queries: List[List[int]]) -> List[int]:
        ans = [0] * (n := len(queries))
        color = 0
        color_ball = defaultdict(set)
        ball_color = defaultdict(int)
        for i, (x, y) in enumerate(queries):
            if x in ball_color:
                color_ball[ball_color[x]].remove(x)
                if not color_ball[ball_color[x]]:
                    color_ball.pop(ball_color[x])
                    color -= 1
                if y not in color_ball:
                    color += 1
            else:
                if y not in color_ball:
                    color += 1
            color_ball[y].add(x)
            ball_color[x] = y
            ans[i] = color  # len(color_ball.keys())
        return ans
```



### Better solution

```python

```









## Q4 Block Placement Queries

There exists an infinite number line, with its origin at 0 and extending towards the **positive** x-axis.

You are given a 2D array `queries`, which contains two types of queries:

1. For a query of type 1, `queries[i] = [1, x]`. Build an obstacle at distance `x` from the origin. It is guaranteed that there is **no** obstacle at distance `x` when the query is asked.
2. For a query of type 2, `queries[i] = [2, x, sz]`. Check if it is possible to place a block of size `sz` *anywhere* in the range `[0, x]` on the line, such that the block **entirely** lies in the range `[0, x]`. A block **cannot** be placed if it intersects with any obstacle, but it may touch it. Note that you do **not** actually place the block. Queries are separate.

Return a boolean array `results`, where `results[i]` is `true` if you can place the block specified in the `ith` query of type 2, and `false` otherwise.

 

**Example 1:**

**Input:** queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]

**Output:** [false,true,true]

**Explanation:**

For query 0, place an obstacle at `x = 2`. A block of size at most 2 can be placed before `x = 3`.

**Example 2:**

**Input:** queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]

**Output:** [true,true,false]

**Explanation:**

- Place an obstacle at `x = 7` for query 0. A block of size at most 7 can be placed before `x = 7`.
- Place an obstacle at `x = 2` for query 2. Now, a block of size at most 5 can be placed before `x = 7`, and a block of size at most 2 before `x = 2`.

 

**Constraints:**

- `1 <= queries.length <= 15 * 104`
- `2 <= queries[i].length <= 3`
- `1 <= queries[i][0] <= 2`
- `1 <= x, sz <= min(5 * 104, 3 * queries.length)`
- The input is generated such that for queries of type 1, no obstacle exists at distance `x` when the query is asked.
- The input is generated such that there is at least one query of type 2.

### My solution during the contest

```python
class Solution:
    def getResults(self, queries: List[List[int]]) -> List[bool]:
        pass
```



### Better solution

```python

```





