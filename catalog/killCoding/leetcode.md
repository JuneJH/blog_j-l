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