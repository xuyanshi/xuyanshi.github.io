---
title: LeetCode Weekly Contest 336
author: 
date: 2023-03-12 12:50 +0800
categories: [Code, Leetcode Contest]
tags: [sorting, bit manipulation, hash table]
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



## 2. Q2 (Middle) [6316. Rearrange Array to Maximize Prefix Score](https://leetcode.cn/problems/rearrange-array-to-maximize-prefix-score/)

You are given a 0-indexed integer array nums. You can rearrange the elements of nums to any order (including the given order).

Let prefix be the array containing the prefix sums of nums after rearranging it. In other words, prefix[i] is the sum of the elements from 0 to i in nums after rearranging it. The score of nums is the number of positive integers in the array prefix.

Return the maximum score you can achieve.

 

Example 1:

Input: nums = [2,-1,0,1,-3,3,-3]
Output: 6
Explanation: We can rearrange the array into nums = [2,3,1,-1,-3,0,-3].
prefix = [2,5,6,5,2,2,-1], so the score is 6.
It can be shown that 6 is the maximum score we can obtain.

Example 2:

Input: nums = [-2,-3,0]
Output: 0
Explanation: Any rearrangement of the array will result in a score of 0.


Constraints:

- 1 <= nums.length <= 105
- -106 <= nums[i] <= 106



### My solution during the contest

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        pre_sum = cnt = 0
        for num in nums:
            pre_sum += num
            if pre_sum > 0:
                cnt += 1
            else:
                break
        return cnt
```



### Better solution

```python
class Solution:
    def maxScore(self, nums: List[int]) -> int:
        nums.sort(reverse=True)
        return sum(s > 0 for s in accumulate(nums))
```


