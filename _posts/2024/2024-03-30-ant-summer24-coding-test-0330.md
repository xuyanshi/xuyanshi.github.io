---
title: "蚂蚁24年春招工程研发笔试-0330（实习）"
author: 
date: 2024-03-30 12:00 +0800
categories: [Code, Interview]
tags: [graph]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 3 月 30 日 10:00 - 11:40，蚂蚁24年春招工程研发笔试。

<img src="image-20240329212240645.png" alt="image-20240329212240645" style="zoom:50%;" />



总限时 100 分钟，共 100 分。



前面是 10 道单选题、5 道不定项选择题。其中有几道是语言相关的，可以自己选做 Java/C++，我这里选的是 Java。

![image-20240330132056356](image-20240330132056356.png)



最后是三道算法题，分值分别为为 10/20/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆 / OCR 可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。*



抛砖引玉，敬请指正。

## 单选题

（部分选项略）
#### Q1
在一个神秘的时间迷宫里，时间旅行者经过些排列成二叉树的时空节点，分别标记为A、B、C、D、E、F、G。他记录了先序遍历路径：ABDECFG，而中序遍历结果为：DBEAFCG。请问，时间旅行者在迷宫中的后序遍历路径是（）。


#### Q2
在 Linux 中有一个名为test 的文件，内容如下：

```
111_18
353_26
124_6
```

则执行下面命令的结果为？

`awk-F " " '{print $1 " " $2}' test | sort -nk2 | tr-s " " "_"`


#### Q3
已知一个有序表（-20， -15，-10， -5, 0, 5, 10, 15,20, 25,30），当二分查找值为-2的元素时，查找失败的比较次数为（）（提示：mid = （low + high）/ 2向下取整）


#### Q4.
某时刻系统资源总数（7.3.5），剩余可用资源为（2,0,2），此时进程PO需要资源为（5,3,2），已分配（1.1.0），进程P1需要资源为（2,1,1），已分配（1.1.0），进程P2需要资源为（6.0.1），已分配（2.0.1），进程P3需要资源（1,1,1），已分配（1,0,1），进程P4需要资源为（3,2,2），已分配（0,1,1），使用银行家算法计算安全序列，其中不发生死锁的是（）。

<img src="image-20240330141922644.png" alt="image-20240330141922644" style="zoom:50%;" />


#### Q5
以下哪个设计模式主要用于分离对象的创建过程，使得相同的创建过程可以创建不同的表示（）

A. 抽象工厂模式 B. 建造者模式 C. 原型模式 D. 单例模式


#### Q6
关于分布式Raft算法说法错误的是（）

- 领导者选举：Raft算法通过领导者选举机制来确保系统中的节点能够达成共识。节点可以处于三种状态之一：领导者（leader）、跟随者（follower）和候选人（candidate）
- 领导者失效处理：如果领导者失效（比如由于故障或网络问题），系统会重新进行领导者选举，以确保系统能够继续正常运行
- 分布式Raft算法旨在解决分布式系统中的一致性问题，确保系统中的不同节点在出现故障或网络分区的情况下仍能达成一致的状态
- 日志复制：一旦选出领导者，它负责接收客户端的请求，并将这些操作作为日志条目复制到其他节点上。一旦某个节点成功复制了这些日志条目，就可以认为操作已经被提交，并旦系统达成了一致状态


#### Q7
VPN 可以通过什么方式维护用户身份的验证和访问控制？

A. 数据包过滤 B. 双因素身份认证 C. IP地址过滤 D. 加密通信


#### Q8
利用数组 stackArr［80］顺序存储两个栈，top1 指向栈1的栈顶，用top1=-1表示栈1空；top2指向栈2的栈顶，用top2=80表示栈2为空。现在对这两个栈依次进行入栈操作，直到stackArr数组已满，此时 top1 + top2=59，求栈1和栈2各有多少元素入栈。

## 不定项选择
#### Q1
在一个旅游规划中，不同景点之间有不同的距离，可以用带权连通无向图G=（V，E）表示旅游路线，其中

<img src="image-20240330152137289.png" alt="image-20240330152137289" style="zoom:50%;" />

（注：顶点偶对括号外的数据表示边上的权值），从源点到顶点y的最短路径上经过的顶点序列是（）


#### Q2
假设有一个表有联合索引a，b，c。那么在SQL查找中，下列哪些组合在where条件下是索引有效？

- a
- a, b
- a, c
- b
- b, c


#### Q3
关于设计模式的说法，哪些正确？

<img src="image-20240330153748817.png" alt="image-20240330153748817" style="zoom:50%;" />


#### Q4
以下哪些资源适合使用强制缓存？

A. 静态图片 B. CSS 文件 C. 动态生成的网页内容 D. API 接口

## 单选题（Java）
#### Q1
下面 Java 代码的运行结果为（）

```java
public static void main (String[] args) {
    List<Integer> list = new ArrayList<>(;
    list.add (1); 
    list.add (2);
    list.add (3);
    List<Integer> subList = new ArrayList<>(list.subList (1, 2));
    subList.clear ();
    System.out.println(list.size());
}
```


#### Q2
下面 Java 代码的运行结果为（）

```java
class SuperClass{
    public int getNum(){
    	return 10;
    }
}

public class SubClass extends SuperClass {
    private long getNum () {
    	return 5;
    }

    public static void main (String[] args){
        SuperClass superClass = new SuperClass ();
        SuperClass subClass = new SubClass ();
        System.out.print(superClass.getNum() +"," + subClass.getNum ());
    }
}
```

> 试着跑了一下，编译失败。
>
> java: getNum() in SubClass cannot override getNum() in SuperClass
>   attempting to assign weaker access privileges; was public



## 不定项选择（Java）

1. 下面关于 Java 中 BIO 和 NIO 的说法正确的是（）

- BIO 是一种同步的I/O模型，而NIO 是一种异步的I/O模型
- 在BI0 中，I/O操作是阻塞的，而在 NIO 中，I/O调用是非阻塞的
- NIO 的非阻塞特性是通过锁来实现的
- BIO 适用于连接数较少且连接时间较长的场景



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

