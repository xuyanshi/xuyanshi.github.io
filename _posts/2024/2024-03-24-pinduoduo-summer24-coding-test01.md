---
title: "拼多多2025届暑期实习生-技术笔试0324"
author: 
date: 2024-03-24 22:00 +0800
categories: [Code, Interview]
tags: [xor, dynamic planning]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



> Coming soon: English version of this article in progress



2024年3月24日19:00-21:00，拼多多2025届暑期实习生-技术笔试。



总限时两小时，4道编程题，每道25分，共100分。



编程题使用ACM模式，即需要自己处理输入输出。语言不限，可以用本地IDE。



*Note: 我的思路及解法较为笨拙，且不敢保证正确性。抛砖引玉，敬请指正。*



## Q1 Alice & Bob

这里有 n 个正整数，a_1, ..., a_n

Alice 会先去掉其中最多 d 个数

Bob 接下来会将剩余的数中最多 m 个数乘以 -k

Alice 想要剩余数之和尽可能大，Bob 想要剩余数之和尽可能小。假设 Alice 和 Bob 都足够聪明，请问最后剩余数之和是多少。

**输入描述**

第一行一个正整数 T，接下来有 T 组数据

每组数据 2 行

第一行 4 个数 n, m, k, d ≤ (2 ≤ n ≤ 10^5) (0 ≤ m, d ≤ n) (1 ≤ k ≤ 10^4)

第二行 n 个数，a_1, a_2, ... , a_n (1 ≤ a_i ≤ 10^9)

保证 ∑n 不超过 10^5

**输出描述**

每组数据输出一行，每行一个数，表示剩余数之和

**示例 1**

输入:

```
1
3 1 1 1
4 1 1
```

输出:

```
0
```

说明:
Alice会去掉4，此时剩余数为[1, 1]
Bob会把一个1变为-1，此时剩余数为[-1, 1]，和为0

**示例 2**

输入:

```
1
3 1 1 1
4 3 2
```

输出:

```
1
```

说明:
Alice不会去掉任何数
Bob会把4变为-4，此时剩余数为[-4, 3, 2]，和为1

**示例 3**

输入:

```
2
5 4 2 0
3 5 1 4 1
10 4 1 6
1 8 2 9 3 3 4 5 3 200
```

输出:

```
-25
-9
```



### Correct Solution

```python

```



## Q2 伊文的字符串

伊文有两个由0和1组成的字符串，A和B，长度分别为m和n(m≥n)。伊文希望取出A的连续子串与B构造若干长度为n的S串，满足：

Si=Ax+i⊕Bi, i∈[1,n], x∈[0,m-n]

S1⊕S2⊕S3⊕...⊕Sn-1⊕Sn=0

⊕代表异或运算

伊文想知道总共能够构造出多少个不同的S串。

**输入描述**

输入有三行

第一行2个数m和n，为A和B的长度；m,n (0<n≤m≤5×10^3)

第二行为长度为m的A串

第三行为长度为n的B串，A和B仅由'0'和'1'组成

**输出描述**

输出：一个数字，代表不同的S串个数

**示例 1**

输入:

```
8 2
10100000
10
```

输出:

```
2
```

说明:
符合条件的S串为["00","11"]，分别由A的子串["10","01"]与B串得到

### My Solution

暴力居然通过100%，很离谱。

```python
m, n = map(int, input().split())
a = list(map(int, list(input())))
b = list(map(int, list(input())))

# m, n = 8, 2
# a, b = [1, 0, 1, 0, 0, 0, 0, 0], [1, 0]

ans = 0
s_set = set()
for i in range(m - n + 1):
    a_sub = a[i:i + n]
    s = tuple([(a_sub[i] ^ b[i]) for i in range(n)])
    s_set.add(s)
for s_str in s_set:
    xor = 0
    for num in s_str:
        xor ^= num
    if xor == 0:
        ans += 1
print(ans)
```



### Correct Solution

```python

```



## Q3 超级快递点



### My Solution (X)

多源BFS的思路，未完成。

```python
# n, m = map(int, input().split())
# graph = []
# for _ in range(n):
#     graph.append([False] * n)
# 
# for _ in range(m):
#     u, v = map(int, input().split())
#     graph[u - 1][v - 1] = True

n, m = 7, 7
graph = [[False, True, False, False, False, False, False], [False, False, True, False, True, False, False],
         [False, False, False, True, False, False, False], [False, False, False, False, False, False, True],
         [False, False, False, True, False, False, False], [False, False, False, True, False, False, False],
         [False, False, False, False, False, False, False]]

start = []  # 多源点 BFS
for j in range(n):
    j_end = False
    for i in range(n):
        if graph[i][j]:
            j_end = True
            break
    if not j_end:
        start.append(j)
visited = set()
for s in start:
    visited.add(s)
    for j in range(n):
        if s != j and graph[s][j] and j not in visited:
            # 应该逐级扩散，这里不会写了
            start.append(j)

ans = 0
for i in range(n):
    cnt = 0  # 计算联通点
    for j in range(n):
        if graph[i][j] or graph[j][i]:
            cnt += 1
    if cnt == n - 1:  # 除掉自身
        ans += 1
print(ans)
```



### Correct Solution

```python

```



## Q4 多多的回文修建

注意区分子序列和子串：

- [1332. 删除回文子序列](https://leetcode.cn/problems/remove-palindromic-subsequences/)
    - 简单题
- [1246. 删除回文子数组 (VIP)](https://leetcode.cn/problems/palindrome-removal/)
    - 困难题，与本题类似





### My Solution (X)

参考[此处](https://juejin.cn/post/7055934018528739365)，使用区间DP。但是超时了，只通过25%。

```python
T = int(input())
for i in range(T):
    s = input()
    if not s or len(s) == 0:
        print(0)
        continue
    n = len(s)
    if n == 1:
        print(1)
        continue
    dp = []
    for i in range(n):
        dp.append([1000] * n)
        dp[i][i] = 1
    for j in range(1, n):
        for i in range(j - 1, -1, -1):
            if i == j - 1:  # 元素相邻
                dp[i][j] = 1 if s[i] == s[j] else 2
                continue
            if s[i] == s[j]:  # 两端元素相等
                dp[i][j] = min(dp[i][j], dp[i + 1][j - 1])
            for k in range(i, j):
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k + 1][j])
    print(dp[0][n - 1])
```



### Correct Solution

```python

```



