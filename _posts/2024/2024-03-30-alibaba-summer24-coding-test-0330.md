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



前面是 8 道单选题、7 道不定项选择题。最后是三道算法题，分值分别为 10/20/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。

## 单项选择

8 题，24 分。

### Q1

下面关于HTTP协议说法错误的是？

- 202状态码表示已经接受请求，并提供了请求网页
- 请求报文里面Host域和HTTP版本相关联
- 302状态码表示重定向
- 请求头的后面的空行必不可少

### Q2

下面代码描述的是哪种设计模式（）

```java
public interface Operation {
	public int doOperation (int numi, int num2);
}

public class OperationAdd implements Operation {
    @Override
    public int doOperation (int num1, int num) {
    	return numi + num2;
    }
}

public class OperationSubtract implements Operation {
    @Override
    public int doOperation (int numl, int num?) {
    	return numl - num2;
    }
}

public class Context {
    private Operation op;
    
    public Context (Operation op) {
	    this.op = op;
    ｝
        
    public int executeOperation (int num1, int num2) {
    	return op.doOperation (num1, num2) ;
    ｝
｝
```

选项：观察者模式、命令模式、访问者模式、策略模式

### Q3

Linux 中，有一个文件log.txt，当前权限为 -rW-r-xF--，想要将权限修改为 551，则下面选项正确的是（）

- chmod u+w,o-r log.txt
- chmod u=rx,o=x log.txt
- chmod a-rx,o+x log.txt
- chmod u-x,o-r,o+w log.txt

### Q4

已知一棵完全二叉树的叶子结点数为127，结点总数为254，问其高度最少为（）

选项：6 7 8 9

### Q5

某IT公司有一基于动态分区存储管理的计算机，其主存容量为90MB（初始为空），采用首次适配（First Fit）算法，分配和释放的顺序为：分配12MB，分配20MB，释放12MB，分配8MB，分配36MB，此时主存中最大空闲分区的大小是（）

选项：16MB，18MB，20MB，22MB

### Q6

<img src="image-20240330210640344.png" alt="image-20240330210640344" style="zoom:67%;" />

### Q7

在MySQL中发现资源的使用效率变得非常低效，下列不会造成该结果的是？

- 资源过度使用
- 资源损坏失灵
- 资源未被正确配置
- 资源重名

### Q8

考虑以下递归算法：

```java
int bar(int n) {
    if (n <= 1)
    	return 1;
    else
    	return bar(n - 1) + bar(n - 2);
｝
```

计算 bar（bar（3））时需要调用 bar 函数的次数是（）

选项： 7，10，15，19

## 不定项选择

7 题，21 分。

### Q1

下面关于适配器模式的说法正确的是

- 适配器模式属于行为型模式，它结合了多个独立接口的功能
- 过多地使用适配器，会让系统非常零乱，不易整体进行把握
- 适配器模式用于将一个类的接口转换成客户端所期望的另一个接口
- 适配器模式只能用于将新的接口适配到旧的系统中，不能用于将旧的接口适配到新的系统中

### Q2

下面有关操作系统的系统调用和库函数说法错误的是

- 系统调用是操作系统的一部分，运行在用户空间中
- 库函数可以运行在内核空间中
- 操作系统不能直接用来编程
- 申请系统资源是系统调用的目的

### Q3

下面哪些是关于UDP协议说法正确的（）

- UDP提供无连接的传输服务
- UDP提供可靠的数据传输
- UDP适用于对延迟要求较高的应用
- UDP提供流量控制和拥塞控制

### Q4

将元素MNO12345DEFGH按顺序压入栈，允许元素进行出栈或停留，但不得连续进行3次出栈操作。可能的出栈序列是（）。

A. MIN20345DEFGHI
B. MO1N2345DEFGHI
C. M12N3045DEFGHI
D. MNO12345DEFGHI

### Q5

<img src="image-20240330211600382.png" alt="image-20240330211600382" style="zoom:50%;" />

### Q6

<img src="image-20240330211723096.png" alt="image-20240330211723096" style="zoom:50%;" />

<img src="image-20240330211743491.png" alt="image-20240330211743491" style="zoom:67%;" />

### Q7

下列选项中，可以构成折半查找中关键字比较序列的是（）

A 2, 16, 6, 9, 10, 12, 14
B 20, 8, 16, 14, 18, 10, 8
C 3, 6, 9, 21, 15, 18, 20
D 30, 25, 2, 15, 10, 5, 1

## 算法题

3题，分别为10/20/25 分，共 55 分。

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

