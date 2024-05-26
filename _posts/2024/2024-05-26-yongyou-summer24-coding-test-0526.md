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



## Q1 计算让两个数组相等的所需的最少操作数量 15 pts

给定两个长度都是 n（n>0）的整数数组 nums1 和 nums2，再给定一个整数k。

你可以对数组 nums2 进行以下操作：

- 选择两个下标 i 和 j，满足：0 <= i < n
- nums2［i］ = nums2［i］ + k，且 nums2 [j] = nums2 [j] - k;

如果对于所有整数 i（0 <= i < n），都有 nums1[i] == nums2[i]，那么称 nums1 等于 nums2。

计算使 nums1 等于 nums2 所需的 **最少** 操作数量。

如果没办法让它们相等，直接返回-1。

**输入描述**

- n == nums1.length == nums2.length

- 2 <= n <= 10^5

- 0 <= nums1[i] , nums2[i] <= 10^9

- 1 <= k <= 10^5



**示例 1**

**输入**

```
[1,3,7,1], [4,3,1,4], 3
```

**输出**

```
2
```

**说明**

```
可以通过 2个操作将 nums2変成nums1：
第1个操作：i=2，j=0；操作后得到 nums2 =[1,3,4,4];
第2个操作：i=2，j=3；操作后得到 nums2=[1,3,7,1].
无法用更少操作使两个数组相等
```

**示例 2**

**输入**

```
[3,8,5,2],[2,4,1,6],1
```

**输出**

```
-1
```

**说明**

```
无法使两个数组相等
```



### My Solution

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



## Q2 找到所有感染病毒的人员 15 pts

假设有一种可以在人与人之间进行快速传播的新型病毒（记为 V），如果有人（记为 A）感染了这种病毒，并在某个时刻t和另一个人B接触，那么B也会立刻感染病毒V。

现有如下条件：

1、给定一个正整数n，代表n个人，这些人的编号从0到 n-1；

2、给定一个下标从 0开始的二维数组 meetings，其中 meetings［i］ = ［xi, yi, ti］表示人员xi 和yi在时刻ti有过接触；在 meetings 代表的所有接触发生期间，感染者会一直处于感染状态；

3、同一个人 A 可以在某一时刻同时和多个人接触，且如果 A感染了病毒V，那么和 A接触的所有人都会立刻感染该病毒；即：假设人员 xi和yi 在时刻 ti 有过接触，如果xi感染了病毒V，那么yi 也会感染该病毒，反之亦然；

4、﻿﻿病毒V的感染是瞬间发生的，也就是说，如果人员A 在时刻t感染了病毒，那么A马上就可以把病毒V 传染给接触到的其他人；

5、﻿﻿给定一个整数 firstPerson，代表某个人，且0<firstPerson < n;

6、人员0感染了病毒V，并在时刻0与 firstPerson 有过接触。

在meetings 代表的所有接触都发生之后，请返回感染病毒V的所有感染者的编号列表，井按照从小到大的顺序记录人员编号。

- ﻿﻿2＜=n＜= 100,000
- ﻿﻿1 <= meetings.length <= 100,000
- ﻿﻿meetings[i].length == 3
- ﻿﻿0 <= xi, yi <= n - 1



**示例 1**

**输入**

```
6，［［1,2,5］，［2,3,8］，［1,5,10］］，1
```

**输出**

```
［0,1,2,3,5］
```

**说明**

```
时刻0，人员0与人员1接触，人员1感染病毒；
时刻5，人员1与人员2接触，人员 2感染病毒；
时刻8，人员2与人员3接触，人员3感染病毒；
时刻10，人员1与人员 5接触，人员5感染病毒。
因此，在所有接触发生后，人员0、1、2、3、5都是感染者。
```

**示例 2**

**输入**

```
4, [[3,1,3], [1,2,2], [0,3,3]],3
```

**输出**

```
[0,1,3]
```

**说明**

```
时刻0，人员0与人员 3接触，人员 3感染病毒；
时刻2，人员1与人员 2 都未感染病毒。
时刻3，人员3与人员0和1接触，人员0和1感染病毒。
因此，在所有接触发生后，人员0、1、3都是感染者
```

**示例 3**

**输入**

