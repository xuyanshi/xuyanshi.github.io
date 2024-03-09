---
title: 美团2024年春招第一场笔试【技术】
author: 
date: 2024-03-09 14:00 +0800
categories: [Code, Interview]
tags: [presum, array]
math: true
mermaid: true
pin: false

---



> Coming soon: English version of this article in progress



2024年3月9日10:00-12:00，美团笔试第一场。



平台为牛客网，使用ACM模式，即需要自己处理输入输出，语言不限。



*Note: 我的思路及解法可能较为笨拙，不敢保证正确性。抛砖引玉，敬请指正。*



## Q1

MT 是美团的缩写，因此小美很喜欢这两个字母。现在小美拿到了一个仅由大写字母组成字符串，她可以最多操作 k 次，每次可以修改任意一个字符。小美想知道，操作结束后最多共有多少个 'M' 和 'T' 字符？

**输入**

输入两个正整数 n 和 k，代表字符串长度和操作次数。

第二行输入一个长度为 n 的、仅由大写字母组成的字符串。

**约束条件**

- 1 ≤ k ≤ n ≤ 10^5

**输出描述**

输出操作结束后最多共有多少个 'M' 和 'T' 字符。

**示例 1**

**输入**

basic

复制

```
5 2
MTUAN
```

**输出**

复制

```
4
```

**说明**
修改第三个和第五个字符，形成的字符串为 MTTAM，这样共有 4 个 'M' 和 'T'。



**My Solution** 通过100%

```python
from collections import Counter

a = list(map(int, input().split()))
s = input()
cnt = Counter(s)

print(min(len(s), cnt['M'] + cnt['T'] + a[1]))
```



## Q2

