module.exports = {
  // eslint 不再向上寻找配置
  root: true,
  parserOptions: {
    // 代码解析器
    parser: 'babel-eslint',
    // ECMAScript 模块
    sourceType: 'module',
  },
  // 配置代码运行环境
  env: {
    // 浏览器环境中的全局变量
    browser: true,
    // Node.js 全局变量和 Node.js 作用域。
    node: true,
    // 启用除了 modules 以外的所有 ECMAScript 6 特性
    es6: true,
  },
  // 拓展规则配置
  extends: [ 'plugin:vue/recommended', 'eslint:recommended', ],
  /*
    "off" 或 0 - 关闭规则
    "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  */
  rules: {
    // 强制Vue每行属性数量 单行3个 多行1个且多行属性不能与标签在同一行
    'vue/max-attributes-per-line': [ 2, {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }, ],
    // 单行元素的内容之前和之后不要求强制换行
    'vue/singleline-html-element-content-newline': 'off',
    // 多行元素的内容之前和之后不要求强制换行
    'vue/multiline-html-element-content-newline': 'off',
    // 组件名强制使用Pascal命名方式
    'vue/name-property-casing': [ 'error', 'PascalCase', ],
    // 不禁用
    'vue/no-v-html': 'off',
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': [ 2, {
      'before': true,
      'after': true,
    }, ],
    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [ 2, 'always', ],
    // 强制在代码块中使用一致的大括号风格：one true brace style，允许块的开括号和闭括号在同一行
    'brace-style': [ 2, '1tbs', {
      'allowSingleLine': true,
    }, ],
    // 不强制变量名为驼峰风格
    'camelcase': [ 0, {
      'properties': 'always',
    }, ],
    // 强制在array, object加上拖尾逗号
    'comma-dangle': [ 'error', {
      'arrays': 'always',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }, ],
    // 强制逗号后加上空格
    'comma-spacing': [ 2, {
      'before': false,
      'after': true,
    }, ],
    // 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'comma-style': [ 2, 'last', ],
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 2,
    // 代码块允许在单行中省略大括号，其他时候必须加入大括号
    'curly': [ 2, 'multi-line', ],
    // 点号操作符应该和属性在同一行
    'dot-location': [ 2, 'property', ],
    // 要求文件末尾保留一行空行 
    'eol-last': 2,
    // 强制使用=== 和 !==， 不要使用 == 和 !=
    'eqeqeq': [ 'error', 'always', {
      'null': 'ignore',
    }, ],
    // 强制 generator 函数中 * 号前后加上空格
    'generator-star-spacing': [ 2, {
      'before': true,
      'after': true,
    }, ],
    // 强制回调错误处理
    'handle-callback-err': [ 2, '^(err|error)$', ],
    // 强制缩进为两个空格，强制 switch 语句中的 case 子句的缩进为1个空格
    'indent': [ 2, 2, {
      'SwitchCase': 1,
    }, ],
    // 强制所有不包含单引号的 JSX 属性值使用单引号
    'jsx-quotes': [ 2, 'prefer-single', ],
    // 禁止在对象字面量的键和冒号之间存在空格，要求在对象字面量的冒号和值之间存在至少有一个空格
    'key-spacing': [ 2, {
      'beforeColon': false,
      'afterColon': true,
    }, ],
    // 强制关键字周围都加上空格
    'keyword-spacing': [ 2, {
      'before': true,
      'after': true,
    }, ],
    // 要求调用 new 操作符时有首字母大写的函数，允许调用首字母大写的函数时没有 new 操作符
    'new-cap': [ 2, {
      'newIsCap': true,
      'capIsNew': false,
    }, ],
    // 强制调用无参构造函数时有圆括号
    'new-parens': 2,
    // 禁止使用 Array 构造函数
    'no-array-constructor': 2,
    // 禁止使用 arguments.caller 和 arguments.callee
    'no-caller': 2,
    // 可以使用console
    'no-console': 'off',
    // 不允许修改类声明的变量
    'no-class-assign': 2,
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 允许在正则表达式中使用控制字符
    'no-control-regex': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2,
    // 在函数表达式周围禁止不必要的圆括号
    'no-extra-parens': [ 2, 'functions', ],
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 2,
    // 禁止对 function 声明重新赋值
    'no-func-assign': 2,
    // 禁止使用类似 eval() 的方法
    'no-implied-eval': 2,
    // 禁止在嵌套的块中出现function声明
    'no-inner-declarations': [ 2, 'functions', ],
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止不规则的空白
    'no-irregular-whitespace': 2,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁用标签语句
    'no-labels': [ 2, {
      'allowLoop': false,
      'allowSwitch': false,
    }, ],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止出现多行空行
    'no-multiple-empty-lines': [ 2, {
      'max': 1,
    }, ],
    // 禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': 2,
    // 禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 2,
    // 禁用 Object 的构造函数
    'no-new-object': 2,
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 2,
    // 禁止 Symbol 操作符和 new 一起使用
    'no-new-symbol': 2,
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 2,
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 当使用 _dirname 和 _filename 时不允许字符串拼接
    'no-path-concat': 2,
    // 禁用 __proto__ 属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁止在返回语句中赋值，除非使用括号把它们括起来
    'no-return-assign': [ 2, 'except-parens', ],
    // 禁止自我赋值，如 foo = foo
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止将标识符定义为受限的名字, 如：NaN, Infinity
    'no-shadow-restricted-names': 2,
    // 禁止在函数标识符和其调用之间有空格
    'func-call-spacing': [2, "never"],
    // 禁用稀疏数组, 如 [,,]
    'no-sparse-arrays': 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this
    'no-this-before-super': 2,
    // 禁止抛出异常字面量
    'no-throw-literal': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现令人困惑的多行表达式, 如：
    // let x = function() {}
    // `hello`
    'no-unexpected-multiline': 2,
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止可以表达为更简单结构的三元操作符，如： answer === 1 ? true : false 或 x ? x : 1
    'no-unneeded-ternary': [ 2, {
      'defaultAssignment': false,
    }, ],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 2,
    // 禁止出现除函数参数外未使用过的变量
    'no-unused-vars': [ 2, {
      'vars': 'all',
      'args': 'none',
    }, ],
    // 禁止不必要的 .call() 和 .apply()，如：foo.call(null, 1, 2, 3);
    'no-useless-call': 2,
    // 禁止在对象中使用不必要的计算属性，如：var a = { ['x']: 0 };
    'no-useless-computed-key': 2,
    // 禁用不必要的构造函数
    'no-useless-constructor': 2,
    // 允许不必要的转义符
    'no-useless-escape': 0,
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 禁用 with 语句
    'no-with': 2,
    // 强制函数中的变量分开声明
    'one-var': [ 2, {
      'initialized': 'never',
    }, ],
    //  要求把换行符放在操作符后面，?与：除外
    'operator-linebreak': [ 2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }, ],
    // 禁止块语句和类的开始或末尾有空行
    'padded-blocks': [ 2, 'never', ],
    // 要求尽可能地使用单引号
    'quotes': [ 2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }, ],
    // 禁止在语句末尾使用分号
    'semi': [ 2, 'never', ],
    // 强制分号后加上空格
    'semi-spacing': [ 2, {
      'before': false,
      'after': true,
    }, ],
    // 块语句必须总是至少有一个前置空格
    'space-before-blocks': [ 2, 'always', ],
    // 禁止在函数参数的 ( 前面有空格
    'space-before-function-paren': [ 2, 'never', ],
    // 强制圆括号内没有空格
    'space-in-parens': [ 2, 'never', ],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 要求词类（new、delete等）一元操作符后有空格，-、+、--、++、!、!!操作符前后无空格
    'space-unary-ops': [ 2, {
      'words': true,
      'nonwords': false,
    }, ],
    // // 或 /* 注释必须跟随至少一个空白
    'spaced-comment': [ 2, 'always', {
      'markers': [ 'global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',', ],
    }, ],
    // 禁止模板字符串中的嵌入表达式周围有空格
    'template-curly-spacing': [ 2, 'never', ],
    // 要求调用 isNaN()检查 NaN
    'use-isnan': 2,
    // 强制 typeof 表达式与有效的字符串（"undefined"、"object"、"boolean"、"number"、"string"、"function"、"symbol" 和 "bigint"）进行比较
    'valid-typeof': 2,
    // 要求所有的立即执行函数表达式使用括号包裹起来
    'wrap-iife': [ 2, 'any', ],
    // 强制在 yield* 表达式中 * 周围加上空格
    'yield-star-spacing': [ 2, 'both', ],
    // 禁止Yoda条件，Yoda意思参考https://baike.baidu.com/item/%E5%B0%A4%E8%BE%BE%E6%9D%A1%E4%BB%B6%E5%BC%8F
    'yoda': [ 2, 'never', ],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    // 生产环境禁用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 要求大括号括号内有空格，禁止以对象元素开始或结尾的对象的花括号中有空格
    'object-curly-spacing': [ 2, 'always', {
      objectsInObjects: false,
    }, ],
    // 强制数组方括号中使用空格
    'array-bracket-spacing': [ 2, 'always', ],
  },
}
