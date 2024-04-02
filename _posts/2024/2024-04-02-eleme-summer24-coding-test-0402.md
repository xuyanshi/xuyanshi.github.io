---
title: "饿了么春季2025届校园招聘在线笔试-0402"
author: 
date: 2024-04-02 21:00 +0800
categories: [Code, Interview]
tags: [bit manipulation, math, array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 4 月 2 日 19:00 - 20:40，饿了么 2025 届春招工程研发笔试。

<img src="f9ee262b26a1518a0e170c76de1dd64d.png" alt="f9ee262b26a1518a0e170c76de1dd64d" style="zoom:50%;" />



总限时 100 分钟，共 100 分。



前面是 8 道单选题、7 道不定项选择题。

![image-20240402203457000](image-20240402203457000.png)



最后是三道算法题，分值分别为为 10/20/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。

## 算法题

### Q1 小红的数组相似 10 pts

小红定义两个数组是相似的，当且仅当两个数组的总和相等。小红有两个长度为n的数组a和b，小红想知道有多少个i（1≤i≤n）满足将a_i翻倍一次后，a 数组和 b 数组是相似的。

**输入描述**

第一行输入一个整数n（1 ≤ n ≤ 10^5）表示数组长度

第二行输入 n 个整数表示数组 a (-10^9 <= a_i <= 10^9) 

第三行输入 n个整数表示数组b (-10^9 <= b_i <= 10^9) 

**输出描述**

输出一个整数

**示例 1**

**输入**

```
3
1 1 1
1 2 1
```

**输出**

```
3
```

**说明**

```
b数组总和为4.
任意把一个1翻倍后，a的总和都为4，所以答案是3
```



#### My Solution

找a中有几个数字等于两个数组之差即可。通过100%

```python
n = int (input())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
a_sum = sum(a)
b_sum = sum(b)
diff = b_sum - a_sum
ans = 0
for num in a:
    if num == diff:
    	ans += 1
print (ans)
```

#### Correct Solution

```python
# The Same
```



### Q2 小苯切绳子 20 pts

小苯有 n根绳子，从1编号到n，每根绳子长度为a_i。小苯希望他的绳子们长度相等，他最多切k次绳
子。具体的：每次选择一个长度为 s 的绳子，将其切成长度分别为 x, y 的两段，满足： x, y 均为正整数，
且 x + y = s。

**输入描述**

本题有多组测试数据，输入包含若干行。

第一行一个正整数T（1 ≤ T ≤ 10^4），表示数据组数。

接下来，对于每组测试数据：

第一行两个正整数 n（1 ≤ n ≤ 10^5）, k（0 ≤ k ≤ 10^9），分别表示小苯拥有的绳子个数，以及最多的操作次数。

第二行n个正整数 a_i （1 ≤ a_i ≤ 10^9），表示每根绳子的长度。

（保证所有测试数据中 n的总和不超过10^5）

**输出描述**

输出包含 T 行，对于每个测试数据，如果小苯可以做到让绳子一样长输出"YES"，否则输出"NO"（不包含双引号）。

**示例 1**

**输入**

```
2
3 4
1 3 2
4 1
2 2 2 3
```

**输出**

```
YES
NO
```

**说明**

```
第一个测试数据：
将第二根绳子切两刀变为：1，1，1，将第三根绳子切一刀变成1，1。此时所有绳子都长1。
```

#### My Solution

数论。求出最大公约数`GCD`，判断`k`次内能不能把所有绳子剪成`GCD`长度。通过100%

```python
from math import gcd

T = int(input())
for _ in range (T):
    n, k = map(int, input().split())
    a = list(map(int, input().split()))
    GCD = a [0]
    for num in a:
        GCD = gcd (GCD, num)
        if num == 1:
        	break
    ans = False
    cur_split = 0
    for num in a:
        cur_split += (num // GCD) - 1
        if cur_split > k:
        	break
    if cur_split <= k:
    	ans = True
    print("YES" if ans else "NO")
```

#### Correct Solution

```python
# The Same
```



### Q3 小苯强化武器 25 pts

小苯有一把武器，初始攻击力为0。

现在小苯面前有n个强化石，都可以用于强化该武器，每个强化石有一个强化上限a_i。

具体的，如果小苯使用第i个强化石强化他的武器，那么小苯首先需要选择一个在强化上限以内的非负整数 x 作为强化系数，假设小苯当前武器攻击力为k，那么会变为 k | x（其中|表示按位或操作）。接着第i个强化石在使用后会失效，即无法再次使用。

小苯想知道，这n个强化石最多能使他的武器攻击力强化为多少。

**输入描述**

本题包含多组测试数据。第一行输入一个正整数 T （1 ≤ T ≤ 10^4），表示测试数据组数。

接下来，对于每组测试数据，输入包含两行。

第一行一个正整数 n（1 ≤ n ≤ 2x105），表示可以使用的强化石个数。

第二行 n 个整数a_i（0 ≤ a_i ≤ 10^9），表示每个强化石的强化上限。

（保证所有测试数据中 n 的总和不超过2 ×10^5)

**输出描述**

输出包含 T 行，表示每组测试数据的答案。

对于每组测试数据，输出一行一个整数，表示小苯的武器能达到的最大攻击力。

**示例 1**

**输入**

```
2
5
2 3 3 3 6
3
1 0 0
```

**输出**

```
7
1
```

#### My Solution

骗分解法，把攻击力拉满。答案错误，只通过了9%。

```python
T = int(input())
for _ in range (T):
    n = int (input())
    a = list(map(int, input().split()))
    ans = 0
    for stone in a:
    	length = 0
    	while stone > 0:
    		length += 1
    		stone //= 2
    	# ans |= stone
    	ans = max(ans, 2 ** length - 1)
    print (ans)
```

#### Correct Solution

```python
# TODO
```

