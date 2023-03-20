---
title: LeetCode Biweekly Contest 100
author: 
date: 2023-03-19 21:20 +0800
categories: [Code, Leetcode Contest]
tags: [sorting, array, binary search]
math: true
mermaid: true
pin: false

---



## [Contest](https://leetcode.cn/contest/biweekly-contest-100/)



## 1. [Distribute Money to Maximum Children](https://leetcode.cn/problems/distribute-money-to-maximum-children/)



You are given an integer money denoting the amount of money (in dollars) that you have and another integer children denoting the number of children that you must distribute the money to.

You have to distribute the money according to the following rules:
    
- All money must be distributed.
- Everyone must receive at least 1 dollar.
- Nobody receives 4 dollars.

Return the maximum number of children who may receive exactly 8 dollars if you distribute the money according to the aforementioned rules. If there is no way to distribute the money, return -1.

Example 1:

Input: money = 20, children = 3
Output: 1
Explanation: 
The maximum number of children with 8 dollars will be 1. One of the ways to distribute the money is:
- 8 dollars to the first child.
- 9 dollars to the second child. 
- 3 dollars to the third child.
It can be proven that no distribution exists such that number of children getting 8 dollars is greater than 1.

Example 2:

Input: money = 16, children = 2
Output: 2
Explanation: Each child can be given 8 dollars.


Constraints:

1 <= money <= 200
2 <= children <= 30

### My solution during the contest

My idea:



1. Return the quantity of children minus 1 if money is greater than 8 times children, because all money must be distributed. We allocate every child 8 dollars except for the last child, who get all of the money left.
2. Return the quantity of children if money is equal to 8 times children. It is just $8 for every child.
3. If money < children, there is one child at least who cannot get any money because everyone must receive at least 1 dollar.
4. If money < children + 7, there is no child who can get $8 because everyone must receive at least 1 dollar.
5. Then for general situations. Allocate 1 dollar for every child firstly. And while money >= 7, allocate  \$7 for a child to make one child getting 8 dollars. 
6. However, if there are 3 dollars left and only one child who is not holding 8 dollars, we have to transfer some dollars from the front children to avoid the last child getting \$4. So  answer has to be reduced by 1.

```python
 class Solution:
    def distMoney(self, money: int, children: int) -> int:
        if money / children > 8:
            return children - 1
        elif money / children == 8:
            return children
        if money < children:
            return -1
        if money < children + 7:
            return 0
        money -= children  # Allocate $1 for every child firstly.
        ans = 0
        while money >= 7:  # Allocate $7 for a child to make one child getting $8.
            ans += 1
            money -= 7
        if money == 3 and children - 1 == ans:
            ans -= 1
        return ans
```



### Better Solution

```python
class Solution:
    def distMoney(self, money: int, children: int) -> int:
        money -= children  # 每人至少 1 美元
        if money < 0: return -1
        ans = min(money // 7, children)  # 初步分配，让尽量多的人分到 8 美元
        money -= ans * 7
        children -= ans
        # children == 0 and money：必须找一个前面分了 8 美元的人，分配完剩余的钱
        # children == 1 and money == 3：不能有人恰好分到 4 美元
        if children == 0 and money or \
           children == 1 and money == 3:
            ans -= 1
        return ans
```



## 2. [Maximize Greatness of an Array](https://leetcode.cn/problems/maximize-greatness-of-an-array/)

You are given a 0-indexed integer array nums. You are allowed to permute nums into a new array perm of your choosing.

We define the greatness of nums be the number of indices 0 <= i < nums.length for which perm[i] > nums[i].

Return the maximum possible greatness you can achieve after permuting nums.

​     

Example 1:

Input: nums = [1,3,5,2,1,3,1]
Output: 4
Explanation: One of the optimal rearrangements is perm = [2,5,1,3,3,1,1].
At indices = 0, 1, 3, and 4, perm[i] > nums[i]. Hence, we return 4.



Example 2:

