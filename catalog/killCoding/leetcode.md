# 记录leetcode

[TOC]

## 全排列 leetcode46 回溯法

* 基于一个套路进行求解，穷举
  
```javascript
    // 回溯法
    function func('已知条件比如多少个元素','目前已选择方案'){
        //判断是否终结选择方案的条件
        if()return;
        // 做选择 通过循环
        for(){
            //选择
            //递归
            //取消选择
        }
    }

```

`
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
`

```javascript
var permute = function(nums) {
    const result = [];
    const len = nums.length;
    func([],nums)
    return result;
    function func(path,nums){
        if(path.length == len){ // 满足一种的结果，保存下来
            result.push(path.slice());
            return
        }
        for(let i = 0; i < len; i ++){
            if(path.includes(nums[i]))continue;//筛选以选入的
            path.push(nums[i]); // 选择当前状态
            func(path,nums)
            path.pop()          // 退回没有选的状态
        }
    }
};
```


## 子集 leetcode78  回溯

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
说明：解集不能包含重复的子集。
示例:
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```javascript

var subsets = function(nums) {
    const result = []; // 保存最后的结果集
    let str = [];       // 当前的结果集
    fn(str,nums.slice(),result)
    // 回溯框架
    function fn(str,nums,result){ 
        if(nums.length == 0){       // 当无路可选的时候，就放跳出结果
            result.push(str.slice())
            return;
        }
        // 这里没有采用循环作为选择元素方案，因为需要通过已知选择方案进行判断出口
        let temp = nums[nums.length-1]; 
        str.push(temp);    // 选
        fn(str,nums.slice(0,nums.length - 1),result);
        str.pop();          // 不选，取消选择
        // 选择是一种方案，不选也是一种方案
        fn(str,nums.slice(0,nums.length - 1),result);
    }
    return result;
}

// 参考
var subsets = function (nums) {
      const result = [];
        let max = 1 << nums.length;
        let i = 0;
        for(let i = 0; i < max; i ++){
            const str = [];
            for(let j = 0; j < nums.length; j ++){
                if(i & (1 << j)){
                   str.push(nums[j]);
                };
            }
            result.push(str);
        }
        return result;

}

```

## 最小路径 leetcode64 动态规划

给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。
示例:
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

```javascript
// 通过动态，将走每一步的结果填写在原数组中
var minPathSum = function (grid) {
   for(let i = 0; i < grid.length; i ++){
       for(let j = 0; j < grid[i].length; j ++){
           if(i == 0 && j == 0) continue;
           else if(i == 0){
               grid[i][j] = grid[i][j] + grid[i][j - 1];
           }else if(j == 0){
               grid[i][j] = grid[i][j] + grid[i - 1][j];

           }else{
               grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j],grid[i][j -1]);
           }
       }
   }
   return grid[grid.length - 1][grid[0].length -1]
};

```

## 最长公共子序列   leetcode 1143 动态规划

`
给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

若这两个字符串没有公共子序列，则返回 0。

 

示例 1:

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。
示例 2:

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3。
示例 3:

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0。
`

```javascript
// 思路，超时，暴力求解
var longestCommonSubsequence = function(text1, text2) {
    return func(text1,text2).length
    function func(text1,text2){
        if(!text1 || !text2) return "";
        if(text1[0] == text2[0]){
            return text1[0] + func(text1.substr(1),text2.substr(1));
        }else{
            let str1 = func(text1,text2.substr(1));
            let str2 = func(text1.substr(1),text2);
            if(str1.length > str2.length){
                return str1;
            }else{
                return str2;
            }
        }
    }
};

// 动态规划

var longestCommonSubsequence = function (text1, text2) {
    let t1Len = text1.length;
    let t2Len = text2.length;
    // 初始化dp table，第一行和第一列为空字符串，即没有公共子序列，赋值为0
    const dp = new Array(t1Len + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(t2Len + 1)
        dp[i][0] = 0;
    }
    dp[0].fill(0)
    // 填充dp
     for(let i = 1; i <= t1Len; i ++){
         for(let j = 1; j <= t2Len; j ++){
             // 因为第一列第一行是空字符，而且作为基础值，对比字符串从第零位开始
             if(text1[i - 1] == text2[j - 1]){// 找到第一个公共子序列
                 dp[i][j] = 1 + dp[i - 1][j - 1]
             }else{
                 dp[i][j] = Math.max(dp[i - 1][j],dp[i][j - 1])// 没有找到第一个
             }
         }
     }

    return dp[t1Len][t2Len]
};

```


## 分糖果 leetcode 135  类似贪心，按照顺序满足一个方向，再反向检查，选取最大的值

`老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻的孩子中，评分高的孩子必须获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？

示例 1:

输入: [1,0,2]
输出: 5
解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2:

输入: [1,2,2]
输出: 4
解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
`

```javascript
   
        var candy = function(ratings) {
            // 记录左->右分发糖果数
            const left = new Array(ratings.length);
            // 记录右->左分发糖果数
            const right = new Array(ratings.length);
            // 左->右的第一个人，右->左最后一个人，此时赋值只满足左->右
            left[0] = 1;
            // 同上
            right[ratings.length - 1] = 1;
            // 开始分发，按照规则
            for(let i = 1; i < ratings.length; i ++){
                // 如果比前面一个人小，就直接分发一颗
                left[i] = 1;
                // 如果比前面大，就比前面大一个，先满足左->右的分糖规则，后续向左在进行检查，因为都是类似贪心，都是选取最小符合的
                if(ratings[i] > ratings[i - 1]){
                    left[i] = left[i-1] + 1;
                }
            }
            // 同左->右
            for(let i = ratings.length - 2; i >= 0; i --){
                right[i] = 1;
                if(ratings[i] > ratings[i + 1]){
                    right[i] = right[i + 1] + 1;
                }
            }
            // 统计一共需要多少个
            let count = 0;
            for(let i = 0; i < left.length; i ++){
                // 取左->右 右->左，最大的那个，小的那个必然会不满足一个方向的分糖规则
                if(left[i] > right[i]){
                    count += left[i];
                }else{
                    count += right[i];
                }
            }
            return count;
        };

        // 时间复杂度 O(n)
```




