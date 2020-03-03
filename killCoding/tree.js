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
console.log(dlrstack(a));