```
5, [[3,4,2], [1,2,1], [2,3,1]],1
```

**输出**

```
[0,1,2,3,4]
```

**说明**

```
时刻0，人员0与人员1接触，人员1感染病毒；
时刻1，人员1与人员 2接触，人员2感染病毒，
同时，人员2与人员3接触，人员 3感染病毒；请注意：在时刻1，人员 2可以在被感染的同时感染其他人；
时间 2，人员3与人员4接触，人员1感染病毒。
因此，在所有接触发生后，人员0、1、2、3、4都是感染者。
```



### My Solution

按照时间顺序判断，逐个感染。通过100%。

```java
public ArrayList<Integer> findAllPerson(int n, int[][] meetings, int firstPerson) {
    // write code here
    HashSet<Integer> set = new HashSet<>();
    set.add(0);
    set.add(firstPerson);
    Map<Integer, HashSet<Integer>> map = new TreeMap<>();
    for (int[] meeting : meetings) {
        int x = meeting[0], y = meeting[1], t = meeting[2];
        if (!map.containsKey(t)) {
            map.put(t, new HashSet<>());
        }
        map.get(t).add(x);
        map.get(t).add(y);
    }
    // Iterate the map
    for (HashSet<Integer> set1 : map.values()) {
        for (Integer x : set) {
            if (set1.contains(x)) {
                set.addAll(set1);
                break;
            }
        }
    }
    ArrayList<Integer> res = new ArrayList<>(set);
    res.sort(Integer::compareTo);
    return res;
}
```



## Q3 小红的 4 倍数 25 pts

组合题：

- [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)
- [148. 排序链表](https://leetcode.cn/problems/sort-list/)

**示例 1**

**输入**

```

```

**输出**

```

```

**说明**

```

```

**示例 2**

**输入**

```

```

**输出**

```

```

**说明**

```

```

### My Solution

先拆分为小链表，对拆分出来的小链表进行排序

```java
public static class ListNode {
    int val;
    ListNode next = null;

    public ListNode(int val) {
        this.val = val;
    }
	// New function
    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

public ListNode groupSort(ListNode head, int n) {
    // write code here
    if (head == null) {
        return null;
    }
    ListNode dummy = new ListNode(-1);
    dummy.next = head;
    ListNode pre = dummy, end = dummy;
    while (end.next != null) {
        for (int i = 0; i < n && end != null; i++) {
            end = end.next;
        }
        if (end == null) {
            break;
        }
        ListNode start = pre.next;
        ListNode nxt = end.next;
        end.next = null;
        pre.next = this.partSort(start);
        ListNode cur = pre.next;
        while (cur.next != null) {
            cur = cur.next;
        }
        start = cur;
        start.next = nxt;
        pre = start;
        end = pre;
    }
    return dummy.next;
}

public ListNode partSort(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> b.val - a.val);
    while (head != null) {
        pq.offer(head);
        head = head.next;
    }
    ListNode dummy = new ListNode(-1);
    ListNode cur = dummy;
    while (!pq.isEmpty()) {
        cur.next = pq.poll();
        cur = cur.next;
    }
    cur.next = null;
    return dummy.next;
}
```



## Q4 小红的 4 倍数 25 pts

原题：[1751. 最多可以参加的会议数目 II](https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended-ii/)



**示例 1**

**输入**

```

```

**输出**

```

```

**说明**

```

```

**示例 2**

**输入**

```

```

**输出**

```

```

**说明**

```

```

### My Solution

DP+二分

```java
public int maxValue(int[][] interviews, int k) {
    // write code here
    int n = interviews.length;
    Arrays.sort(interviews, Comparator.comparingInt(a -> a[1]));
    int[][] dp = new int[n + 1][k + 1];
    for (int i = 0; i < n; i++) {
        int p = binarySearch(interviews, i, interviews[i][0]);
        for (int j = 1; j <= k; j++) {
            dp[i + 1][j] = Math.max(dp[i][j], dp[p + 1][j - 1] + interviews[i][2]);
        }
    }
    return dp[n][k];
}

private int binarySearch(int[][] interviews, int right, int upper) {
    int left = -1;
    while (left + 1 < right) {
        int mid = (left + right) / 2;
        if (interviews[mid][1] < upper) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return left;
}
```