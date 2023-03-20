---
title: LeetCode Weekly Contest 337
author: 
date: 2023-03-20 09:50 +0800
categories: [Code, Leetcode Contest]
tags: [sorting, dynamic planning, backtracking, math]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202303/
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



## 2. [Check Knight Tour Configuration](https://leetcode.cn/problems/check-knight-tour-configuration/)

There is a knight on an n x n chessboard. In a valid configuration, the knight starts at the top-left cell of the board and visits every cell on the board exactly once.

You are given an n x n integer matrix grid consisting of distinct integers from the range [0, n * n - 1] where grid\[row][col] indicates that the cell (row, col) is the grid\[row][col]th cell that the knight visited. The moves are 0-indexed.

Return true if grid represents a valid configuration of the knight's movements or false otherwise.

Note that a valid knight move consists of moving two squares vertically and one square horizontally, or two squares horizontally and one square vertically. The figure below illustrates all the possible eight moves of a knight from some cell.

![Knight](knight.png)



**Example 1:**

![Example 1](yetgriddrawio-5.png)

Input: grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
Output: true
Explanation: The above diagram represents the grid. It can be shown that it is a valid configuration.



**Example 2:**

![Example 2](yetgriddrawio-6.png)

Input: grid = [[0,3,6],[5,8,1],[2,7,4]]
Output: false
Explanation: The above diagram represents the grid. The 8th move of the knight is not valid considering its position after the 7th move.



Constraints:

- n == grid.length == grid[i].length
- 3 <= n <= 7
- 0 <= grid\[row][col] < n * n
- All integers in grid are unique.

### My solution during the contest

```python
class Solution:
    def checkValidGrid(self, grid: List[List[int]]) -> bool:
        n = len(grid)
        location = {
            grid[i][j]: (i, j) for i, j in itertools.product(range(n), range(n))
        }
        if location[0] != (0, 0):
            return False

        def is_valid(x, y, new_x, new_y):
            if abs(new_x - x) == 2 and abs(new_y - y) == 1:
                return True
            return abs(new_y - y) == 2 and abs(new_x - x) == 1

        for i in range(1, n**2):
            x, y = location[i - 1]
            new_x, new_y = location[i]
            if not is_valid(x, y, new_x, new_y):
                return False
        return True
```



### Better solution

```python
class Solution:
    def checkValidGrid(self, grid: List[List[int]]) -> bool:
        pos = [0] * (len(grid) ** 2)
        for i, row in enumerate(grid):
            for j, x in enumerate(row):
                pos[x] = (i, j)  # 记录坐标
        if pos[0] != (0, 0):  # 必须从左上角出发
            return False
        for (i, j), (x, y) in pairwise(pos):
            dx, dy = abs(x - i), abs(y - j)  # 移动距离
            if (dx != 2 or dy != 1) and (dx != 1 or dy != 2):  # 不合法
                return False
        return True
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

