---
title: "蚂蚁24年春招工程研发笔试-0330（实习）"
author: 
date: 2024-03-30 12:00 +0800
categories: [Code, Interview]
tags: [array]
math: true
mermaid: true
pin: false
img_path: /assets/img/posts/post_images/
---



2024 年 3 月 30 日 10:00 - 11:40，蚂蚁24年春招工程研发笔试。

<img src="image-20240329212240645.png" alt="image-20240329212240645" style="zoom:50%;" />



总限时 100 分钟，共 100 分。



前面是 10 道单选题、5 道多选题，其中有几道是语言相关的，可以自己选做 Java/C++。

![image-20240330132056356](image-20240330132056356.png)

最后是三道算法题，分值分别为为 10/15/25 分。



编程题使用 ACM 模式，即需要自己处理输入输出。语言不限，**不能**用本地IDE（阿里系基本都是）。



*Note: 试题回忆可能有错漏，且我的思路及解法较为笨拙，不敢保证正确性。抛砖引玉，敬请指正。*

## 单选题

（部分选项略）

1. 在一个神秘的时间迷宫里，时间旅行者经过些排列成二叉树的时空节点，分别标记为A、B、C、D、E、F、G。他记录了先序遍历路径：ABDECFG，而中序遍历结果为：DBEAFCG。请问，时间旅行者在迷宫中的后序遍历路径是（）。



2. 在 Linux 中有一个名为test 的文件，内容如下：

```
111_18
353_26
124_6
```

则执行下面命令的结果为（）

`awk-F " " '{print $1 " " $2}' test | sort -nk2 | tr-s " " "_"`



3. 已知一个有序表（-20， -15，-10， -5, 0, 5, 10, 15,20, 25,30），当二分查找值为-2的元素时，查找失败的比较次数为（）（提示：mid = （low + high）/ 2向下取整）

    

4. 某时刻系统资源总数（7.3.5），剩余可用资源为（2,0,2），此时进程PO需要资源为（5,3,2），已分配（1.1.0），进程P1需要资源为（2,1,1），已分配（1.1.0），进程P2需要资源为（6.0.1），已分配（2.0.1），进程P3需要资源（1,1,1），已分配（1,0,1），进程P4需要资源为（3,2,2），已分配（0,1,1），使用银行家算法计算安全序列，其中不发生死锁的是（）。

<img src="image-20240330141922644.png" alt="image-20240330141922644" style="zoom:50%;" />



5. 以下哪个设计模式主要用于分离对象的创建过程，使得相同的创建过程可以创建不同的表示（）

A. 抽象工厂模式 B. 建造者模式 C. 原型模式 D. 单例模式



6. 关于分布式Raft算法说法错误的是（）

- 领导者选举：Raft算法通过领导者选举机制来确保系统中的节点能够达成共识。节点可以处于三种状态之一：领导者（leader）、跟随者（follower）和候选人（candidate）
- 领导者失效处理：如果领导者失效（比如由于故障或网络问题），系统会重新进行领导者选举，以确保系统能够继续正常运行
- 分布式Raft算法旨在解决分布式系统中的一致性问题，确保系统中的不同节点在出现故障或网络分区的情况下仍能达成一致的状态
- 日志复制：一旦选出领导者，它负责接收客户端的请求，并将这些操作作为日志条目复制到其他节点上。一旦某个节点成功复制了这些日志条目，就可以认为操作已经被提交，并旦系统达成了一致状态



7. VPN 可以通过什么方式维护用户身份的验证和访问控制？

A. 数据包过滤 B. 双因素身份认证 C. IP地址过滤 D. 加密通信



8. 利用数组 stackArr［80］顺序存储两个栈，top1 指向栈1的栈顶，用top1=-1表示栈1空；top2指向栈2的栈顶，用top2=80表示栈2为空。现在对这两个栈依次进行入栈操作，直到stackArr数组已满，此时 top1 + top2=59，求栈1和栈2各有多少元素入栈。

## 多选题

在一个旅游规划中，不同景点之间有不同的距离，可以用带权连通无向图G=（V，E）表示旅游路线，其中

<img src="image-20240330152137289.png" alt="image-20240330152137289" style="zoom:50%;" />

（注：顶点偶对括号外的数据表示边上的权值），从源点到顶点y的最短路径上经过的顶点序列是（）

## 单选题（Java）

1. 下面 Java 代码的运行结果为（）

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



2. 下面 Java 代码的运行结果为（）

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

## 多选题（Java）



## 算法题

### Q1 



**输入描述**



**输出描述**





**示例 1**

**输入**

```

```

**输出**

```

```

### My Solution



```python

```

### Correct Solution

```python
# The Same
```

### Q2



**输入描述**



**输出描述**





**示例 1**

**输入**

```

```

**输出**

```

```

### My Solution



```python

```

### Correct Solution

```python
# The Same
```

### Q3  



**输入描述**



**输出描述**





**示例 1**

**输入**

```

```

**输出**

```

```

### My Solution



```python

```

### Correct Solution

```python
# The Same
```

