---
title: "阿里巴巴春季2025届校招笔试-工程-0330"
author: 
date: 2024-03-30 21:00 +0800
categories: [Code, Interview]
tags: [array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 3 月 30 日 19:00 - 20:40，阿里巴巴春季2025届校招笔试-工程-0330。

<img src="image-20240329212539951.png" alt="image-20240329212539951" style="zoom:50%;" />



总限时 100 分钟，共 100 分。



前面是 8 道单选题、7 道不定项选择题。最后是三道算法题，分值分别为为 10/20/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。


## 单项选择

## 不定项选择

## 算法题

### Q1 小红的翻倍异或

小红拿到了一个数组，她定义f（i）为：将第个元素翻倍后，数组所有元素的按位异或的值。

现在小红希望你求出f（1）到f（n）的值。

请注意，每次求f（i）后，原数组的元素不会真正翻倍。

**输入描述**

第一行输入一个正整数n，代表小红拿到的数组长度。

第二行输入n个正整数a_i，代表数组的元素。

1 ≤ n ≤ 10^5

1 ≤ a_i ≤ 10^9

**输出描述**

输出n行，每行输出一个整数，代表将第 i 个元素翻倍后，所有元素按位异或的值。

**示例 1**

**输入**

```
3
1 3 1
```

**输出**

```
0
6
0
```

**说明**

第一个元素翻倍后，数组为［2,3,1］，所有元素异或等于0。

第二个元素翻倍后，数组为［1,6,1］，所有元素异或等于6。

第三个元素翻倍后，数组为［1,3,2］，所有元素异或等于0。

#### My Solution

送分题，通过100%

```python
n = int(input())
a = list(map(int, input().split()))

all xor = 0
for num in a:
	all_xor ^= num
for num in a:
	print(all_xor ^ num ^ (num * 2) )
```

#### Correct Solution

```python
# The Same
```

### Q2 小红的区间选数乘积

小红拿到了一个正整数x，她希望在区间 [l, r] 中选择一个正整数，满足 x * y是完全平方数。小红想知道有多少种选择方案？

共有q次询问。

**输入描述**

第一行输入两个正整数q, x，代表询问次数和小红拿到的正整数。

接下来的q行，每行输入两个正整数l, r，代表一次询问

1 ≤ q ≤ 10^4

1 ≤ x ≤ 10^14

1 ≤ l ≤ r ≤ 10^14

**输出描述**

输出q行，每行输出一个整数，代表询问的答案。

**示例 1**

**输入**

```
1 2
6 9
```

**输出**

```
1
```

**说明**

只有选择8这一个方案。

#### My Solution

暴力超时，通过16.67%。

```python
from functools import lru_cache
from math import sqrt

@lru_cache (maxsize=None)
def is_ sqrt(n):
    sq = int(sqrt(n))
    return sq * sq == n

hashset = set ()
q, x = map(int, input() split())
for _ in range(q) :
    1, r = map(int, input() split())
    ans = 0
    for num in range(l, r + 1):
        if num in hashset:
        	ans += 1
        elif num % x == 0 and is_sqrt(num // x) :
        	ans += 1
        	hashset. add (num)
        elif is_ sqrt(x * num) :
        	ans += 1
        	hashset.add(num)
    print(ans)
```

#### Correct Solution

```python
# TODO
```



### Q3 小红的黑白鼠

小红养了一些实验用的小鼠，其中一些是黑色的，一些是白色的，小鼠们住在一棵树上，每只小鼠都在这棵树的一个节点上。

现在小红想重新安排每只小鼠的位置，然后在一条边上建一面墙，使得所有黑鼠和白鼠都被这面墙分开，小红想知道共有多少种建墙的方案。

**输入描述**

第一行输入一个整数 n（1 ≤ n ≤ 10^5）表示小鼠数量。

第二行输入一个长度为 n 的字符串 S 表示小鼠的颜色，第i个节点上小鼠的颜色为S_i，若 S_i 为 'B' 表示小鼠的颜色为黑色，若 S_i 为 'W' 则表示小鼠的颜色为白色。

接下来 n - 1 行，每行输入两个整数 u, v（1 ≤ u, v ≤ n） 表示树上存在一个 u 到 v 的边。

**输出描述**

输出一个整数表示答案。

**示例 1**

**输入**

```
3
BWB
1 2 
2 3
```

**输出**

```
2
```

**说明**

<img src="image-20240330203238074.png" alt="image-20240330203238074" style="zoom:50%;" />

总共有1个小白鼠。

方案1：在1-2之间建一面墙，将白鼠安排在第1个节点，将黑鼠安排在第2、3个节点。

方案2：在2-3之间建一面墙，将白鼠安排在第3个节点，将黑鼠安排在第1、2个节点。

#### My Solution

直接输出0，通过10%

```python
print(0)
```

#### Correct Solution

```python
# TODO
```

