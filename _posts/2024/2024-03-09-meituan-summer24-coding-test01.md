---
title: 美团2024年春招第一场笔试【技术】
author: 
date: 2024-03-09 14:00 +0800
categories: [Code, Interview]
tags: [presum, array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/202403/
---



> Coming soon: English version of this article in progress



2024年3月9日10:00-12:00，美团春招/暑期实习笔试第一场，共五道算法题。



平台为牛客网，使用ACM模式，即需要自己处理输入输出，语言不限。



*Note: 我的思路及解法较为笨拙，且不敢保证正确性。抛砖引玉，敬请指正。*

![meituan-test01.jpg](meituan-test01.jpg)

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

```
5 2
MTUAN
```

**输出**

```
4
```

**说明**
修改第三个和第五个字符，形成的字符串为 MTTAM，这样共有 4 个 'M' 和 'T'。



### My Solution
通过100%

较为简单，按题意统计M和T的个数即可。

```python
from collections import Counter

a = list(map(int, input().split()))
s = input()
cnt = Counter(s)

print(min(len(s), cnt['M'] + cnt['T'] + a[1]))
```



## Q2

**题目描述**

小美拿到了一个由正整数组成的数组，但其中有一些元素是未知的（用 0 来表示）。现在小美想知道，如果那些未知的元素在区间 [l, r] 范围内随机取值的话，数组所有元素之和的最小值和最大值分别是多少？共有 q 次询问。

**输入描述**

第一行输入两个正整数 n 和 q，代表数组大小和询问次数。

第二行输入 n 个整数 a_i，其中如果输入的 a_i 为 0，那么说明 a_i 是未知的。

接下来的 q 行，每行输入两个正整数 l 和 r，代表一次询问。

**约束条件**

- 1 ≤ n, q ≤ 10^5
- 0 ≤ a_i ≤ 10^9
- 1 ≤ l ≤ r ≤ 10^9

**输出描述**

输出 q 行，每行输出两个正整数，代表所有元素之和的最小值和最大值。

**示例 1**

**输入**

```
3 2
1 0 3
1 2
4 4
```

**输出**

```
5 6
8 8
```

**说明**
只有第二个元素是未知的。

第一次询问，数组最小的和是 1+1=3=5，最大的和是 1+2+3=6。

第二次询问，显然数组的元素和必然为 8。

### My Solution
通过100%

写的有点繁琐了，注意要用`long`免得溢出。

```java
import java.util.Scanner;

// 注意类名必须为 Main, 不要有任何 package xxx 信息
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // 注意 hasNext 和 hasNextLine 的区别
        int n = in.nextInt(), q = in.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = in.nextInt();
        }
        long sum = 0;
        int zeroCnt = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == 0) {
                ++zeroCnt;
            }
            sum += arr[i];
        }
        for (int i = 0; i < q; i++) { // 注意 while 处理多个 case
            int a = in.nextInt();
            int b = in.nextInt();
            long[] ans = output(arr, sum, zeroCnt, a, b);
            System.out.println(ans[0] + " " + ans[1]);
        }
    }

    private static long[] output(int[] arr, long sum, int zero, int l, int r) {
        return new long[]{sum + (long) zero * l, sum + (long) zero * r};
    }
}
```



## Q3(TODO)

**题目描述**

小美拿到了一个 n×n 的矩阵，其中每个元素是 0 或者 1。小美认为一个矩形区域是完美的，当且仅当该区域内 0 的数量恰好等于 1 的数量。现在，小美希望你回答有多少个 i×i 的完美矩形区域。你需要回答 1 ≤ i ≤ n 的所有答案。

**输入描述**

第一行输入一个正整数 n，代表矩阵大小。

接下来的 n 行，每行输入一个长度为 n 的 01 串，用来表示矩阵。

**约束条件**

- 1 ≤ n ≤ 200

**输出描述**

输出 n 行，第 i 行输出 i×i 的完美矩形区域的数量。

**示例 1**

**输入**

```
4
1010
0101
1100
0011
```

**输出**

```
0
7
0
1
```



### My Solution (X)

通过16.67%。我的错误解法时间复杂度太高，超时。

我的思路先按前缀和的思路，按行统计1的数量。之后遍历边长，然后每个边长下再遍历所有出发点（正方形左上角的点），统计1的个数。时间复杂度`O(n^3)`，过高了。

```python
# 错误解法
n = int(input())
grid = []
for _ in range(n):
    grid.append(input())

# n = 4
# grid = ['1010', '0101', '1100', '0011']

# 按行统计1的数量
preSum = []
for row in grid:
    ps = [0] * (n + 1)
    for i in range(n):
        ps[i + 1] = ps[i] + (1 if row[i] == '1' else 0)
    preSum.append(ps)

for i in range(1, n + 1):  # i 为正方形边长
    ans = 0
    if i % 2 != 0:
        print(ans)
        continue
    for x in range(n - i + 1):
        for y in range(n - i + 1):
            # 起始点为(x,y)
            # (x,y)  ...    (x,y+i-1)
            # ...
            # (x+i-1,y) ... (x+i-1,y+i-1)
            oneCount = 0
            for row in range(x, x + i):
                oneCount += preSum[row][y + i] - preSum[row][y]
            if oneCount * 2 == i * i:
                ans += 1
    print(ans)
```



### Correct Solution (TODO)

```python
# TODO
```



## Q4(TODO)

**题目描述**

小美拿到了一个大小为 n 的数组，她希望删除一个区间后，使得剩余所有元素的乘积末尾至少有 k 个 0。小美想知道，一共有多少种不同的删除方案？

**输入描述**

第一行输入两个正整数 n 和 k。

第二行输入 n 个正整数 a_i，代表小美拿到的数组。

**约束条件**

- 1 ≤ n, k ≤ 10^5
- 1 ≤ a_i ≤ 10^9

**输出描述**

一个整数，代表删除的方案数。

**示例 1**

**输入**

```
5 2
2 5 3 4 20
```

**输出**

```
4
```

**说明**
第一个方案，删除 [3]。

第二个方案，删除 [4]。

第三个方案，删除 [3,4]。

第四个方案，删除 [2]。

### My Solution (X)

通过30%。

我的思路是找出所有以2、5的倍数为结尾的数字，包括2、4、6、8、0、5。

但是这样会遗漏，因为要不断除以2和5直到无法除。末尾0的数量就是求所有数字中2的乘积数量与5的乘积数量的最小值，即：需要计算每个数字的2和5的**因子数量**，再使用累积和、二分查找得出结果。

```python
# 错误解法

# n, k = map(int, input().split())
# arr = list(map(int, input().split()))

n, k = 5, 2
arr = [2, 5, 3, 4, 200]

pre2 = [0] * (n + 1)
pre5 = [0] * (n + 1)
pre0 = [0] * (n + 1)
for i in range(n):
    # 需要考虑末尾多个0
    num = arr[i]
    zero = 0
    while num > 0 and num % 10 == 0:
        zero += 1
        num //= 10
    pre0[i + 1] = pre0[i] + zero
    pre2[i + 1] = pre2[i] + (1 if num % 2 == 0 else 0)
    pre5[i + 1] = pre5[i] + (1 if num % 10 == 5 else 0)

ans = 0
for i in range(n):
    for j in range(i, n):
        # delete [i, j]
        cur0 = pre0[n] - (pre0[j + 1] - pre0[i])
        cur2 = pre2[n] - (pre2[j + 1] - pre2[i])
        cur5 = pre5[n] - (pre5[j + 1] - pre5[i])
        if cur0 + min(cur2, cur5) >= k:
            ans += 1
        else:
            break
print(ans)
```



### Correct Solution (TODO)

根据大佬思路，应为**前缀和+二分/倍增**，具体待补充

```python
# TODO
```



## Q5(TODO)

小美认为，在人际交往中，随着时间的流逝，朋友的关系也会慢慢变淡，最终朋友关系就会淡忘。现在初始有一些朋友关系，存在一些事件会导致两个人淡忘了他们的朋友关系。小美想知道某一时刻中，某两人是否可以通过朋友介绍互相认识。

事件共有 2 种：

1. `1 u v`：代表编号 u 的人和编号 v 的人淡忘了他们的朋友关系。
2. `2 u v`：代表小美查询编号 u 的人和编号 v 的人是否能通过朋友介绍互相认识。

注：介绍可以有多层，比如 2 号把 1 号介绍给 3 号，然后 3 号再把 1 号介绍给 4 号，这样 1 号和 4 号就认识了。

**输入描述**

第一行输入三个正整数 n, m, q，代表总人数，初始的朋友关系数量，发生的事件数量。

接下来的 m 行，每行输入两个正整数 u, v，代表初始编号 u 的人和编号 v 的人是朋友关系。

接下来的 q 行，每行输入三个正整数 op, u, v，含义如题目描述所述。

**约束条件**

- 1 ≤ n ≤ 10^9
- 1 ≤ m, q ≤ 10^5
- 1 ≤ u, v ≤ n
- 1 ≤ op ≤ 2
- 保证至少存在一次查询操作。

**输出描述**

对于每次 2 号操作，输出一行字符串代表查询的答案。如果编号 u 的人和编号 v 的人能通过朋友介绍互相认识，则输出"Yes"。否则输出"No"。

**示例 1**

**输入**

```
5 3 5
1 2
2 3
4 5
1 1 5
2 1 3
2 1 4
1 1 2
2 1 3
```

**输出**

```
Yes
No
No
```

**说明**
第一次事件，1 号和 5 号本来就不是朋友，所以无事发生。

第二次事件是询问，1 号和 3 号可以通过 2 号的介绍认识。

第三次事件是询问，显然 1 号和 4 号无法互相认识。

第四次事件，1 号和 2 号淡忘了。

第五次事件，此时 1 号无法再经过 2 号和 3 号互相认识了。

### My Solution (X)

刚开始想到了并查集，但是后面想了想似乎更复杂，加上时间有限，我就没做这道题。

```python
None
```

### Correct Solution (TODO)



```python
# TODO
```

