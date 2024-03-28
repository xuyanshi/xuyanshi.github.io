---
title: "携程2024实习生在线笔试第二场-0328"
author: 
date: 2024-03-28 21:00 +0800
categories: [Code, Interview]
tags: [array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 3 月 28 日 19:00 - 21:00，携程 2024 实习生在线笔试第二场。



总限时 120 分钟，共 100 分。共四道编程题，每题25分钟。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，可以用本地IDE。



*Note: 试题回忆可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。抛砖引玉，敬请指正。*



## Q1 游游的 you 输出

游游希望你输出n个"you"，第一个正序输出，第二个倒序，第三个正序……以此类推。你能帮帮她吗？

**输入描述**

一个正整数n

1 <= n <= 10^5

**输出描述**


一个字符串，代表游游输出的字符串。


**示例 1**

**输入**

```
5
```

**输出**

```
youuoyyouuoyyou
```

### My Solution

送分题，不再赘述。通过100%。

```python
n = int(input())
you = 'you'
uoy = 'uoy'
for i in range(n):
    print(you if i % 2 == 0 else uoy, sep='', end='')
```

### Correct Solution

```python
# The Same
```

## Q2 游游的矩阵变换

游游拿到了一个 01 矩阵，她每次操作可以选择一个 1*2（1 行 2 列，不能 2 行 1 列）的区域，将所有字符都变成 1。游游想知道，将所有字符都变成 1 需要最少操作多少次？

**输入描述**

第一行输入两个正整数n,m，用空格隔开。
接下来的n行，每行输入一个长度为m的 01 串，代表游游拿到的矩阵。
2 <= n, m <= 1000

**输出描述**

一个整数，代表游游的最小操作次数。

**示例 1**

输入
```
3 3
111
111
111
```

输出
``````
0
``````

**示例 2**

输入
```
2 4
1010
1000
```

输出
```
4
```



### My Solution

从左上到右下逐个操作即可，操作完跳两格。通过100%。

```python
import sys

n, m = map(int, input().split())
mat = []
for line in sys.stdin:
    mat.append(list(map(int, list(line.strip())))) # Stupid

n = 2
m = 4
mat = [[1, 0, 1, 0], [1, 0, 0, 0]]

# 逐行操作
ans = 0
for i in range(n):
    j = 0
    while j < m:
        while j < m and mat[i][j] == 1:
            j += 1
        if j < m:
            ans += 1
            if j < m - 1:
                mat[i][j + 1] = 1
            j += 1
print(ans)
```

### Correct Solution

```python
# The Same
```



## Q3 游游的区间除2

游游拿到了一个数组，她可以进行最多一次操作：选择一个元素全是偶数的区间，使这个区间所有元素除以2。
游游希望最终所有元素之和尽可能大，你能帮帮她吗？

**输入描述**

第一行输入一个正整数n，代表数组的大小。
第二行输入n个正整数a<sub>i</sub>，代表数组的元素。
满足 $1 \leq n \leq 10^5$，$-10^9 \leq a_i \leq 10^9$。

**输出描述**

一个整数，代表最终所有元素之和的最大值。

**示例 1**

**输入**

```
5
8 -4 2 -6 -5
```

**输出**

```
-1
```

**说明**
选择区间[-4,2,-6]即可，操作后数组变成[8,-2,1,-3,-5]。

### My Solution


暴力。通过35%，似乎是超时了。


```python
n = int(input())
a = list(map(int, input().split()))

# n = 5
# a = [8, -4, 2, -6, -5]

init_sum = sum(a)
even = []
pre_sum = [0] * (n + 1)
for i, num in enumerate(a):
    if num % 2 == 0:
        even.append(i)
    pre_sum[i + 1] = pre_sum[i] + num
min_evens = min(a[e] for e in even)

for i in range(len(even)):
    j = i
    while j < len(even) and even[j] - even[j - 1] <= 1:
        cur_evens = pre_sum[j + 1] - pre_sum[i]
        min_evens = min(min_evens, cur_evens)
        j += 1

print(init_sum - min_evens // 2)
```

### Correct Solution

```python
# TODO
```



## Q4 游游的阶乘乘积因子

游游拿到了n个正整数a_i，她希望你求出这些数的阶乘全部乘在一起生成的大数有多少个因子。你能帮帮她吗？

**输入描述**

第一行输入一个正整数n。
第二行输入n个正整数a<sub>i</sub>，用空格隔开。
满足 $1 \leq n \leq 200000$，$1 \leq a_i \leq 10^6$。

**输出描述**

一个整数，代表这个乘积的因子数量，由于答案可能过大，请对$10^9+7$取模。

**示例 1**

**输入**

```
3
1 2 3
```

**输出**

```
6
```

**说明**
$1! \times 2! \times 3! = 1 \times 2 \times 6 = 12$，共有1, 2, 3, 4, 6, 12六个因子。

### My Solution

无脑暴力，严重超时，通过20%。

```python
import math

n = int(input())
a = list(map(int, input().split()))
all_times = 1
for num in a:
    for i in range(2, num + 1):
        all_times *= i
ans = 2  # 1与它本身是每个数的因子
sqr = int(math.sqrt(all_times))
for i in range(2, sqr + 1):
    if all_times % i == 0:
        if i * i == all_times:
            ans += 1
        else:
            ans += 2
print(ans)
```

### Correct Solution

```python
# TODO
```



