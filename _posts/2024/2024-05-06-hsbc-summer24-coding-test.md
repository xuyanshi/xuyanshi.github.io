---
title: "HSBC Summer 24 Coding Test"
author: 
date: 2024-05-06 20:35 +0800
categories: [Code, Interview]
tags: [string, dfs, bfs, graph]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



May 6th, 2024. Coding test of HSBC for summer 24 internship.



Just 2 coding problems, for one hour limit.



## Q1

[14. Longest Common Prefix](https://leetcode.cn/problems/longest-common-prefix/)

There are N people living in a state. In this state, people concatenate their town name before their first name. Write an algorithm to find the name of the town of the given N people where the name of the town is the common substring and has the maximum length.


**Input**
The first line of the input consists of an integer- size, representing the given number of people (N).
The second line consists ofN space-separated strings representing the first names of the people.


**Output**
Printa string in lowercase letters representing the name of the town of the givenN people where the
name of the town is the common substring and has the maximum length. If no such common prefix
is found, then do not print anything.


**Constraints**
0≤ size≤ 105
0< len< 106; where len is the length of the string.


**Note**
The names of the people are spelled in English letters and are case insensitive.


**Example**
Input:
```
5
Rosewood rose rosy rosemarry roshh
```
Output:
```
ros
```
Explanation:


The common substring with the maximum length in the names of the list of people, in the beginning is "ros".



### My Solution

Brute-Force

```python
def getTown(peopleNames):
    # Write your code here
    if not peopleNames:
        return ""
    length, n = len(peopleNames[0]), len(peopleNames)
    for i in range(n):
        peopleNames[i] = peopleNames[i].lower()
    for i in range(length):
        ch = peopleNames[0][i]
        if any(i == len(peopleNames[j]) or peopleNames[j][i] != ch for j in range(1, n)):
            return peopleNames[0][:i]
    return peopleNames[0]


def main():
    # input for peopleNames
    peopleNames = []
    peopleNames_size = int(input())
    peopleNames = list(map(str, input().split()))

    result = getTown(peopleNames)
    print(result)


if __name__ == "__main__":
    main()
```



## Q2

[695. Max Area of Island](https://leetcode.cn/problems/max-area-of-island/)



### My Solution

BFS

```python
"""
grid represents the two-dimensional grid with N rows and M columns.
"""


# def areaOfLargestHouse(grid):
def areaOfLargestHouse(grid: List[List[int]]):
    # Write your code here
    if not grid or not grid[0]:
        return 0
    n, m = len(grid), len(grid[0])

    def dfs(cur_i: int, cur_j: int) -> int:
        if cur_i < 0 or cur_j < 0 or cur_i >= n or cur_j >= m or grid[cur_i][cur_j] != 1:
            return 0
        grid[cur_i][cur_j] = 0
        res = 1
        for i, j in [[cur_i, cur_j + 1], [cur_i, cur_j - 1], [cur_i + 1, cur_j], [cur_i - 1, cur_j]]:
            res += dfs(i, j)
        return res

    ans = 0
    for ii in range(n):
        for jj in range(m):
            ans = max(ans, dfs(ii, jj))
    return ans


def main():
    # input for grid
    grid = []
    grid_rows, grid_cols = map(int, input().split())
    for idx in range(grid_rows):
        grid.append(list(map(int, input().split())))

    result = areaOfLargestHouse(grid)
    print(result)


if __name__ == "__main__":
    main()
```



