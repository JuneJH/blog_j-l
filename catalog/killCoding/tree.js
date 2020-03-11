// 1. 构建一个二叉树节点
function Node(value){
    this.value = value;
    this.left = null;
    this.right = null;
}

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');

a.left = b;
a.right = c;

b.left = d;
b.right = e;

c.left = f;
c.right = g;

// 前序遍历
function dlr (root){
    if(!root) return;
    console.log(root.value);
    dlr(root.left);
    dlr(root.right);
}

dlr(a) // abdecfg
// 通过栈进行改造
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
//测试
console.log(dlrstack(a));

// 二叉树的搜索

// 广度优先搜索

function bfs(roots,target){
    if(roots == null || roots.length == 0) return false;
    const nodeList = [];
    for(let i = 0; i < roots.length; i ++){
        if(roots[i].value == target) return true;
        roots[i].left && nodeList.push(roots[i].left);
        roots[i].left && nodeList.push(roots[i].right);
    }
    return bfs(nodeList,target)
}
console.log("广度优先搜索",bfs([a],'g'));

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

// 二叉搜索树

// 构建一颗二叉搜索树
const arr = [];
for(let i = 0; i < 100; i ++){
    let num = Math.floor(Math.random() * 100)
    arr.push(num)
}
const root = new Node(50)
arr.forEach(ele=>{
    createSerch(root,ele)
})
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
// 使用二叉搜索树
function serchTarget(root,target){
    if(!root) return false;
    if(root.value == target) return true;
    if(root.value > target){
        return serchTarget(root.left,target)
    }else{
       return serchTarget(root.right,target)
    }
}
console.log("使用二叉搜索树进行查找值:",serchTarget(root,50))

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
