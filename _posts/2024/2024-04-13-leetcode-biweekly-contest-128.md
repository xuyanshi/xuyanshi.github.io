---
title: LeetCode Biweekly Contest 128
author: 
date: 2024-04-13 23:59 +0800
categories: [Code, Leetcode Contest]
tags: [array]
math: true
mermaid: true
pin: false

---





## [Contest](https://leetcode.cn/contest/biweekly-contest-126/)



## 1. [Score of a String](https://leetcode.cn/problems/score-of-a-string/description/) (Easy)

You are given an balabla.



### My solution during the contest

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/)

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[] {-1,-1};
    }
}
```



### Improvement

Better.





## 2. [Minimum Rectangles to Cover Points](https://leetcode.cn/problems/minimum-rectangles-to-cover-points/description/) (Middle)

You are given an balabla.



### My solution during the contest

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/)

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[] {-1,-1};
    }
}
```



### Improvement

Better.





## 3. [Minimum Time to Visit Disappearing Nodes](https://leetcode.cn/problems/minimum-time-to-visit-disappearing-nodes/description/) (Middle)

You are given an balabla.



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

