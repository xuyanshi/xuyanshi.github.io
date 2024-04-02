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
    if num == diff：
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



#### Correct Solution

```python
# TODO
```



### Q3 小苯强化武器 25 pts

小苯有一把武器，初始攻击力为0。

现在小苯面前有n个强化石，都可以用于强化该武器，每个强化石有一个强化上限a_i。

具体的，如果小苯使用第i个强化石强化他的武器，那么小苯首先需要选择一个在强化上限以内的非负整数 x 作为强化系数，假设小苯当前武器攻击力为k，那么会变为 k | x（其中|表示按位或操作）。接着第i个强化石在使用后会失效，即无法再次使用。

小苯想知道，这n个强化石最多能使他的武器攻击力强化为多少。

**输入描述**

本题包含多组测试数据。第一行输入一个正整数

T （1≤T ≤104），表示测试数据组数。

接下来，对于每组测试数据，输入包含两行。

第一行一个正整数 n（1 ≤ n ≤ 2x105），表示可以使用的强化石个数。

第二行 n 个整数a_i（0 ≤ a_i ≤ 10^9），表示每个强化石的强化上限。

（保证所有测试数据中 n的总和不超过2 ×10^5)

**输出描述**



**示例 1**

**输入**

```

```

**输出**

```

```

**说明**



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

