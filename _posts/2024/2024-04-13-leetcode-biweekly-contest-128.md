---
title: LeetCode Biweekly Contest 128
author: 
date: 2024-04-13 23:59 +0800
categories: [Code, Leetcode Contest]
tags: [array, string, presum]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---





## [Contest](https://leetcode.cn/contest/biweekly-contest-126/)



## 1. [Score of a String](https://leetcode.cn/problems/score-of-a-string/description/) (Easy)

You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters.

Return the score of s.

 

Example 1:

Input: s = "hello"

Output: 13

Explanation:

The ASCII values of the characters in s are: 'h' = 104, 'e' = 101, 'l' = 108, 'o' = 111. So, the score of s would be |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13.

Example 2:

Input: s = "zaz"

Output: 50

Explanation:

The ASCII values of the characters in s are: 'z' = 122, 'a' = 97. So, the score of s would be |122 - 97| + |97 - 122| = 25 + 25 = 50.

 

Constraints:

2 <= s.length <= 100

s consists only of lowercase English letters.

### My solution during the contest

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### Better solution
```python

```







## 2. [Minimum Rectangles to Cover Points](https://leetcode.cn/problems/minimum-rectangles-to-cover-points/description/) (Middle)

You are given a 2D integer array points, where points[i] = [xi, yi]. You are also given an integer w. Your task is to cover all the given points with rectangles.

Each rectangle has its lower end at some point (x1, 0) and its upper end at some point (x2, y2), where x1 <= x2, y2 >= 0, and the condition x2 - x1 <= w must be satisfied for each rectangle.

A point is considered covered by a rectangle if it lies within or on the boundary of the rectangle.

Return an integer denoting the minimum number of rectangles needed so that each point is covered by at least one rectangle.

Note: A point may be covered by more than one rectangle.



### My solution during the contest

```python
class Solution:
    def minRectanglesToCoverPoints(self, points: List[List[int]], w: int) -> int:
        rows = set()
        for p in points:
            rows.add(p[0])
        rows = sorted(list(rows))
        ans = i = 0
        start = rows[0]
        n = len(rows)
        while start <= rows[-1]:
            ans += 1
            while i < n and rows[i] <= start + w:
                i += 1
            if i >= n:
                break
            start = rows[i]
        return ans
```



### Better solution

```python

```






## 3. [Minimum Time to Visit Disappearing Nodes](https://leetcode.cn/problems/minimum-time-to-visit-disappearing-nodes/description/) (Middle)

There is an undirected graph of n nodes. You are given a 2D array edges, where edges[i] = [ui, vi, lengthi] describes an edge between node ui and node vi with a traversal time of lengthi units.

Additionally, you are given an array disappear, where disappear[i] denotes the time when the node i disappears from the graph and you won't be able to visit it.

Notice that the graph might be disconnected and might contain multiple edges.

Return the array answer, with answer[i] denoting the minimum units of time required to reach node i from node 0. If node i is unreachable from node 0 then answer[i] is -1.



### My solution during the contest

I knew this problem was based on Dijkstra algorithm, but I'm not sure about details.

```python
# WRONG
```



### Better solution

```python
class Solution:
    def minimumTime(self, n: int, edges: List[List[int]], disappear: List[int]) -> List[int]:
        g = [[] for _ in range(n)]  # 稀疏图用邻接表
        for x, y, wt in edges:
            g[x].append((y, wt))
            g[y].append((x, wt))

        dis = [-1] * n
        dis[0] = 0
        h = [(0, 0)]
        while h:
            dx, x = heappop(h)
            if dx > dis[x]:  # x 之前出堆过
                continue
            for y, wt in g[x]:
                new_dis = dx + wt
                if new_dis < disappear[y] and (dis[y] < 0 or new_dis < dis[y]):
                    dis[y] = new_dis  # 更新 x 的邻居的最短路
                    heappush(h, (new_dis, y))
        return dis
```





## 4. [Find the Number of Subarrays Where Boundary Elements Are Maximum](https://leetcode.cn/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum/description/) (Hard)

You are given an array of positive integers nums.

Return the number of subarrays of nums, where the first and the last elements of the subarray are equal to the largest element in the subarray.

 

Example 1:

> Input: nums = [1,4,3,3,2]
>
> Output: 6
>
> Explanation:
>
> There are 6 subarrays which have the first and the last elements equal to the largest element of the subarray:
>
> subarray [1,4,3,3,2], with its largest element 1. The first element is 1 and the last element is also 1.
> subarray [1,4,3,3,2], with its largest element 4. The first element is 4 and the last element is also 4.
> subarray [1,4,3,3,2], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [1,4,3,3,2], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [1,4,3,3,2], with its largest element 2. The first element is 2 and the last element is also 2.
> subarray [1,4,3,3,2], with its largest element 3. The first element is 3 and the last element is also 3.
> Hence, we return 6.

Example 2:

> Input: nums = [3,3,3]
>
> Output: 6
>
> Explanation:
>
> There are 6 subarrays which have the first and the last elements equal to the largest element of the subarray:
>
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> subarray [3,3,3], with its largest element 3. The first element is 3 and the last element is also 3.
> Hence, we return 6.



Example 3:

> Input: nums = [1]
>
> Output: 1
>
> Explanation:
>
> There is a single subarray of nums which is [1], with its largest element 1. The first element is 1 and the last element is also 1.
>
> Hence, we return 1.
>
>  
>
> Constraints:
>
> 1 <= nums.length <= 10^5
> 1 <= nums[i] <= 10^9



### My solution during the contest

```python

```



### [Better solution](https://leetcode.cn/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum/solutions/2738894/on-dan-diao-zhan-pythonjavacgo-by-endles-y00d/)

```python
class Solution:
    def numberOfSubarrays(self, nums: List[int]) -> int:
        ans = len(nums)
        st = [[inf, 0]]  # 无穷大哨兵
        for x in nums:
            while x > st[-1][0]:
                st.pop()
            if x == st[-1][0]:
                ans += st[-1][1]
                st[-1][1] += 1
            else:
                st.append([x, 1])
        return ans
```

