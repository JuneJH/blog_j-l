# 树

1. 树是图的一种，有向无环图
2. 树形结构有一个根节点，树形结构没有回路，再计算机中树是倒着长的

## 概念
 
   1. 根节点
   2. 叶子节点：下边没有其他节点
   3. 节点： 既不是根节点也不是叶子节点的普通节点
   4. 树的度：这棵树有最多叉的节点有多少个叉，这棵树的度就为多少
   5. 树的深度： 树最深有几层，树的深度就为几，包括根节点

## 二叉树

   **二叉树就是度为2的树**
   1. 根节点        在二叉树中，每个节点都认为自己是根节点
   2. 子节点： 某个节点下面的节点
   3. 父节点：上级节点
   4. 叶子节点
   5. 节点

### 满二叉树

   1. 所有的叶子节点都在最底层
   2. 每个非叶子节点都有两个子节点

## 完全二叉树

**满足国内定义下的完全二叉树不满足国际定义的完全二叉树**

### 国内定义
 
    1. 叶子节点都在最后一层或倒数第二层
    2. 叶子节点都向左聚拢

### 国际定义

    1. 叶子节点都在最后一层或倒数第二层
    2. 如果有叶子节点，就必须有两个叶子节点

```javascript
// 前序遍历 利用递归简直就是洒洒水
function dlr (root){
    if(!root) return;
    console.log(root.value);
    dlr(root.left);
    dlr(root.right);
}

dlr(a) // abdecfg
// 通过栈进行改造 根据栈的特性先进后出
function dlrstack(root){
    const stack = [];
    const result = [];
    root && stack.push(root);
    while(stack.length){
        const node = stack.shift();
        result.push(node.value);
        node.right && stack.unshift(node.right);
        node.left && stack.unshift(node.left);
    }
    return result;
}
console.log(dlrstack(a));

```