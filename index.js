
// 1使用发布订阅模式 实现vue的$on 和 $emit $off的方法
const eventList = [];

const $on = (eventName, callback) => {
    //判断当前事件名称是否存在 如果不存在则创建一个key值为事件名称value为数组 将callabck push到数组中
    if (!eventList[eventName]) {
        eventList[eventName] = [];
    }
    // 如果事件名称存在则直接添加到数组中
    eventList[eventName].push(callback);
};

const $emit = (eventName, params) => {
    // 判断当前事件名称是否存在 存在的话 遍历数组得到所有函数  然后将params当做实参传到函数中
    if (eventList[eventName]) {
        const arr = eventList[eventName];
        arr.map(cb => {
            cb(params);
        });
    }
};

const $off = (eventName, [callback]) => {
    // 判断当前事件是否存在  存在则继续判断第二个参数 存在则找相对应下标 从数组中移除  反之  则将数组清空
    if (eventList[eventName]) {
        if (callback) {
            const index = eventList[eventName].indexOf(callback);
            eventList[eventName].splice(index, 1);
        } else {
            eventList[eventName].length = 0;
        }
    }
};


// 2.实现instanceOf方法   检测类型
function instanceOfFunc(obj, cons) {
    // 排错
    if (typeof cons !== 'function') throw new Error('instance error');
    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) return false;
    // 获取原型对象
    let proto = cons.prototype;
    if (obj.__proto__) {
        if (obj.__proto__ === proto) return true;
        obj = obj.__proto__;
    }
    return false;
}
// console.log(instanceOfFunc(function() {}, Function));

// 3.红绿灯问题，绿灯3秒，红灯2秒，黄灯1秒，每隔一秒打印一条记录 这样循环，
// 要求：可以在控制台可以运行的代码，并且正确输出
// 绿灯 3
// 绿灯 2
// 绿灯 1
// 红灯 2
// 红灯 1
// 黄灯 1
// 绿灯 3
let timer = null;
let tim = null;
let t = null;

function Green() {
    clearInterval(t);
    let num = 3;
    timer = setInterval(() => {
        console.log('绿灯', num--);
    }, 1000);
    setTimeout(Red, 4000);
}
function Red() {
    clearInterval(timer);
    let num = 2;
    tim = setInterval(() => {
        console.log('红灯', num--);
    }, 1000);
    setTimeout(Yellow, 3000);
}
function Yellow() {
    clearInterval(tim);
    let num = 1;
    t = setInterval(() => {
        console.log('黄灯', num);
    }, 1000);
    setTimeout(Green, 1000);
}
// Green();

// 4、请封装一个数组reduce方法;
let arrReducer = [1, 2, 4];
Array.prototype.myReduce = function (cb, initVal) {
    let nextIndex = initVal ? 0 : 1; //判断当前循环的下标
    initVal = initVal ? initVal : this[0]; //初始值
    for (; nextIndex < this.length; nextIndex++) {
        initVal = cb(initVal, this[nextIndex]);
    }
    return initVal;
}
let sum1 = arrReducer.myReduce((prev, next) => {
    return prev + next;
}, 10)
// console.log(sum);

// 5.请使用冒泡和快速两种方式实现数组排序
let array = [1, 12, 3, 24, 5, 3, 45, 2];

let arr2 = array.sort((a, b) => {
    return a - b;
});
// console.log(arr1);

function mySort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var k = 0; k < array.length; k++) {
            if (array[i] > array[k]) {
                var now = array[i];
                now = array[k];
                array[k] = now;
            }
        }
    }
    return array;
}
// console.log(mySort(array));

// 6.封装Storage对象/////////////////////////////////////////////////////////////////////////////////////
// Storage.set('name', 哈哈哈') // 设置 name 字段存储的值为'哈哈哈'。
// Storage.set('age', 2, 30);
// Storage.set('people', ['Oli', 'Aman', 'Dante'],  60)
// Storage.get('name')    // ‘前端一万小时’
// Storage.get('age')     //  如果不超过 30 秒，返回数字类型的 2；如果超过 30 秒，返回 undefined，并且 localStorage 里清除 age 字段。
// Storage.get('people')  // 如果不超过 60 秒，返回数组； 如果超过 60 秒，返回 undefined

