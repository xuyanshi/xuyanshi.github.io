---
title: "优酷-25届春季实习生-研发-第9批-0611"
author: 
date: 2024-06-11 20:45 +0800
categories: [Code, Interview]
tags: [math, array, hash]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---

2024 年 6 月 11 日 19:00 - 20:40，阿里大文娱（优酷） 2025 届研发笔试。



总限时 100 分钟，共 100 分。



前面是 15 道单选题，每题3分。



最后是三道算法题，分值分别为为 15/15/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**可以**用本地IDE（和其他阿里系不同）。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。



## 算法题

### Q1 小红买文具 15 pts

街上有 n 个文具店，第 i 个文具店售卖 y_i 个文具，每个文具的单价为 x_i 。

小红想买 m 个文具，她想知道最少需要花多少钱？

**输入描述**

第一行输入两个正整数n、m

接下来n行，每行输入两个正整数y_i、x_i，空格隔开。

1 <= n, m <= 10^5

1 <= y, x <= 10^5

所有y之和 >= m

**输出描述**

一个整数表示小红的最小花费。

**示例 1**

**输入**

```
3 2
1 1
1 2
1 3
```

**输出**

```
3
```

**说明**

```
前两个商店各买一个。
```



#### My Solution

简单模拟，通过100%

```python
from collections import defaultdict

n, m = map(int, input().split())
prices = defaultdict(int)
for _ in range(n):
    y, x = map(int, input().split())
    prices[x] += y
ans = 0
for pr in sorted(prices.keys()):
    cnt = prices[pr]
    if cnt >= m:
        ans += m * pr
        break
    else:
        ans += cnt * pr
        m -= cnt
print(ans)
```



### Q2 反转字符串 15 pts

Bilibili 0428 笔试原题：[Q2 反转字符串](https://xuyanshi.github.io/posts/bilibili-summer24-coding-test-0428/#q2-%E5%8F%8D%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2)

给出一个长度为 n 的字符串 s 和一个整数 k ，现在请你依次按照 `i = 1, 2, ... , n - k + 1` 的顺序求出以下操作得到的字符串：

将字符串 s 的第 i 个字符至第 i + k - 1 之间的所有字符翻转。

求出最终状态的字符串。

例如：n 是 5，k 是 3，s 是"hello"。

i=1时，翻转［1,3］ 之间的字符，得到 "lehlo"。

i= 2时，翻转［2,4］之间的字符，得到 "lIheo"。

i= 3时，翻转［3,5］之间的字符，得到 "lloeh"。

因此，最终的s为"lloeh"。

**输入描述**

输入包含两行。

第一行输入正整数 n ，k。

第二行输入仅由小写字母构成的字符串 s 。

2 ≤ k ≤ n ≤ 2 × 10^5

**输出描述**

输出 s 经过翻转后的最终状态。

**示例 1**

**输入**

```
5 3
hello
```

**输出**

```
lloeh
```

**示例 2**

**输入**

```
8 5
nowcoder
```

**输出**

```
odernowc
```

#### My Solution

根据n、k的奇偶性分四类讨论。通过100%。

```python
n, k = map(int, input().split())
s = input().strip()
ans = ''
if n % 2 == 0:
    if k % 2 == 0:
        ans = s[k - 1:] + s[:k - 1][::-1]
    else:
        ans = s[k - 1:] + s[:k - 1]
else:
    if k % 2 != 0:
        ans = s[k - 1:] + s[:k - 1][::-1]
    else:
        ans = s[k - 1:] + s[:k - 1]
print(ans)
```



### Q3 小红的 red 重排 25 pts

小红拿到了一个长度为3*n的字符串，其中'red'三种字符都恰好有n个。

现在她每次操作可以交换任意两个字符，请你求出小红使得该字符串包含n个"red"连续子串的操作操作次数，并给出任意一个方案。

**输入描述**

第一行输入一个正整数n。

第二行输入一个长度为3*n的，由n个'r'、n个'e'、n个'd'组成的字符串。

1≤ n ≤ 50000

**输出描述**

第一行输入一个正整数 q ，代表操作次数。

接下来的 q 行、毎行输入两个正整数u、v，代表交换第 u 个字符和第 v 个字符。

**示例 1**

**输入**

```
1
edr
```

**输出**

```
2
1 3
2 3
```

**说明**

```
首先交换第一个字符和第三个字符，字符串变成"rde"。
然后交换第二个字符和第三个字符，字符串变成"red"。
```

**示例 2**

**输入**

```
3
redredred
```

**输出**

```
0
```



#### My Solution

没做。

```python
# TODO
```

#### Correct Solution

```python
# TODO
```

