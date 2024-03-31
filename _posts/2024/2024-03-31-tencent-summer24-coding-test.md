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

通过100%

刚开始没想到可能是多重图，卡了半小时，坑死

```python
# 100%
n, m = map(int, input().split())
ans = [True] * n
for _ in range(m):
    u, v, ch = input().split()
    u, v = int(u) - 1, int(v) - 1
    if ch == "W":
        ans[u] = False
        ans[v] = False
print(sum(ans))

# WRONG! Pass: 6.67%
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
# The Same
```



## Q2 小红的链表断裂

小红拿到了一个链表。她准备将这个链表断裂成两个链表，再拼接到一起，使得链表从头节点到尾部升序。你能帮小红判断能否达成目的吗？

给定的为一个链表数组，你需要对于数组中每个链表进行一次“是”或者“否”的答案回答，并返回布尔数组。

每个链表的长度不小于 2，且每个链表中不包含两个相等的元素。所有链表的长度之和保证不超过10^5

**示例 1**

**输入**

```
[{1,2,3},{2,3,1},{3,2,1}]
```

**输出**

```
[true,true,false]
```

**说明**

第三个链表无论怎么操作都不满足条件。

### My Solution

先把链表转成数组，再判断是否循环有序。通过100%。

```python
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
#
# 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
#
# 
# @param lists ListNode类一维数组 
# @return bool布尔型一维数组
#
class Solution:
    def canSorted(self, lists: List[ListNode]) -> List[bool]:
        ans = [False] * len(lists)
        for i, lst in enumerate(lists):
            arr = []
            while lst:
                arr.append(lst.val)
                lst = lst.next
            if sorted(arr) == arr:
                ans[i] = True
                continue
            if arr[0] < arr[-1]:
                continue
            left, right = 0, len(arr) - 1
            while arr[left] < arr[left + 1]:
                left += 1
            while arr[right] > arr[right - 1]:
                right -= 1
            if left + 1 == right:
                ans[i] = True
        return ans
```

### Correct Solution

```python
# The Same
```



## Q3 小红的连通图

小红拿到了一个有n个节点的无向图，这个图初始并不是连通图。

现在小红想知道，添加恰好一条边使得这个图连通，有多少种不同的加边方案？

**输入描述**

第一行输入两个正整数n, m，用空格隔开。

接下来的![m](https://hr.nowcoder.com/equation?tex=m)行，每行输入两个正整数u,v，代表节点u和节点v之间有一条边连接。

1 <= n, m <= 10^5

1 <= u, v <= n

保证给出的图是不连通的。

**输出描述**

一个整数，代表加边的方案数。

**示例 1**

**输入**

```
4 2
1 2
3 4
```

**输出**

```
4
```

**说明**

添加边 (1,3) 或者 (1,4) 或者 (2,3) 或者 (2,4) 都是可以的。

**示例 2**

**输入**

```
4 1
1 3
```

**输出**

```
0
```

**说明**

无法变成连通图

### My Solution

先判断出有多少个联通分量，以及每个连通分量中各有几个点即可。

使用并查集，通过100%。

```python
from collections import Counter


class UnionFindSet():
    def __init__(self, data_size):
        self.father_dict = {}
        self.size_dict = {}
        for i in range(data_size):
            self.father_dict[i] = i
            self.size_dict[i] = 1

    def find(self, node):
        father = self.father_dict[node]
        if node != father:
            if father != self.father_dict[father]:
                self.size_dict[father] -= 1
            father = self.find(father)
        self.father_dict[node] = father
        return father

    def is_same_set(self, node_a, node_b):
        return self.find(node_a) == self.find(node_b)

    def union(self, a, b):
        if a is None or b is None:
            return
        a_root = self.find(a)
        b_root = self.find(b)
        if a_root != b_root:
            a_set_size = self.size_dict[a_root]
            b_set_size = self.size_dict[b_root]
            if a_set_size >= b_set_size:
                self.father_dict[b_root] = a_root
                self.size_dict[a_root] = a_set_size + b_set_size
            else:
                self.father_dict[a_root] = b_root
                self.size_dict[b_root] = a_set_size + b_set_size


n, m = map(int, input().split())
uf = UnionFindSet(n)
for _ in range(m):
    u, v = map(int, input().split())
    uf.union(u - 1, v - 1)
cnt = Counter()
for i in uf.father_dict.values():
    cnt[i] += 1
if len(cnt) != 2:
    print(0)
else:
    ans = 1
    for count in cnt.values():
        ans *= count  # 最后结果是两个连通分量各自的顶点个数乘积
    print(ans)
```

### Correct Solution

```python
# The Same
```



## Q4 小红的数组分割

小红拿到了一个数组，她准备将数组分割成k段，使得每段内部做**按位异或**后，再全部求和。小红希望最终这个和尽可能大，你能帮帮她吗？ 

**输入描述**

输入包含两行。

第一行两个正整数 n, k , (1<= k <= n <= 400)，分别表示数组的长度和要分的段数。

第二行 n 个整数 a_i (0 <= a_i <= 10^9)，表示数组 a 的元素。

**输出描述**

输出一个正整数，表示最终的最大和。

**示例 1**

输入

```
6 2
1 1 1 2 3 4
```

输出

```
10
```

说明

小红将数组分为了：

[1, 4] 和 [5, 6]这两个区间，得分分别为：![1 \oplus 1 \oplus 1 \oplus 2 = 3](https://hr.nowcoder.com/equation?tex=1%20%5Coplus%201%20%5Coplus%201%20%5Coplus%202%20%3D%203) 和 ![3 \oplus 4 = 7](https://hr.nowcoder.com/equation?tex=3%20%5Coplus%204%20%3D%207)。总得分为 3+7=10。

可以证明不存在比10更优的分割方案。

注：![\oplus](https://hr.nowcoder.com/equation?tex=%5Coplus) 符号表示异或操作。

**示例 2**

输入

```
5 3
1 0 1 1 0
```

输出

```
3
```

**示例 3**

输入

```
3 3
1 1 2
```

输出

```
4
```



### My Solution

直接输出数组总和，通过11.54%。毫无思路。

```python
n, k = map(int, input().split())
a = list(map(int, input().split()))
print(sum(a))
```

### Correct Solution

```python
# TODO
```



## Q5 小红的 tencent 矩阵

小红拿到了一个字符矩阵，她可以从任意一个地方出发，希望走 6 步后恰好形成"tencent"字符串。

小红想知道，共有多少种不同的行走方案？

注：每一步可以选择上、下、左、右中任意一个方向进行行走。不可行走到矩阵外部。

**输入描述**

第一行输入两个正整数n,m，代表矩阵的行数和列数。

接下来的n行，每行输入一个长度为 m 的、仅由小写字母组成的字符串，代表小红拿到的矩阵。

1 <= n,m <= 1000

**输出描述**

一个整数，代表最终合法的方案数。

**示例 1**

输入

```
3 3
ten
nec
ten
```

输出

```
4
```

说明

第一个方案，从左上角出发，右右下左左上。
第二个方案，从左上角出发，右右下左左下。
第三个方案，从左下角出发，右右上左左下。
第四个方案，从左上角出发，右右上左左上。

### My Solution

目前思路是BFS+回溯，没时间做了，被第一题坑死。


### Correct Solution

```python
# TODO
```