Input: nums = [1,2,3,4]
Output: 3
Explanation: We can prove the optimal perm is [2,3,4,1].
At indices = 0, 1, and 2, perm[i] > nums[i]. Hence, we return 3.


Constraints:

1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9



### My solution during the contest:

```python

```



### Better solution 1

```python
class Solution:
    def maximizeGreatness(self, nums: List[int]) -> int:
        nums.sort()
        i = 0
        for x in nums:
            if x > nums[i]:
                i += 1
        return i
```

### Better Solution 2

```python
class Solution:
    def maximizeGreatness(self, nums: List[int]) -> int:
        return len(nums) - max(Counter(nums).values())

```





## 3. [Find Score of an Array After Marking All Elements](https://leetcode.cn/problems/find-score-of-an-array-after-marking-all-elements/)

You are given an array nums consisting of positive integers.

Starting with score = 0, apply the following algorithm:

Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
Add the value of the chosen integer to score.
Mark the chosen element and its two adjacent elements if they exist.
Repeat until all the array elements are marked.
Return the score you get after applying the above algorithm.

 

Example 1:

Input: nums = [2,1,3,4,5,2]
Output: 7
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].

- 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].

- 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
  Our score is 1 + 2 + 4 = 7.



Example 2:

Input: nums = [2,3,5,1,3,2]
Output: 5
Explanation: We mark the elements as follows:
- 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].

- 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its right adjacent element: [2,3,5,1,3,2].

- 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
  Our score is 1 + 2 + 2 = 5.

  


Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6



### My solution during the contest:

```python
```



### Better solution

```python
class Solution:
    def findScore(self, nums: List[int]) -> int:
        ans = 0
        vis = [False] * (len(nums) + 2)  # 保证下标不越界
        for i, x in sorted(enumerate(nums, 1), key=lambda p: p[1]):
            if not vis[i]:
                vis[i - 1] = True
                vis[i + 1] = True  # 标记相邻的两个元素
                ans += x
        return ans
```







## 4. [Minimum Time to Repair Cars](https://leetcode.cn/problems/minimum-time-to-repair-cars/)

You are given an integer array ranks representing the ranks of some mechanics. ranksi is the rank of the ith mechanic. A mechanic with a rank r can repair n cars in r * n2 minutes.

You are also given an integer cars representing the total number of cars waiting in the garage to be repaired.

Return the minimum time taken to repair all the cars.

Note: All the mechanics can repair the cars simultaneously.

 

Example 1:

Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation: 
- The first mechanic will repair two cars. The time required is 4 * 2 * 2 = 16 minutes.
- The second mechanic will repair two cars. The time required is 2 * 2 * 2 = 8 minutes.
- The third mechanic will repair two cars. The time required is 3 * 2 * 2 = 12 minutes.
- The fourth mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.





Example 2:

Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation: 
- The first mechanic will repair one car. The time required is 5 * 1 * 1 = 5 minutes.
- The second mechanic will repair four cars. The time required is 1 * 4 * 4 = 16 minutes.
- The third mechanic will repair one car. The time required is 8 * 1 * 1 = 8 minutes.
It can be proved that the cars cannot be repaired in less than 16 minutes.




Constraints:

1 <= ranks.length <= 10^5
1 <= ranks[i] <= 100
1 <= cars <= 10^6



### My solution during the contest

```python
```



### Better solution 1

```python
class Solution:
    def repairCars(self, ranks: List[int], cars: int) -> int:
        s = lambda t: sum(floor(sqrt(t // r)) for r in ranks)
        return bisect_left(range(min(ranks) * cars * cars), cars, key=s)
```

### Better Solution 2

```python
class Solution:
    def repairCars(self, ranks: List[int], cars: int) -> int:
        cnt = Counter(ranks)
        s = lambda t: sum(floor(sqrt(t // r)) * c for r, c in cnt.items())
        return bisect_left(range(min(cnt) * cars * cars), cars, key=s)
```



