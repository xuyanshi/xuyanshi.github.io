---
title: "哔哩哔哩 2025 届暑期实习在线笔试-0428"
author: 
date: 2024-04-28 20:35 +0800
categories: [Code, Interview]
tags: [math, array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 4 月 28 日 19:00 - 20:30，哔哩哔哩 2025 届工程研发笔试 Java 卷。

总限时 90 分钟，共 100 分。

<img src="image-20240428202642958.png" alt="image-20240428202642958" style="zoom:50%;" />

前面是 25 道单选题，每题两分，共 50 分。包括 408、数据库、Linux、Java、JVM 等等。



最后是两道算法题，分值分别为 20/30 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，可以用本地 IDE。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。

## 算法题

### Q1 连续段个数

青牛小学一年一度的六一儿童节开始了。

现在牛牛们围成一圈坐在草地上，为了方便，我们把牛牛们编号为牛1，牛2，牛3，牛n。其中牛1与牛2相邻，牛2与牛3相邻，牛n与牛1相邻

为了更好的安排接下来的活动，牛老师很好奇：从这些牛中选出几只相邻的牛，总共有多少种不同的方案

我们认为两个方案不同，当且仅当两种选法选出的牛个数不同 或 选出的牛的编号不完全相同

**输入描述**

输入一个整数n，表示牛的个数

**输出描述**

输出一个整数n，表示方案数

**补充说明**

对于100%的数据，保证 n ≥ 1

对于10%的数据，保证 n ≤ 5

对于30%的数据，保证n ≤ 100

对于60%的数据，保证n ≤ 1000

对于100%的数据，保证 n ≤ 10^9

**示例 1**

**输入**

```
2
```

**输出**

```
3
```

**说明**

```
环为1,2
可以选择（1｝，｛2｝，｛1,2｝
```

**示例 2**

**输入**

```
4
```

**输出**

```
13
```

**说明**

```
环为1,2,3,4
可以选择
{1}, {2}, {3}, {4},
{1, 2}, {2, 3}, {3,4}, {4, 1},
{1, 2, 3}, {2, 3, 4}, {3, 4, 1}, {4, 1, 2}
{1, 2, 3, 4}
共13种情况
```



#### My Solution

数学题，很简单的找规律

```python
n = int(input())
print(n * (n - 1) + 1)
```

#### Correct Solution

```python
# The Same
```



### Q2 反转字符串

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

部分超时，通过 60%。

同样是找规律，n 为奇偶数分开讨论。n为奇数时的规律我还没找全，暴力超时了一部分。

```python
# 部分超时，通过 60%
from typing import List

n, k = map(int, input().split())
s = input().strip()
s_lst = list(s)


def turn_over(s: List[str], left: int, right: int) -> None:
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1


if n % 2 == 0:
    print(s[k - 1:] + s[:k - 1])
else:
    pre = s[k - 1:]  # 后面 n-k+1 个移到最前面
    # 但是前面的我还没找到啥明显规律，不知道该咋写
    for i in range(n - k + 1):
        turn_over(s_lst, i, i + k - 1)
    print(''.join(s_lst))
```

#### Correct Solution

```python
# TODO
```

