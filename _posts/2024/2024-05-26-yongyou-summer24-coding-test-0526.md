---
title: "用友技术笔试-友新星实习项目-Java"
author: 
date: 2024-05-26 16:30 +0800
categories: [Code, Interview]
tags: [array, hash, dynamic planning, bisection, sorting]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 5 月 26 日 15:00 - 17:00，用友技术笔试-友新星实习项目-Java卷。



总限时 120 分钟，总分 100 分。



共四道算法题，分值分别为 15/15/30/40 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言限制只能用 Java，可以用本地IDE。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。



## 算法题

### Q1 计算让两个数组相等的所需的最少操作数量 15 pts

给定两个长度都是 n（n>0）的整数数组 nums1 和 nums2，再给定一个整数k。

你可以对数组 nums2 进行以下操作：

- 选择两个下标 i 和 j，满足：0 <= i < n
- nums2［i］ = nums2［i］ + k，且 nums2 [j] = nums2 [j] - k;

如果对于所有整数 i（0 <= i < n），都有 nums1[i] == nums2[i]，那么称 nums1 等于 nums2。

计算使 nums1 等于 nums2 所需的 **最少**操作数量。

如果没办法让它们相等，直接返回-1。

**输入描述**

- n == nums1.length == nums2.length

- 2 <= n <= 10^5

- 0 <= nums1[i] , nums2[i] <= 10^9

- 1 <= k <= 10^5



**示例 1**

**输入**

```
3
```

**输出**

```
4
```

**说明**

```
110的权值是1。
011的权值是1。
111的权值是2。
除了这三个01串，其余01串的权值均为0。
所以答案是4。
```



#### My Solution

简单模拟。通过100%

```java
public long minOperations(int[] nums1, int[] nums2, int k) {
    // write code here
    long bigger = 0, smaller = 0;
    for (int i = 0; i < nums1.length; i++) {
        int diff = nums1[i] - nums2[i];
        if (diff % k != 0) {
            return -1;
        }
        if (diff < 0) {
            smaller += -diff / k;
        }
        if (diff > 0) {
            bigger += diff / k;
        }
    }
    if ((bigger - smaller) % 2 != 0) {
        return -1;
    }
    return Math.max(bigger, smaller);
}
```

#### 

### Q2 小红的红黑树 15 pts

小红有一棵有n个节点的树，其中每个节点是红色或者黑色，她想知道有多少条简单路径恰好经过一个红点和一个黑点。

**输入描述**

第一行输入一个整数 n（1 ≤ n ≤ 10^5）表示节点数量。

第二行输入一个长度为 n 的字符串 s 表示节点的颜色，第 i 个节点的颜色为 S_i，若 S_i 为 'B’ 表示节点的颜色为黑色，若 S_i 为 'R' 则表示节点的颜色为红色。

接下来 n-1行，每行输入两个整数 u, v 表示树上的边 （1 <= u, v <= n）

**输出描述**

输出一个整数表示答案。

**示例 1**

**输入**

```
3
BRB
1 2
2 3
```

**输出**

```
2
```

**说明**

```
有 1-2、2-3 两条路径
```

#### My Solution

比较简单，逐个判断所有边是不是一端黑一端红即可。通过100%。

```python
n = int(input())
color = input().strip()
b = set()
r = set()
for i, c in enumerate(color):
    if c == "B":
        b.add(i + 1)
    else:
        r.add(i + 1)
        
ans = 0
for _ in range(n - 1):
    u, v = map(int, input().split())
    if (u in b and v in r) or (u in r and v in b):
        ans += 1
print(ans)
```



### Q3 小红的 4 倍数 25 pts

小红拿到了一个数字串，她想取一个长度为k的子序列，满足这个子序列对应的正整数是4的倍数。小红想知道有多少种不同的选择方案？

请注意，选择的子序列包含前导零也是合法的。

**输入描述**

第一行输入两个正整数n、k，代表数字串的长度和取的子序列长度。

第二行输入一个长度为n的、仅由数字字符组成的字符串。

1 ≤ k ≤ n ≤ 200000

**输出描述**

一个整数，代表合法的子序列数量。由于答案很大，输出答案对10^9＋7取模的结果。

**示例 1**

**输入**

```
3 2
120
```

**输出**

```
2
```

**说明**

```
长度为2的三个子序列中，12和20是合法的，10是不合法的。
```

**示例 2**

**输入**

```
3 2
010
```

**输出**

```
1
```

**说明**

```
只有 00 是合法的。
```



#### My Solution



```java
# TODO
```

