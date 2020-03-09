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
    function fn(str,nums,result){ 
        if(nums.length == 0){       // 当无路可选的时候，就放跳出结果
            result.push(str.slice())
            return;
        }
        let temp = nums[nums.length-1]; 
        str.push(temp);    // 选
        fn(str,nums.slice(0,nums.length - 1),result);
        str.pop();          // 不选
        fn(str,nums.slice(0,nums.length - 1),result);
    }
    
    return result;
}


```

## 最小路径leetcode64

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
