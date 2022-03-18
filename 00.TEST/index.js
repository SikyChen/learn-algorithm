
function timeCounter(cb) {
  const start = new Date().getTime();
  typeof cb === 'function' && cb();
  console.log(`计算结束，用时: ${new Date().getTime() - start}ms`);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 50000);
}

function generateRandomArray() {
  const array = [];
  for (let i = 0; i < 10000; i++) {
    array.push(generateRandomNumber());
  }
  return array;
}

function compareArrays(arr1, arr2) {
  console.log('开始对比...');

  if (arr1.length !== arr2.length) {
    throw new Error('长度都不一样，啥玩意');
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      throw new Error(`错误：第 ${i} 位不一样了`);
    }
  }

  console.log('正确：两个数组一样');
  return true;
}

function sorterTest(sorter, isNewArray = false) {
  if (typeof sorter !== 'function') {
    throw new Error('sorter 不是一个函数');
  }
  let array = generateRandomArray();
  const array1 = array.concat().sort((a, b) => a - b);
  console.log('随机数组生成成功，开始计算...');
  timeCounter(() => {
    if (isNewArray) {
      array = sorter(array);
    } else {
      sorter(array);
    }
  })
  compareArrays(array, array1)
}

module.exports = {
  timeCounter,
  sorterTest,
};