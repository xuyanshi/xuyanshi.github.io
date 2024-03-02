---
title: Sliding Window
author: 
date: 2024-03-02 16:00 +0800
categories: [Code, Algorithm]
tags: [sliding window, array]
math: true
mermaid: true
pin: false

---



> Coming soon: English version of this article in progress



最近在做滑动窗口的题，在这里整理总结一下思路。

## 模板

```python
# 最小滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最小长度。

while j < len(nums):
    # 判断[i, j]是否满足条件
    while 满足条件:
        # 不断更新结果(注意在while内更新！)
        i += 1 #（最大程度的压缩i，使得滑窗尽可能的小）
    j += 1

# 最大滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最大长度。
while j < len(nums):
    # 判断[i, j]是否满足条件
    while 不满足条件:
        i += 1 #（最保守的压缩i，一旦满足条件了就退出压缩i的过程，使得滑窗尽可能的大）
    # 不断更新结果（注意在while外更新！）
    j += 1
```



## [76. Minimum Window Substring](https://leetcode.cn/problems/minimum-window-substring/)

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** *of* `s` *such that every character in* `t` *(**including duplicates**) is included in the window*. If there is no such substring, return *the empty string* `""`.



The testcases will be generated such that the answer is **unique**.

 

**Example 1:**

```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

**Example 2:**

```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

**Example 3:**

```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
```

 

**Constraints:**

- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s` and `t` consist of uppercase and lowercase English letters.

 

**Follow up:** Could you find an algorithm that runs in `O(m + n)` time?



最小滑动窗口，套用上面的模板即可，在`while`里面更新长度

```java
public String minWindow(String s, String t) {
    int m = s.length(), n = t.length();
    if (m < n) {
        return "";
    }
    int minLength = Integer.MAX_VALUE;
    int minLeft = -1, minRight = -1;
    int[] cnt = new int[52]; // AB...Zab...z
    for (char c : t.toCharArray()) {
        ++cnt[alphaToIdx(c)];
    }
    System.out.println(Arrays.toString(cnt));
    int left = 0;
    for (int right = 0; right < m; right++) {
        cnt[alphaToIdx(s.charAt(right))]--;
        while (checkAllContains(cnt)) {
            int curLength = right - left + 1;
            if (curLength < minLength) {
                minLeft = left;
                minRight = right;
                minLength = curLength;
            }

            cnt[alphaToIdx(s.charAt(left))]++;
            ++left;
        }
    }
    return minLength == Integer.MAX_VALUE ? "" : s.substring(minLeft, minRight + 1);
}

// 按 AB...Zab...z 的次序存储
private int alphaToIdx(char c) {
    if (c >= 'a' && c <= 'z') {
        return c - 'a' + 26;
    } else if (c >= 'A' && c <= 'Z') {
        return c - 'A';
    } else {
        throw new IllegalArgumentException("s and t consist of uppercase and lowercase English letters.");
    }
}

// 可以优化，而不是每次都遍历整个 cnt 数组
private boolean checkAllContains(int[] cnt) {
    for (int num : cnt) {
        if (num > 0) {
            return false;
        }
    }
    return true;
}
```



## [904. Fruit Into Baskets](https://leetcode.cn/problems/fruit-into-baskets/)

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the **type** of fruit the `ith` tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

- You only have **two** baskets, and each basket can only hold a **single type** of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick **exactly one fruit** from **every** tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array `fruits`, return *the **maximum** number of fruits you can pick*.

 

**Example 1:**

```
Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick from all 3 trees.
```

**Example 2:**

```
Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick from trees [1,2,2].
If we had started at the first tree, we would only pick from trees [0,1].
```

**Example 3:**

```
Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick from trees [2,3,2,2].
If we had started at the first tree, we would only pick from trees [1,2].
```

 

**Constraints:**

- `1 <= fruits.length <= 10^5`
- `0 <= fruits[i] < fruits.length`



最大滑动窗口，套用上面的模板，在`while`外面更新长度

```java
public int totalFruit(int[] fruits) {
    Map<Integer, Integer> cnt = new HashMap<>();
    int n = fruits.length;
    int left = 0, ans = 0;
    for (int right = 0; right < n; right++) {
        cnt.put(fruits[right], cnt.getOrDefault(fruits[right], 0) + 1);
        while (cnt.size() > 2) {
            cnt.put(fruits[left], cnt.get(fruits[left]) - 1);
            if (cnt.get(fruits[left]) <= 0) {
                cnt.remove(fruits[left]);
            }
            ++left;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}
```

