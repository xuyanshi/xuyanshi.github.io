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

- Let even denote the number of even indices in the binary representation of n (0-indexed) with value 1

- Let odd denote the number of odd indices in the binary representation of n (0-indexed) with value 1

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





## 3. [The Number of Beautiful Subsets](https://leetcode.cn/problems/the-number-of-beautiful-subsets/)

You are given an array nums of positive integers and a positive integer k.

A subset of nums is beautiful if it does not contain two integers with an absolute difference equal to k.

Return the number of non-empty beautiful subsets of the array nums.

A subset of nums is an array that can be obtained by deleting some (possibly none) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.

 

Example 1:

Input: nums = [2,4,6], k = 2
Output: 4
Explanation: The beautiful subsets of the array nums are: [2], [4], [6], [2, 6].
It can be proved that there are only 4 beautiful subsets in the array [2,4,6].



Example 2:

Input: nums = [1], k = 1
Output: 1
Explanation: The beautiful subset of the array nums is [1].
It can be proved that there is only 1 beautiful subset in the array [1].




Constraints:

1 <= nums.length <= 20
1 <= nums[i], k <= 1000

### My solution during the contest:

```python
```


### Better solution 1: Backtracking
#### Better solution 1-1

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        ans = -1  # 去掉空集
        cnt = [0] * (max(nums) + k * 2)  # 用数组实现比哈希表更快
        def dfs(i: int) -> None:
            if i == len(nums):
                nonlocal ans
                ans += 1
                return
            dfs(i + 1)  # 不选
            x = nums[i]
            if cnt[x - k] == 0 and cnt[x + k] == 0:
                cnt[x] += 1  # 选
                dfs(i + 1)
                cnt[x] -= 1  # 恢复现场
        dfs(0)
        return ans
```



#### Better solution 1-2

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        ans = -1  # 去掉空集
        cnt = [0] * (max(nums) + k * 2)  # 用数组实现比哈希表更快
        def dfs(i: int) -> None:  # 从 i 开始选
            nonlocal ans
            ans += 1
            if i == len(nums):
                return
            for j in range(i, len(nums)):  # 枚举选哪个
                x = nums[j]
                if cnt[x - k] == 0 and cnt[x + k] == 0:
                    cnt[x] += 1  # 选
                    dfs(j + 1)
                    cnt[x] -= 1  # 恢复现场
        dfs(0)
        return ans
```



### Better solution 2: Dynamic Planning

```python
class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        groups = defaultdict(Counter)
        for x in nums:
            groups[x % k][x] += 1
        ans = 1
        for cnt in groups.values():
            g = sorted(cnt.items())
            m = len(g)
            f = [0] * (m + 1)
            f[0] = 1
            f[1] = 1 << g[0][1]
            for i in range(1, m):
                if g[i][0] - g[i - 1][0] == k:
                    f[i + 1] = f[i] + f[i - 1] * ((1 << g[i][1]) - 1)
                else:
                    f[i + 1] = f[i] << g[i][1]
            ans *= f[m]
        return ans - 1  # -1 去掉空集
```








## 4. [Smallest Missing Non-negative Integer After Operations](https://leetcode.cn/problems/smallest-missing-non-negative-integer-after-operations/)

You are given a 0-indexed integer array nums and an integer value.

In one operation, you can add or subtract value from any element of nums.

For example, if nums = [1,2,3] and value = 2, you can choose to subtract value from nums[0] to make nums = [-1,2,3].
The MEX (minimum excluded) of an array is the smallest missing non-negative integer in it.

For example, the MEX of [-1,2,3] is 0 while the MEX of [1,0,3] is 2.
Return the maximum MEX of nums after applying the mentioned operation any number of times.

 

Example 1:

Input: nums = [1,-10,7,13,6,8], value = 5

Output: 4

Explanation: One can achieve this result by applying the following operations:
- Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
- Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
- Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]

The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.



Example 2:

Input: nums = [1,-10,7,13,6,8], value = 7

Output: 2

Explanation: One can achieve this result by applying the following operation:
- subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]

The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.



Constraints:

1 <= nums.length, value <= 10^5
-10^9 <= nums[i] <= 10^9

### My solution during the contest

```python
```



### Better solution

```python
class Solution:
    def findSmallestInteger(self, nums: List[int], m: int) -> int:
        cnt = Counter(x % m for x in nums)
        mex = 0
        while cnt[mex % m]:
            cnt[mex % m] -= 1
            mex += 1
        return mex
```
