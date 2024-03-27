---
title: "淘天集团2025届暑期实习生笔试-0327"
author: 
date: 2024-03-27 22:00 +0800
categories: [Code, Interview]
tags: [priority queue, two pointers, array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



> Coming soon: English version of this article in progress



2024年3月27日19:00-20:40，淘天集团2025届暑期实习生技术笔试。



总限时 100 分钟，共 100 分。前面有若干道单选/不定项选择，难度较大，包括 Linux 命令、权限，缓存、锁降级、锁高速缓存，Java 抽象类、抽象方法，设计模式，HTTP、Web Socket 等。最后是三道算法题，分值分别为为 15, 15, 25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。抛砖引玉，敬请指正。*



## Q1 小苯的比赛上分

有一款著名的大型多人电子竞技游戏网站"喜爱福”，网站通常会举办一些比赛。通常一名参赛选手只有一个账号，但不难猜到，总会有人“开小号”上分。
小苯就是一位该游戏的忠实玩家，他总共有几个账号，每个账号的分数分别为 a_i。
他深谙游戏中一位著名玩家 st...Ik的一句名言

### My Solution

使用优先队列（最小堆），通过100%，较为简单。

```python
import heapq

n, m = 5, 6
a = [1145, 1500, 1600, 1538, 1222]
b = [10, 400, 500, 1000, 2000, 10000]

max_rating = max(a)
heapq.heapify(a)
for i in range(m):
    rating = b[i]
    cur = heapq.heappop(a) + rating
    max_rating = max(max_rating, cur)
    heapq.heappush(a, cur)
    print(max_rating)
```

### Correct Solution

```python
# The Same
```

## Q2 小苯的区间删除

>  本题类似 [1574. 删除最短的子数组使剩余数组有序](https://leetcode.cn/problems/shortest-subarray-to-be-removed-to-make-array-sorted/)，略微提升了难度。



### My Solution

基于力扣 1574 题的双指针思路，累加可能的删除区间数，通过了比赛时的两个测试用例。但提交后通过0%，原因不详。

```python
n = 5
a = [1, 3, 2, 2, 5]


def count_range(a, n):
    j = n - 1
    ans = 0
    while j > 0 and a[j - 1] <= a[j]:
        j -= 1
    if j == 0:
        return n * (n - 1)
    ans = n - j
    for i in range(n):
        while j < n and a[i] > a[j]:
            j += 1
        ans += n - j
    return ans


print(count_range(a, n))
```

### Correct Solution

```python

```



## Q3 小苯的魔法染色



### Correct Solution

```python

```



## 
