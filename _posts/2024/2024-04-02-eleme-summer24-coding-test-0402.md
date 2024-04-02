---
title: "饿了么春季2025届校园招聘在线笔试-0402"
author: 
date: 2024-04-02 21:00 +0800
categories: [Code, Interview]
tags: [bit manipulation, math, ]
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

## 单选题

（部分选项略）
#### Q1


#### Q2




#### Q3



#### Q4



#### Q5



#### Q6



#### Q7



#### Q8


## 不定项选择
#### Q1



#### Q2



#### Q3



#### Q4


#### Q5




#### Q6



#### Q7



## 算法题

### Q1 小红的连通图 10 pts

小红有一个只有n个点的图，图上没有边，她准备在这张图上连m 条无向边，将这个图变成无自环无重边的简单连通图，小红想知道是否存在至少一种连边方案。

**输入描述**

第一行输入一个整数T（1≤T ≤ 10^ 5）表示询问数量。

第二行输入两个整数n,m（1≤n,m ≤ 10^9）。

**输出描述**

对于每个询问，若存在至少一种连边方案，则输出"YES"。否则输出“NO"。

**示例 1**

**输入**

```
2
3 3
3 1
```

**输出**

```
YES
NO
```

#### My Solution

算一下n个顶点的无环连通图能拥有的最小及最大边数即可。通过100%

```python
# 1.小红的连通图
T = int(input())

def judge(n, m):
	min_sides = n - 1
	if m < min_sides:
		return False
	max_sides = n* (n - 1) // 2
	if m > max_sides:
		return False
	return True

for _ in range (T):
    # graph = []
    n, m = map(int, input() split())
    if judge(n, m):
    	print("YES")
    else:
    	print ("NO")
```

#### Correct Solution

```python
# The Same
```



### Q2 小红打怪 20 pts

小红面前有n个怪物，站成一排，最初每个怪物有a_i的流血状态，小红可以进行 m 次攻击，每次攻击选择k个连续的怪物，每个怪物增加1层流血状态。小红想知道m 次攻击之后，流血状态最少的怪物最多可以有多少层流血状态。

**输入描述**

第一行输入三个整数 n，m， k，表示怪物数量，攻击次数，每次攻击选择的怪物数量。

第二行输入 n个整数 a_i，表示每个怪物初始的流血状态。

1 ≤ k ≤ n ≤ 10^5

1 ≤ a_i, m ≤ 10^9

**输出描述**

输出一个整数，表示流血状态最少的怪物最多可以有多少层流血状态。

**示例 1**

**输入**

```
5 3 2
3 1 2 5 4
```

**输出**

```
4
```

**说明**

3 次攻击分别选择 [1, 2], [2, 3], [2, 3]，最后怪物的流血状态为[4, 4, 4, 5, 4]，流血状态最少的怪物最多有4 层流血状态。

#### Correct Solution

```python
# TODO
```



### Q3 小红的子序列 25 pts

小红拿到了一个数组，数组的元素的绝对值不超过1，她想取一个非空子序列（在原数组中可以不连续），并计算该子序列的乘积。

小红想知道，子序列乘积为-1、0、1的方案数分别有多少种？

**输入描述**

第一行输入一个正整数n，代表数组的大小。

第二行输入n个整数a_i，代表数组的元素。

1 ≤ n≤ 10^5

-1 ≤ ai ≤ 1

**输出描述**

三个整数，分别代表子序列乘积为负数、0、正数的方案数。由于答案可能过大，请对10^9+7取模。

**示例 1**

**输入**

```
4
-1 0 -1 1
```

**输出**

```
4 8 3
```

**说明**

长度为1的子序列共有4个，乘积为-1的有2个，乘积为0的有1个，乘积为1的有1个。

长度为2的子序列共有6个，乘积为-1的有2个，乘积为0有3个，乘积为1的有1个。

长度为3的子序列共有4个，乘积为-1的有0个，乘积为0的有3个，乘积为1的有1个。

长度为 4 的子序列只有1个，乘积为0。

#### My Solution

把-1/0/1的个数先统计出来，再分类求组合总数。暴力超时，只通过了百分之十几。

```python
# Wrong
from math import comb
from functools import cache

n = int(input())
a = list(map(int, input().split()))
MOD = 10 ** 9 + 7
cnt = [0, 0, 0]

for num in a:
	cnt [num + 1] += 1
negl = zero = one = 0 #统计 -1,0,1 的个数

@cache
def countOdd(m): # 奇数组合数，不含空
    cur = 0
    for i in range(1, m + 1, 2):
        cur += comb(m, i)
        cur %= MOD
    return cur

@cache
def countEven (m): # 偶数组合数，不含空
    cur = 0
    for i in range(2, m + 1, 2):
        cur += comb (m, i)
        cur %= MOD
    return cur

@cache
def countALL(m):  # 任意组合，不含空
    cur = 0
    for i in range (1, m+1):
        cur += comb (m, 1)
        cur %= MOD
    return cur

# 不能有0。-1奇数，1任意
neg1 = countodd (cnt [0]) * (countAll(cnt (2]) + 1)

# 至少有1个0，-1/1随意
zero = countAll(cnt [1]) * (countAll(cnt [0]) + 1) % MOD * (countAll(cnt [2]) + 1) % MOD
                             
# 不能有0。-1偶数，1任意；-1没有，1至少有一个
one = countEven (cnt [0]) * (countAll (cnt (2]) + 1) + countAll (cnt [2])
                             
print (negl, zero, one)
```

#### Correct Solution

```python
# TODO
```

