---
title: LeetCode Weekly Contest 336
author: 
date: 2022-10-30 13:31 +0800
categories: [Code, Leetcode Contest]
tags: [sorting]
math: true
mermaid: true
pin: false

---





## [Contest](https://leetcode.cn/contest/weekly-contest-336/)



## 1. [Q1](https://leetcode.cn/problems/count-the-number-of-vowel-strings-in-range/)

### Question(Easy)

You are given a 0-indexed array of string words and two integers left and right.

A string is called a vowel string if it starts with a vowel character and ends with a vowel character where vowel characters are 'a', 'e', 'i', 'o', and 'u'.

Return the number of vowel strings words[i] where i belongs to the inclusive range [left, right].

 

Example 1:

Input: words = ["are","amy","u"], left = 0, right = 2

Output: 2

Explanation: 
- "are" is a vowel string because it starts with 'a' and ends with 'e'.
- "amy" is not a vowel string because it does not end with a vowel.
- "u" is a vowel string because it starts with 'u' and ends with 'u'.
The number of vowel strings in the mentioned range is 2.


Example 2:

Input: words = ["hey","aeo","mu","ooo","artro"], left = 1, right = 4

Output: 3

Explanation: 
- "aeo" is a vowel string because it starts with 'a' and ends with 'o'.
- "mu" is not a vowel string because it does not start with a vowel.
- "ooo" is a vowel string because it starts with 'o' and ends with 'o'.
- "artro" is a vowel string because it starts with 'a' and ends with 'o'.
The number of vowel strings in the mentioned range is 3.


Constraints:

- 1 <= words.length <= 1000
- 1 <= words[i].length <= 10
- words[i] consists of only lowercase English letters.
- 0 <= left <= right < words.length



### My solution during the contest

```python
class Solution:
    def vowelStrings(self, words: List[str], left: int, right: int) -> int:
        vowels = {'a', 'e', 'i', 'o', 'u'}
        cnt = 0
        for i in range(left, right + 1):
            word = words[i]
            if word[0] in vowels and word[-1] in vowels:
                cnt += 1
        return cnt
```



## 2. [Q2](https://leetcode.cn/problems/odd-string-difference/)

### Question(Middle)

You are given an balabla.



### My solution during the contest

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/)

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[] {-1,-1};
    }
}
```



### Improvement

Better.





## 3. [Q3](https://leetcode.cn/problems/odd-string-difference/)

### Question(Middle)

You are given an balabla.



### My solution during the contest:

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/)

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[] {-1,-1};
    }
}
```



### Improvement

Better.





## 4. [Q4](https://leetcode.cn/problems/odd-string-difference/)

### Question(Hard)

You are given an balabla.



### My solution during the contest

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```



### [Better solution](https://leetcode.cn/problems/odd-string-difference/solution/ha-xi-biao-by-endlesscheng-k6f5/)

```python
class Solution:
    def oddString(self, words: List[str]) -> str:
        return ""
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[] {-1,-1};
    }
}
```



### Improvement

Better.

