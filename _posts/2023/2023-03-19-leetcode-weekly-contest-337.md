---
title: LeetCode Weekly Contest 337
author: 
date: 2023-03-20 09:50 +0800
categories: [Code, Leetcode Contest]
tags: [sorting, dynamic planning, backtracking, math]
math: true
mermaid: true
pin: false

---





## [Contest](https://leetcode.cn/contest/weekly-contest-337/)



## 1. [Number of Even and Odd Bits](https://leetcode.cn/problems/number-of-even-and-odd-bits/)

You are given a positive integer n.

Let even denote the number of even indices in the binary representation of n (0-indexed) with value 1.

Let odd denote the number of odd indices in the binary representation of n (0-indexed) with value 1.

Return an integer array answer where answer = [even, odd].

 

Example 1:

Input: n = 17
Output: [2,0]
Explanation: The binary representation of 17 is 10001. 
It contains 1 on the 0th and 4th indices. 
There are 2 even and 0 odd indices.



Example 2:

Input: n = 2
Output: [0,1]
Explanation: The binary representation of 2 is 10.
It contains 1 on the 1st index. 
There are 0 even and 1 odd indices.



Constraints:

1 <= n <= 1000



### My solution during the contest

```python
class Solution:
    def evenOddBit(self, n: int) -> List[int]:
        n = bin(n)[2:]  # transfer n to a binary string
        even = odd = 0
        for i in range(len(n)):
            if n[-1 - i] == '1':
                if i % 2 == 0:
                    even += 1
                else:
                    odd += 1
        return [even, odd]
```



### Better solution 1

```python
class Solution:
    def evenOddBit(self, n: int) -> List[int]:
        ans = [0, 0]
        i = 0
        while n:
            ans[i] += n & 1
            n >>= 1
            i ^= 1
        return ans
```



### Better solution 2

Use a binary mask `0x55555555`, which is `0b010101...` in binary presentation to count the quantity of 1 respectively.

```python
class Solution:
    def evenOddBit(self, n: int) -> List[int]:
        MASK = 0x5555
        return [(n & MASK).bit_count(), (n & (MASK >> 1)).bit_count()]
```



## 2. Q2 (Middle) [6316. Rearrange Array to Maximize Prefix Score](https://leetcode.cn/problems/rearrange-array-to-maximize-prefix-score/)

You are given a 0-indexed integer array nums. You can rearrange the elements of nums to any order (including the given order).

Let prefix be the array containing the prefix sums of nums after rearranging it. In other words, prefix[i] is the sum of the elements from 0 to i in nums after rearranging it. The score of nums is the number of positive integers in the array prefix.

Return the maximum score you can achieve.

 

Example 1:

Input: nums = [2,-1,0,1,-3,3,-3]
Output: 6
Explanation: We can rearrange the array into nums = [2,3,1,-1,-3,0,-3].
prefix = [2,5,6,5,2,2,-1], so the score is 6.
It can be shown that 6 is the maximum score we can obtain.

Example 2:

Input: nums = [-2,-3,0]
Output: 0
Explanation: Any rearrangement of the array will result in a score of 0.


Constraints:

- 1 <= nums.length <= 105
- -106 <= nums[i] <= 106



### My solution during the contest

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        pre_sum = cnt = 0
        for num in nums:
            pre_sum += num
            if pre_sum > 0:
                cnt += 1
            else:
                break
        return cnt
```



### Better solution

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        return sum(s > 0 for s in accumulate(nums))
```





## 3. Q3(Middle) [Count the Number of Beautiful Subarrays](https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays/)

You are given a 0-indexed integer array nums. In one operation, you can:

Choose two different indices i and j such that 0 <= i, j < nums.length.
Choose a non-negative integer k such that the kth bit (0-indexed) in the binary representation of nums[i] and nums[j] is 1.
Subtract 2k from nums[i] and nums[j].
A subarray is beautiful if it is possible to make all of its elements equal to 0 after applying the above operation any number of times.

