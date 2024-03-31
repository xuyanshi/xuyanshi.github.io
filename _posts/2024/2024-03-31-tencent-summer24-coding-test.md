---
title: "腾讯2024实习生在线笔试-0331"
author: 
date: 2024-03-31 22:10 +0800
categories: [Code, Interview]
tags: [array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 3 月 31 日 20:00 - 22:00，腾讯 2024 实习生在线笔试。

<img src="image-20240328153752881.png" alt="image-20240328153752881" style="zoom:50%;" />

总限时 120 分钟，共 100 分，五道算法题。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，可以用本地IDE。



*Note: 试题回忆可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。抛砖引玉，敬请指正。*



## Q1 小红的图上染色

小红拿到了一个无向图，其中一些边被染成了红色。

小红定义一个点是“好点”，当且仅当这个点的所有邻边都是红边。

现在请你求出这个无向图“好点”的数量。

注：如果一个节点没有任何邻边，那么它也是好点。

**输入描述**

第一行输入两个正整数n,m ，代表节点的数量和边的数量。

接下来的m行，每行输入两个正整数u, v和一个字符chr，代表节点 u 和节点v 有一条边连接。如果 chr 为'R'，代表这条边被染红；'W'代表未被染色。

1 <= n, m <= 10^5
1 <= u, v <= n

**输出描述**

一个整数，代表“好点”的数量。

**示例 1**

**输入**

```
4 4
1 2 R
2 3 W
3 4 W
1 4 R
```

**输出**

```
1
```

**说明**

只有 1 号节点是好点

### My Solution

通过6.67%，服了

```python
n, m = map(int, input().split())
graph = []
for _ in range(n):
    graph.append([0] * n)
for _ in range(m):
    u, v, ch = input().split()
    u, v = int(u) - 1, int(v) - 1
    if ch == 'W':
        graph[u][v] = 1
        graph[v][u] = 1
    elif ch == 'R':
        graph[u][v] = 2
        graph[v][u] = 2
ans = 0
for i in range(n):
    if max(graph[i]) == 0:
        ans += 1
    else:
        all_red = True
        for j in range(n):
            if graph[i][j] == 1:
                all_red = False
                break
        if all_red:
            ans += 1
print(ans)
```

### Correct Solution

```python

```



## Q2



**输入描述**



**输出描述**



**示例 1**



### My Solution



```python

```

### Correct Solution

```python

```



## Q3



**输入描述**



**输出描述**



**示例 1**



### My Solution



```python

```

### Correct Solution

```python

```



## Q4 



**输入描述**



**输出描述**



**示例 1**



### My Solution



```python

```

### Correct Solution

```python

```



## Q5 



**输入描述**



**输出描述**



**示例 1**



### My Solution



```python

```

### Correct Solution

```python

```