const Storage = {
    set: function (key, value) {
        const val = {
            data: value,
        };
        return localStorage.setItem(key, JSON.stringify(val));
    },
    get: function (key) {
        const name = localStorage.getItem(key);
        if (!name) return;
        return JSON.parse(name);
    },
};
// Storage.set('name', '哈哈哈');

// 7、可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五
function ToChineseNum(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let unit = ['', '十', '百', '千', '万'];
    num = parseInt(num);
    let getwan = tem => {
        let str = tem
            .toString()
            .split('')
            .reverse();
        let newnum = '';
        for (var i = 0; i < str.length; i++) {
            let one = i == 0 && str[i] == 0 ? '' : i > 0 && str[i] == 0 && str[i - 1] == 0;
            let two = str[i] == 0 ? unit[0] : unit[i];
            let three = one ? '' : changeNum[str[i]] + two + newnum;
            newnum = three;
            console.log(one, two, three, newnum);
        }
        return newnum;
    };
    let overwan = Math.floor(num / 100000); //万位数
    let nowan = num & 100000; //余数 需要处理
    if (nowan.toString().length < 5) {
        nowan = '0' + nowan;
    }
    return overwan ? getwan(overwan) + '万' + getwan(nowan) : getwan(num);
}
// ToChineseNum(1023);
// 8、接受一个仅包含数字的 多维数组 ，返回一个迭代器，可以遍历得到它拍平以后的结果
// const numbers = flatten2([1, [[2], 3, 4], 5])
// numbers.next().value // => 1
// numbers.next().value // => 2
// numbers.next().value // => 3
// numbers.next().value // => 4
// numbers.next().value // => 5

// 补齐flatten2 这个函数
function flatten2(arr) {
    return arr.reduce((prev, next) => {
        return prev.concat(Array.isArray(next) ? flatten2(next) : next);
    }, []);
}
// console.log(flatten2([1, [[2], 3, 4], 5]));



// 9、复习数组方法 封装实现 数组 map、filter、every 方法
let arr3 = [1, 2, 3, 4];
// map
function myMap(arr3, fn) {
    const newarr = [];
    for (var i = 0; i < arr3.length; i++) {
        return newarr.push(fn(arr3[i], i, arr3));
    }
    return newarr;
}
let ma = myMap(arr3, function (item, index, arr3) {
    return item * 3;
});

function myFilter(arr3, fn) {
    const newarr = [];
    for (var i = 0; i < arr3.length; i++) {
        //筛选出符合条件的 放进新数组
        if (fn(arr3[i], i, arr3)) {
            return newarr.push(arr3[i]);
        }
    }
    return newarr;
}
let fil = myFilter(arr3, function (item, index, arr3) {
    if (item > 3) {
        return item;
    }
});

function myEvery(arr3, fn) {
    //初始为真
    let result = true;
    //判断如果不满足条件 就设为假
    for (var i = 0; i < arr3.length; i++) {
        if (!fn(arr3[i], i, arr3)) {
            result = false;
        }
    }
    return result;
}
let res = myEvery(arr3, function (item, index, arr3) {
    //进行判断
    return typeof item === 'number';
});

// 10、用自己的话描述js垃圾回收机制
// 垃圾回收机制是为了防止内存泄漏 内存泄漏就是当不需要某块内存时它还存在着 而垃圾回收机制就是间歇的不定期的寻找这些不被使用的变量 并释放掉它们指向的内存
//  有两种方式  标记清除和引用计数


// 11、深入理解this执行
function Foo() {
    getName = function () {
        alert(1);
    };
    return this;
}
Foo.getName = function () {
    alert(2);
};
Foo.prototype.getName = function () {
    alert(3);
};
var getName = function () {
    alert(4);
};
function getName() {
    alert(5);
}