Return the number of beautiful subarrays in the array nums.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [4,3,1,2,4]
Output: 2
Explanation: There are 2 beautiful subarrays in nums: [4,3,1,2,4] and [4,3,1,2,4].
- We can make all elements in the subarray [3,1,2] equal to 0 in the following way:
  - Choose [3, 1, 2] and k = 1. Subtract 21 from both numbers. The subarray becomes [1, 1, 0].
  - Choose [1, 1, 0] and k = 0. Subtract 20 from both numbers. The subarray becomes [0, 0, 0].
- We can make all elements in the subarray [4,3,1,2,4] equal to 0 in the following way:
  - Choose [4, 3, 1, 2, 4] and k = 2. Subtract 22 from both numbers. The subarray becomes [0, 3, 1, 2, 0].
  - Choose [0, 3, 1, 2, 0] and k = 0. Subtract 20 from both numbers. The subarray becomes [0, 2, 0, 2, 0].
  - Choose [0, 2, 0, 2, 0] and k = 1. Subtract 21 from both numbers. The subarray becomes [0, 0, 0, 0, 0].


Example 2:

Input: nums = [1,10,4]
Output: 0
Explanation: There are no beautiful subarrays in nums.



### My solution during the contest:

```python
```



### Better solution

```python

class Solution:
    def beautifulSubarrays(self, nums: List[int]) -> int:
        s = list(accumulate(nums, xor, initial=0))
        ans, cnt = 0, Counter()
        for x in s:
            ans += cnt[x]
            cnt[x] += 1
        return ans
```



### Improvement

XOR + pre sum





## 4. Q4 (Hard) [6318. Minimum Time to Complete All Tasks](https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/)

There is a computer that can run an unlimited number of tasks at the same time. You are given a 2D integer array tasks where tasks[i] = [starti, endi, durationi] indicates that the ith task should run for a total of durationi seconds (not necessarily continuous) within the inclusive time range [starti, endi].

You may turn on the computer only when it needs to run a task. You can also turn it off if it is idle.

Return the minimum time during which the computer should be turned on to complete all tasks.

 

Example 1:

Input: tasks = [[2,3,1],[4,5,1],[1,5,2]]
Output: 2
Explanation: 
- The first task can be run in the inclusive time range [2, 2].
- The second task can be run in the inclusive time range [5, 5].
- The third task can be run in the two inclusive time ranges [2, 2] and [5, 5].
The computer will be on for a total of 2 seconds.
Example 2:

Input: tasks = [[1,3,2],[2,5,3],[5,6,2]]
Output: 4
Explanation: 
- The first task can be run in the inclusive time range [2, 3].
- The second task can be run in the inclusive time ranges [2, 3] and [5, 5].
- The third task can be run in the two inclusive time range [5, 6].
The computer will be on for a total of 4 seconds.


Constraints:

- 1 <= tasks.length <= 2000
- tasks[i].length == 3
- 1 <= starti, endi <= 2000
- 1 <= durationi <= endi - starti + 1



### My solution during the contest

```python
```



### Better solution

```python
class Solution:
    def findMinimumTime(self, tasks: List[List[int]]) -> int:
        tasks.sort(key=lambda t: t[1])
        st = [(-2, -2, 0)]  # 闭区间左右端点，栈底到栈顶的区间长度的和
        for start, end, d in tasks:
            _, r, s = st[bisect_left(st, (start,)) - 1]
            d -= st[-1][2] - s  # 去掉运行中的时间点
            if start <= r:  # start 在区间 st[i] 内
                d -= r - start + 1  # 去掉运行中的时间点
            if d <= 0: continue
            while end - st[-1][1] <= d:  # 剩余的 d 填充区间后缀
                l, r, _ = st.pop()
                d += r - l + 1  # 合并区间
            st.append((end - d + 1, end, st[-1][2] + d))
        return st[-1][2]
```



### Improvement

