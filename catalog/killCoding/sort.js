//冒泡排序
function change (arr,a,b){
    return [arr[a],arr[b]] = [arr[b],arr[a]]
}
function bubbleSort(arr){
    for(let i = 0; i < arr.length; i ++){
        for(let j = 0; j < arr.length - i -1; j ++){
            if(arr[j] > arr[j + 1])change(arr,j,j+1)
        }
    }
}
// 选择排序
function selectSort(arr){
    for(let i = 0; i < arr.length; i ++){
        let minIndex = i;
        for(let j = i; j < arr.length; j ++){
            if(arr[minIndex] > arr[j])minIndex = j;
        }
        change(arr,i,minIndex)
    }
}
// 快排
function quickSort(arr){
    _quickSort(arr,0,arr.length)
    function _quickSort(arr,begin,end){
        if(begin >= end - 1)return;
        let left = begin;
        let right = end;
        do{
            do left ++; while(arr[left] < arr[begin] && left < right);
            do right --; while(arr[right] > arr[begin] && left < right);
            if(left < right)change(arr,left,right);
        }while(left < right);
        const middleIndex = left == right ? right - 1 : right;
        change(arr,middleIndex,begin);
        _quickSort(arr,begin,middleIndex);
        _quickSort(arr,middleIndex + 1,end);
    }
}
// 归并排序
function mergeSort(arr){
    if(arr.length < 2) return arr;
    const middleIndex = Math.floor(arr.length / 2);
    const left = arr.slice(0,middleIndex);
    const right = arr.slice(middleIndex);
    return merge(mergeSort(left),mergeSort(right))
    function merge(left,right){
        const result = [];
        while(left.length && right.length){
            if(left[0] > right[0]){
                result.push(right.shift())
            }else{
                result.push(left.shift())
            }
        }
        while(left.length){
            result.push(left.shift())
        }
        while(right.length){
            result.push(right.shift())
        }
        return result;

    }
}
// 插入排序
function insertSort(arr){
    // 插入排序
    for(let i = 1; i < arr.length; i ++){
        const value = arr[i];
        let j = i - 1;
        while(j >= 0 && arr[j] > value){
            arr[j + 1] = arr[j];
            j --;
        }
        arr[j + 1] = value;
    }
}
const testArr = [3,5,4,2,1,8,9,7,6]
console.log("未排序：",testArr)
insertSort(testArr)
console.log("已排序：",testArr)

// console.log("已排序：",mergeSort(testArr))