// 输出值？ 请写出原因
Foo.getName(); // 2 调用了一个名为Foo.getName的方法
getName(); // 4  函数式声明被覆盖
Foo().getName(); // 1  调用之后 提升为全局变量
getName(); // 1  全局变量被修改
new Foo.getName(); // 2  实例化Foo.getName 调用方法
new Foo().getName(); // 3  实例化Foo 调用了一个原型上的方法
new new Foo().getName(); // 3  实例化Foo().getName 调用了一个原型上的方法

// 12、重绘和回流（重排）的区别和关系 用自己的话描述
/**
 * 重绘：当渲染树中的外观发生改变 不影响布局时 产生重绘
 回流：当渲染树中的元素的规模尺寸、布局、隐藏等发生改变，从而需要重新构建render tree;
js获取Layout属性值也会引起回流。因为浏览器需要通过回流计算最新值
 回流必将引起重绘 而重绘不一定引起回流,比如：只有颜色改变的时候就只会发生重绘而不会引起回流;
当页面布局和几何属性改变时就需要回流
 减少回流
 1.DOM的增删行为
 2.几何属性的变化
 3.元素位置的变化
 4.获取元素的偏移量属性
 5.页面初次渲染
 6.浏览器窗口尺寸改变
 */
// 13.总结http协议 、同源策略、跨域问题
/**
 * http是超文本传输协议 从服务器到浏览器里 这个过程是根据http协议来传输数据的 web内容都是存储在
web服务器上的 服务器都是基于http协议的 所以也称为 HTTP 服务器 存储了各种类型的数据 如果客户端
发出请求的话 服务器就会返回数据给客户端 叫做响应 http服务器和客户端都是万维网的基本单位 http是一个无状态协议
就是对于之前的交互没有记录 每次交互能用的信息就只有这次交互所携带的信息 http方法具有幂等性 一次和多次请求某一
个资源应该具有同样的副作用
同源策略是浏览器的一个安全功能 不同源的客户端脚本在没有明确授权的情况下 不能读写对方资源所以a.com下
的js脚本采用ajax读取b.com里面的文件数据是会报错的
跨域 只要协议 域名 端口号有一个不同就是跨域 跨域问题来源于javascript的同源策略 既只有协议主机号
和端口号相同 则允许相互访问 为了访问某域名下的接口被其他域名下的网页非法调用 是浏览器
对javascript施加的安全限制 就是说jvascript只能访问和操作自己域下的资源 不能访问和操作其他与下的资源
 */

// 14、中间件模式（middleware）是一种很常见、也很强大的模式，被广泛应用在 Express、Koa、Redux 等类库和框架当中。///////////////////////////////////////////////////////////////
// 如果你能在自己的代码中也使用灵活这种模式能给你的程序带来更大的便利性和灵活性。
// 简单来说，中间件就是在调用目标函数之前，你可以随意插入其他函数预先对数据进行处理、过滤，
// 在这个过程里面你可以打印数据、或者停止往下执行中间件等。数据就像水流一样经过中间件的层层的处理、过滤，最终到达目标函数。请你模拟一个中间件模式

// 15、请实现未知宽高的盒子在页面中水平垂直居中
// css3弹性盒子flexbox
// display:table-cell
// transform:translate()

// 16、简述盒模型、怎么修改盒模型
// 盒模型是 W3C组织建议把所有网页上的对象都放在一个盒子（box）中，就是所说的盒子模型，CSS盒模型本质上是一个盒子，封装周围的HTML元素，
// 它包括：实际内容(content) 、填充(padding) 、边框(border) ，边界(margin) 。一个div就是一个盒子。
// 用clip-path：polygon（）属性修改盒模型

// 17、src和href的区别
/**
 * href 表示超文本引用，用在link和a等元素上，href是引用和页面关联，用于建立当前元素和文档之间的链接；
 * 浏览器会识别href引用的文档并行下载该文档，并且不会停止对当前文档的处理
src表示引用资源，src指向的内容会嵌入到文档中当前标签所在的位置，用在img，script，iframe上，src是页面内容不可缺少的一部分。
  当浏览器解析到src引用时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将js脚本放在底部而不是头部的原因
 */

