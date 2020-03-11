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

## 关于二叉树的一些算法

## 遍历，前序的递归写法和非递归写法
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

### 二叉树的广度优先搜索

```javascript
function bfs(roots,target){
    // 判断是否存在节点没有遍历到
    if(roots == null || roots.length == 0) return false;
    //收集子节点
    const nodeList = [];
    // 开始遍历当前层的所有节点
    for(let i = 0; i < roots.length; i ++){
        //找到了，直接返回
        if(roots[i].value == target) return true;
        // 做一个判断子节点是否有值，避免null进入下一次查找中
        roots[i].left && nodeList.push(roots[i].left);
        roots[i].left && nodeList.push(roots[i].right);
    }
    return bfs(nodeList,target)
}

console.log("广度优先搜索",bfs([a],'g'));
```

### 二叉树的深度优先搜索

```javascript
// 深度优先搜索 主要依据前序遍历

function dfs(root,target){
    // 判断是否存在
    if(!root) return false;
    // 比较
    if(root.value == target) return true;
    // 使用或运算符也算节省一点性能。
    return dfs(root.left,target) || dfs(root.right,target)
}
console.log("广度优先搜索",dfs(a,'x'));
```

### 创建一个二叉搜索树

```javascript
// 创建一个二叉树，
function createSerch(root,value){
    // 如果root为空，创建一个根节点
    if(root == null){
        root = new Node(value);
    }
    // 调用添加节点
    addNode(root,value);
    return root;
    // 添加节点函数
    function addNode(root,value){
        // 如果节点不存在
        if(!root) return;
        // 如果小于根节点，就添加再左孩子上
        if(root.value > value){
            if(root.left == null){
                const newNode = new Node(value);
                root.left = newNode;
            }else{
                addNode(root.left,value);
            }
        }else{
            if(root.right == null){
                const newNode = new Node(value);
                root.right = newNode;
            }else{
                addNode(root.right,value);
            }
        }
    }
}
```

## 平衡二叉树

```javascript
// 平衡二叉搜索树

// 判断是否为一颗平衡二叉搜索树   根节点的左孩子与右孩子的高度差不能超过1
// 得到二叉树的深度
function getDeep(root){
    if(!root) return 0;
    const leftLen = getDeep(root.left) + 1;
    const rightLen = getDeep(root.right) + 1;
    return Math.max(leftLen,rightLen);
}
function isBalanceTree(root){
    if(!root) return true;
    const isLeft = isBalanceTree(root.left);
    const isRight = isBalanceTree(root.right);
    const leftLen = getDeep(root.left);
    const rightLen = getDeep(root.right);
    if(Math.abs(leftLen - rightLen) > 1){
        return false;
    }else{
        return isLeft && isRight;
    }
}
// 5. changeBalanceTreeByRotate
// 无法解决变化分支不可以是唯一最深支
// 左浅右深 左单旋
// 做单旋步骤
// 1. 找到新根   root.right
// 2. 找到变化分支  新根.left
// 3. 当前旋转节点的右孩子是变化分支 
// 4. 新根的左孩子是旋转节点
// 5. 返回新的根节点
function changeBalanceTreeByRotate(root) {
    if (isBalanceTree(root)) return root;
    if (root.left) {
        root.left = changeBalanceTreeByRotate(root.left);
    }
    if (root.right) {
        root.right = changeBalanceTreeByRotate(root.right);
    }
    const leftLen = getDeep(root.left);
    const rightLen = getDeep(root.right);
    if (Math.abs(leftLen - rightLen) < 2) {
        return root;
    } else {
        if (leftLen > rightLen) {
            const left = getDeep(root.left.left);
            const right = getDeep(root.left.right);
            if (left < right) {
                root.left = leftRotate(root.left)
            }
            const newRoot = rigthRotate(root)
            newRoot.right = changeBalanceTreeByRotate(newRoot.right);
            return changeBalanceTreeByRotate(newRoot)
        } else {
            const left = getDeep(root.right.left);
            const right = getDeep(root.right.right);
            if (left > right) {
                root.right = rigthRotate(root.right)
            }
            const newRoot = leftRotate(root)
            newRoot.left = changeBalanceTreeByRotate(newRoot.left);
            return changeBalanceTreeByRotate(newRoot)
        }
    }
    function rigthRotate(root) {
        const newRoot = root.left;
        const changeTree = newRoot.right;
        root.left = changeTree;
        newRoot.right = root;
        return newRoot;
    }
    function leftRotate(root) {
        const newRoot = root.right;
        const changeTree = newRoot.left;
        root.right = changeTree;
        newRoot.left = root;
        return newRoot;
    }

}
changeBalanceTreeByRotate(root)
console.log(isBalanceTree(root))

```