// 18、简述8种position属性值
/**
 *  1 relative 相对定位
不影响元素本身特性（无论区块元素还是内联元素会保留其原本特性）不会使元素脱离文档流（元素原本位置会被保留，即改变位置也不会占用新位置）
没有定位偏移量时对元素无影响（相对于自身原本位置进行偏移）提升层级（用z-index样式的值可以改变一个定位元素的层级关系，从而改变元素的覆盖关系，
值越大越在上面，z - index只能在position属性值为relative或absolute或fixed的元素上有效 两个都为定位元素，后面的会覆盖前面的定位）
2 absolute 绝对定位 使元素完全脱离文档流（在文档流中不再占位）使内联元素在设置宽高的时候支持宽高（改变内联元素的特性）
使区块元素在未设置宽度时由内容撑开宽度（改变区块元素的特性）相对于最近一个有定位的父元素偏移（若其父元素没有定位则逐层上找，直到document——页面文档对象）
相对定位一般配合绝对定位使用（将父元素设置相对定位，使其相对于父元素偏移）提升层级（同相对定位）
3 fixed 固定定位 fixed生成固定定位的元素，相对于浏览器窗口进行定位
4 static 默认值，静态定位 默认布局。元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
5 sticky 粘性定位 粘性定位，该定位基于用户滚动的位置。
6 inherit 规定应该从父元素继承 position 属性的值。
7 initial 设置该属性为默认值 用于设置 CSS 属性为它的默认值。可用于任何 HTML 元素上的任何 CSS 属性。
8 unset 设置position的值为不设置，是 initial 和inherit 的组合:如果该属性是默认继承属性，则该值等同于 inherit 如果该属性是非继承属性，则该值等同于 initial
 */

// 19.简述css hack
/**
 * css hack由于不同厂商的浏览器，比如Internet Explorer, Safari, Mozilla Firefox, Chrome等，或者是同一厂商的浏览器的不同版本，
如IE6和IE7，对CSS的解析认识不完全一样，因此会导致生成的页面效果不一样，得不到我们所需要的页面效果。
这个时候我们就需要针对不同的浏览器去写不同的CSS，让它能够同时兼容不同的浏览器，能在不同的浏览器中也能得到我们想要的页面效果。
CSS hack的目的就是使你的CSS代码兼容不同的浏览器。当然，我们也可以反过来利用CSS hack为不同版本的浏览器定制编写不同的CSS效果
CSS Hack常见的有三种形式
1、属性级Hack：比如IE6能识别下划线“_”和星号“*”，IE7能识别星号“*”，但不能识别下划线”_ ”，而firefox两个都不能认识。
2、选择符级Hack：比如IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}
3、IE条件注释Hack：IE条件注释是微软IE5开始就提供的一种非标准逻辑语句 这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。
4 条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等
 */

// 20、简述px、rem、em 的区别 怎么实现适配 
/**获取设备的dpr：通过window.devicePixelRatio 来查看设备的像素比；
px特点：设备是固定的，那么这个设备的css像素也就固定了大小。我们在布局的时候，（比如：width：200px ；height：200px）这样已经写死了盒子的大小，
我们在通过调试的时候回发现，无论你如何改变屏幕尺寸，该盒子的宽高永远不会变的。在pc端页面可能没有什么问题，但是手机的屏幕尺寸很多，使用px进行页面布局明显就不合适了，
所以在移动端的页面大多采用em布局或者rem布局。
em布局：根据em单位（当前元素的字体）的大小，进行页面布局，可以实现宽高自适应。但是，由于该属性子元素可以继承，如果改变元素的字体大小，该元素的布局也会发生改变！
所以，移动端使用rem布局的最多。
rem布局：根据根rem单位元素的字体大小（就是html的字体大小）进行页面布局，由于该属性不会被继承，所以实现宽高自适应只需要根据屏幕大小的变化动态的改变html的字体大小即可。
 */

// 21、简述webpack模块打包原理
// webpack根据webpack.config.js中的入口文件，在入口文件里识别模块依赖，不管这里的模块依赖是用CommonJS写的，还是ES6 Module规范写的，webpack会自动进行分析，
// 并通过转换、编译代码，打包成最终的文件。最终文件中的模块实现是基于webpack自己实现的webpack_require（es5代码），所以打包后的文件可以在浏览器上运行，同时以上意味着在webapck环境下，
// 你可以只使用ES6 模块语法书写代码，也可以使用CommonJS模块语法，甚至可以两者混合使用。因为从webpack2开始，内置了对ES6、CommonJS、AMD 模块化语句的支持，webpack会对各种模块进行语法分析，并做转换编译。

// 22.简述webpack loader
/**
 * loader是一种打包的方案，webpack默认只识别js结尾的文件，当遇到其他格式的文件后，webpack并不知道如何去处理。
此时，我们可以定义一种规则，告诉webpack当他遇到某种格式的文件后，去求助于相应的loader
 webpack 通过loaders解析require语句引入的文件 loader 的使用方法是在 webpack.config.js 配置 可以串联使用 参数可以通过在 loader 名称后追加
 针对特定文件使用 loader 需要修改代码中的require语句 在require前添加，用来禁用所有在config中配置的 loader
 */

// 23、Webpack一些常用的自定义配置
/**
 * 设置入口entry
 * 配置输出目录output
 * 设置、安装、配置loader，包括解析并抽离css、处理图片、字体等文件；解析jsx;解析vue;解析es6语法
 *
 *
 *
 */

// 24、开发和生产环境的构建配置差异，如何优化webpack构建速度
/**
 * 差异
   生产环境可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
   生产环境需要压缩 HTML/CSS/JS 代码
   生产环境需要压缩图片
   开发环境需要生成 sourcemap 文件
   开发环境需要打印 debug 信息
   开发环境需要 live reload 或者 hot reload 的功能
   优化webpack构建速度;
    1、选择合适的 Devtool 版本
    2、Webpack 和一些 Plugin/Loader 都有 Cache 选项。开启 Cache 选项，有利用提高构建性能。​比如：使用 babel-loader 的时候开启 cacheDirectory 选项，会较为明显的提升构建速度
    3、减少代码体积 使用 CommonsChunksPlugin 提取多个 chunk 之间的通用模块，减少总体的代码体积 把部分依赖转移到 CDN 上，避免在每次编译过程中都由 Webpack 处理 对于支持局部引入的类库，在开发的过程中使用局部引入的方式，避免引入无用的文件
    4、减少目录检索范围 在使用 loader 的时候，通过指定 exclude 和 incude 选项，减少 loader 遍历的目录范围，从而加快 Webpack 编译速度
    5、减少检索路径 resolve.alias 可以配置 webpack 模块解析的别名，对于比较深的解析路径，可以对其配置 alias. 可以提升 webpack 的构建速度
    6、使用 DllPlugin/DllReferencePlugin 进行预先构建

 */
// 25.简述react和vue的区别
/**
 * 1、react严格上只能算是MVC的view层，vue则是MVVM模式
2、虚拟DOM不一样，vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树 而对于react而言，每当应用的状态被改变时，全部组件都会重新渲染，所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制
3、组件写法不一样，react推荐的做法是JSX+inline style,也就是把HTML和CSS全都写进javaScript了
4、数据绑定：vue实现了数据的双向绑定，react数据流动是单向的
5、React 依赖 Virtual DOM,而 Vue.js 使用的是 DOM 模板。React 采用的 Virtual DOM 会 对渲染出来的结果做脏检查；并且Vue.js 在模板中提供了指令，过滤器等，
可以非常方便，快捷地操作 DOM


 */
// 26.简述spa，spa实现原理
/**
 * spa单页面应用是是一种特殊的 Web 应用。它将所有的活动局限于一个Web页面中，仅在该Web页面初始化时加载相应的HTML、JavaScript 和 CSS。一旦页面加载完成了，
SPA不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用 JavaScript 动态的变换HTML的内容，从而实现UI与用户的交互。由于避免了页面的重新加载，SPA 可以提供较为流畅的用户体验。
实现原理
利用ajax请求替代了a标签的默认跳转，然后利用html5中的API修改了url
1  拦截a标签的默认跳转动作。
2. 使用Ajax请求新页面。
3. 将返回的Html替换到页面中。
4. 使用HTML5的History API或者Url的Hash修改Url。
 */
