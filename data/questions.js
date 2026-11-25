/* 本文件由 tools/xlsx2questions.py 根据 Excel 表格生成，
   请改表格后重新转换，不要直接手改这里的内容。 */
window.QUESTION_BANK = {
  "meta": {
    "title": "C 语言 · 填空练习",
    "version": "1.0"
  },
  "questions": [
    {
      "id": "q001",
      "topic": "分支结构",
      "difficulty": 1,
      "stem": "输入一个整数，判断它的奇偶性，偶数输出 even，奇数输出 odd。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n;\n    scanf(\"%d\", ___1___);\n    if (n ___2___ 2 ___3___ 0)\n        printf(\"even\\n\");\n    else\n        printf(\"odd\\n\");\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&n"
          ]
        },
        {
          "key": "2",
          "answers": [
            "%"
          ]
        },
        {
          "key": "3",
          "answers": [
            "=="
          ]
        }
      ],
      "explain": "判断偶数用 n % 2 == 0。scanf 需要的是变量地址，所以第一个空填 &n。"
    },
    {
      "id": "q002",
      "topic": "分支结构",
      "difficulty": 1,
      "stem": "输入三个整数，按从小到大的顺序输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a, b, c, t;\n    scanf(\"%d%d%d\", &a, &b, &c);\n    if (a > b)\n    {\n        t = a;\n        a = b;\n        b = ___1___;\n    }\n    if (a > c)\n    {\n        t = a;\n        a = c;\n        c = t;\n    }\n    if (___2___ > c)\n    {\n        t = b;\n        b = c;\n        c = t;\n    }\n    printf(\"%d %d %d\\n\", ___3___, b, c);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "t"
          ]
        },
        {
          "key": "2",
          "answers": [
            "b"
          ]
        },
        {
          "key": "3",
          "answers": [
            "a"
          ]
        }
      ],
      "explain": "a、b 交换后，原来的 a 还留在临时变量 t 中，所以 b = t；接着比较 b 与 c；最后按 a、b、c 的顺序输出，此时 a 已经最小。"
    },
    {
      "id": "q003",
      "topic": "循环",
      "difficulty": 1,
      "stem": "求 1 到 100 的累加和并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i, s = 0;\n    for (i = 1; i <= ___1___; i++)\n        s = s + ___2___;\n    printf(\"%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "100"
          ]
        },
        {
          "key": "2",
          "answers": [
            "i"
          ]
        },
        {
          "key": "3",
          "answers": [
            "s"
          ]
        }
      ],
      "explain": "求 1 到 100 的累加和：循环上界是 100，每轮累加当前项 i，最后输出 s。"
    },
    {
      "id": "q004",
      "topic": "循环",
      "difficulty": 1,
      "stem": "输入正整数 n，求 n 的阶乘并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i, n;\n    long f = ___1___;\n    scanf(\"%d\", &n);\n    for (i = ___2___; i <= n; i++)\n        f = ___3___;\n    printf(\"%ld\\n\", f);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "1"
          ]
        },
        {
          "key": "2",
          "answers": [
            "2"
          ]
        },
        {
          "key": "3",
          "answers": [
            "f * i",
            "i * f"
          ]
        }
      ],
      "explain": "求积的初值必须是 1，否则乘出来全是 0；从 2 开始乘可以少做一次无用乘法；每轮执行 f = f * i。"
    },
    {
      "id": "q005",
      "topic": "循环",
      "difficulty": 1,
      "stem": "输出 1 到 100 之间能同时被 3 和 5 整除的所有整数。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i;\n    for (i = 1; i <= ___1___; i++)\n        if (i % 3 == 0 && i % 5 ___2___ 0)\n            printf(\"%d \", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "100"
          ]
        },
        {
          "key": "2",
          "answers": [
            "=="
          ]
        },
        {
          "key": "3",
          "answers": [
            "i"
          ]
        }
      ],
      "explain": "i 从 1 遍历到 100，能同时被 3 和 5 整除即 i % 5 == 0，输出的是 i 本身。"
    },
    {
      "id": "q006",
      "topic": "循环",
      "difficulty": 2,
      "stem": "输入一个整数，用 do-while 循环统计它是几位数。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n, count = ___1___;\n    scanf(\"%d\", &n);\n    do\n    {\n        count++;\n        n = n / 10;\n    } while (n ___2___ 0);\n    printf(\"count=%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "0"
          ]
        },
        {
          "key": "2",
          "answers": [
            ">"
          ]
        },
        {
          "key": "3",
          "answers": [
            "count"
          ]
        }
      ],
      "explain": "统计位数的初值为 0；do-while 在 n 不为 0 时继续（输入 0 时也会得到 1 位）；最后输出 count。"
    },
    {
      "id": "q007",
      "topic": "分支结构",
      "difficulty": 2,
      "stem": "输入 1 到 7 的整数，用 switch 语句输出对应的英文星期名（1 为 Monday，2 为 Tuesday，其他输出 Error）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int day;\n    scanf(\"%d\", ___1___);\n    switch (___2___)\n    {\n    case 1:\n        printf(\"Monday\\n\");\n        ___3___;\n    case 2:\n        printf(\"Tuesday\\n\");\n        break;\n    default:\n        printf(\"Error\\n\");\n    }\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&day"
          ]
        },
        {
          "key": "2",
          "answers": [
            "day"
          ]
        },
        {
          "key": "3",
          "answers": [
            "break"
          ]
        }
      ],
      "explain": "scanf 读整数要传地址 &day；switch 的表达式是 day；case 1 结束后必须 break，否则会继续执行 case 2 的语句。"
    },
    {
      "id": "q008",
      "topic": "字符与 ASCII",
      "difficulty": 2,
      "stem": "输入一个字符，判断它是否为英文字母，是则输出 letter，否则输出 other。",
      "code": "#include <stdio.h>\nint main()\n{\n    char c;\n    scanf(\"%c\", &c);\n    if (c >= ___1___ && c <= 'z' ___2___ c >= 'A' && c <= ___3___)\n        printf(\"letter\\n\");\n    else\n        printf(\"other\\n\");\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "'a'"
          ],
          "caseSensitive": true
        },
        {
          "key": "2",
          "answers": [
            "||"
          ]
        },
        {
          "key": "3",
          "answers": [
            "'Z'"
          ],
          "caseSensitive": true
        }
      ],
      "explain": "小写字母范围是 'a' 到 'z'，大写是 'A' 到 'Z'，两段条件之间用逻辑或 || 连接。"
    },
    {
      "id": "q009",
      "topic": "字符与 ASCII",
      "difficulty": 2,
      "stem": "输入一个小写字母，把它转换成对应的大写字母后输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    char c;\n    scanf(\"%c\", &c);\n    if (c >= 'a' && c <= ___1___)\n        c = c - ___2___;\n    printf(\"%c\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "'z'"
          ],
          "caseSensitive": true
        },
        {
          "key": "2",
          "answers": [
            "32",
            "'a' - 'A'"
          ],
          "caseSensitive": true
        },
        {
          "key": "3",
          "answers": [
            "c"
          ]
        }
      ],
      "explain": "小写字母的上界是 'z'；同一字母的大小写 ASCII 码相差 32，所以减去 32；输出转换后的 c。"
    },
    {
      "id": "q010",
      "topic": "运算符",
      "difficulty": 1,
      "stem": "输入三个整数，用条件运算符（三目运算符）求其中的最大值并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a, b, c, max;\n    scanf(\"%d%d%d\", &a, &b, &c);\n    max = a > b ? ___1___ : b;\n    max = max > c ? max : ___2___;\n    printf(\"max=%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "a"
          ]
        },
        {
          "key": "2",
          "answers": [
            "c"
          ]
        },
        {
          "key": "3",
          "answers": [
            "max"
          ]
        }
      ],
      "explain": "a > b ? a : b 取两者较大值；再与 c 比较；最后输出 max。"
    },
    {
      "id": "q011",
      "topic": "循环",
      "difficulty": 2,
      "stem": "从 1 开始累加，求累加和首次超过 1000 时的项数 n，并输出 n。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n = 0, s = 0;\n    while (s ___1___ 1000)\n    {\n        n++;\n        s = s + ___2___;\n    }\n    printf(\"n=%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "<="
          ]
        },
        {
          "key": "2",
          "answers": [
            "n"
          ]
        },
        {
          "key": "3",
          "answers": [
            "n"
          ]
        }
      ],
      "explain": "累加和不超过 1000 时继续循环，条件是 s <= 1000；每轮加上当前的项数 n；循环结束后输出 n。"
    },
    {
      "id": "q012",
      "topic": "字符与 ASCII",
      "difficulty": 1,
      "stem": "输入一个字符，输出它的 ASCII 码值（十进制）以及它后面的那一个字符。",
      "code": "#include <stdio.h>\nint main()\n{\n    char c;\n    scanf(\"%c\", ___1___);\n    printf(\"ASCII=%d\\n\", ___2___);\n    printf(\"next=%c\\n\", c + ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&c"
          ]
        },
        {
          "key": "2",
          "answers": [
            "c"
          ]
        },
        {
          "key": "3",
          "answers": [
            "1"
          ]
        }
      ],
      "explain": "scanf 读字符要传地址 &c；用 %d 输出 c 就得到 ASCII 码；它后面的字符是 c + 1。"
    },
    {
      "id": "q013",
      "topic": "位运算",
      "difficulty": 3,
      "stem": "输入整数 n 和 k，用移位与按位与运算取出 n 的二进制表示中第 k 位（最低位为第 0 位）并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n, k;\n    scanf(\"%d%d\", &n, ___1___);\n    printf(\"bit=%d\\n\", (n >> ___2___) & ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&k"
          ]
        },
        {
          "key": "2",
          "answers": [
            "k"
          ]
        },
        {
          "key": "3",
          "answers": [
            "1"
          ]
        }
      ],
      "explain": "scanf 需要 &k；把 n 右移 k 位，让第 k 位落到最低位，再与 1 做按位与即可取出这一位。"
    },
    {
      "id": "q014",
      "topic": "位运算",
      "difficulty": 2,
      "stem": "输入一个非负整数 n，用左移运算求 2 的 n 次方并输出（不使用 pow 函数）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n, r;\n    scanf(\"%d\", ___1___);\n    r = ___2___ << n;\n    printf(\"2^%d=%d\\n\", n, ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&n"
          ]
        },
        {
          "key": "2",
          "answers": [
            "1"
          ]
        },
        {
          "key": "3",
          "answers": [
            "r"
          ]
        }
      ],
      "explain": "输入要传 &n；2 的 n 次方等于 1 左移 n 位；最后输出 r。"
    },
    {
      "id": "q015",
      "topic": "宏定义",
      "difficulty": 2,
      "stem": "用带参数的宏 MAX 求两个整数中的较大者，在主函数中输入两个数并输出结果。",
      "code": "#include <stdio.h>\n#define MAX(a, b) ((a) ___1___ (b) ? (a) : (b))\nint main()\n{\n    int x, y;\n    scanf(\"%d%d\", &x, &y);\n    printf(\"%d\\n\", MAX(___2___, ___3___));\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            ">"
          ]
        },
        {
          "key": "2",
          "answers": [
            "x",
            "y"
          ]
        },
        {
          "key": "3",
          "answers": [
            "x",
            "y"
          ]
        }
      ],
      "explain": "宏里比较两个参数用 >；调用时 MAX(x, y)，两个参数顺序可以互换。"
    },
    {
      "id": "q016",
      "topic": "变量与输入输出",
      "difficulty": 1,
      "stem": "输入两个整数，借助中间变量交换它们的值后输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a, b, t;\n    scanf(\"%d%d\", &a, ___1___);\n    t = a;\n    a = b;\n    b = ___2___;\n    printf(\"%d %d\\n\", ___3___, b);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&b"
          ]
        },
        {
          "key": "2",
          "answers": [
            "t"
          ]
        },
        {
          "key": "3",
          "answers": [
            "a"
          ]
        }
      ],
      "explain": "读入第二个数需要 &b；b 最终拿到的是暂存在 t 中的原 a；输出交换后的 a 与 b。"
    },
    {
      "id": "q017",
      "topic": "运算符",
      "difficulty": 1,
      "stem": "输入两个整数，分别求它们的商和余数并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a, b, q, r;\n    scanf(\"%d%d\", &a, &b);\n    q = a ___1___ b;\n    r = a % b;\n    printf(\"商=%d 余=%d\\n\", ___2___, ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "/"
          ]
        },
        {
          "key": "2",
          "answers": [
            "q"
          ]
        },
        {
          "key": "3",
          "answers": [
            "r"
          ]
        }
      ],
      "explain": "整除用 /；按 \"商=%d 余=%d\" 的顺序依次输出 q、r。"
    },
    {
      "id": "q018",
      "topic": "整数除法",
      "difficulty": 2,
      "stem": "输入两个整数，求它们的平均值并保留两位小数输出（注意整数除法的陷阱）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a, b;\n    float avg;\n    scanf(\"%d%d\", &a, ___1___);\n    avg = (a + b) / ___2___;\n    printf(\"%.2f\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&b"
          ]
        },
        {
          "key": "2",
          "answers": [
            "2.0",
            "2.0f",
            "(float)2"
          ]
        },
        {
          "key": "3",
          "answers": [
            "avg"
          ]
        }
      ],
      "explain": "输入第二个数用 &b；关键在于除以 2.0 而不是 2，否则 (a + b) 会先做整数除法；最后输出 avg。"
    },
    {
      "id": "q019",
      "topic": "循环",
      "difficulty": 1,
      "stem": "按从大到小的顺序输出 10 到 1 这十个整数。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i;\n    for (i = ___1___; i ___2___ 1; i--)\n        printf(\"%d \", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "10"
          ]
        },
        {
          "key": "2",
          "answers": [
            ">="
          ]
        },
        {
          "key": "3",
          "answers": [
            "i"
          ]
        }
      ],
      "explain": "i 从 10 开始递减；条件是 i >= 1，否则会漏掉 1；每次输出 i。"
    },
    {
      "id": "q020",
      "topic": "循环",
      "difficulty": 1,
      "stem": "输出 1 到 10 每个整数的平方值。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i;\n    for (i = ___1___; i <= ___2___; i++)\n        printf(\"%d 的平方是 %d\\n\", i, ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "1"
          ]
        },
        {
          "key": "2",
          "answers": [
            "10"
          ]
        },
        {
          "key": "3",
          "answers": [
            "i * i"
          ]
        }
      ],
      "explain": "i 从 1 遍历到 10；输出 i 的平方，写成 i * i。"
    },
    {
      "id": "q021",
      "topic": "宏定义",
      "difficulty": 1,
      "stem": "用符号常量 PI 表示圆周率，输入半径 r，求圆面积并保留两位小数输出。",
      "code": "#include <stdio.h>\n#define PI 3.14159\nint main()\n{\n    float r, area;\n    scanf(\"%f\", ___1___);\n    area = PI * r * ___2___;\n    printf(\"area=%.2f\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "&r"
          ]
        },
        {
          "key": "2",
          "answers": [
            "r"
          ]
        },
        {
          "key": "3",
          "answers": [
            "area"
          ]
        }
      ],
      "explain": "scanf 读 float 要传 &r；圆面积是 PI * r * r；最后输出 area。"
    },
    {
      "id": "q022",
      "topic": "循环",
      "difficulty": 1,
      "stem": "输入正整数 n，求 1 到 n 之间所有能被 7 整除的数之和并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i, n, s = 0;\n    scanf(\"%d\", &n);\n    for (i = 1; i <= n; i++)\n        if (i ___1___ 7 == 0)\n            s = s + ___2___;\n    printf(\"s=%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "%"
          ]
        },
        {
          "key": "2",
          "answers": [
            "i"
          ]
        },
        {
          "key": "3",
          "answers": [
            "s"
          ]
        }
      ],
      "explain": "能被 7 整除即 i % 7 == 0；满足条件时把 i 累加到 s；最后输出 s。"
    },
    {
      "id": "q023",
      "topic": "循环",
      "difficulty": 2,
      "stem": "在 100 到 200 之间查找第一个能被 7 整除的数并输出，找到后立即结束循环。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i;\n    for (i = ___1___; i <= 200; i++)\n        if (i % 7 == ___2___)\n        {\n            printf(\"%d\\n\", i);\n            ___3___;\n        }\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "100"
          ]
        },
        {
          "key": "2",
          "answers": [
            "0"
          ]
        },
        {
          "key": "3",
          "answers": [
            "break"
          ]
        }
      ],
      "explain": "从 100 开始查找；余数为 0 说明能整除；找到后立即用 break 结束循环。"
    },
    {
      "id": "q024",
      "topic": "循环",
      "difficulty": 2,
      "stem": "输出 1 到 20 之间所有不是 3 的倍数的整数（跳过 3 的倍数，用 continue 实现）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i;\n    for (i = 1; i <= 20; i++)\n    {\n        if (i % 3 == ___1___)\n            ___2___;\n        printf(\"%d \", ___3___);\n    }\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "0"
          ]
        },
        {
          "key": "2",
          "answers": [
            "continue"
          ]
        },
        {
          "key": "3",
          "answers": [
            "i"
          ]
        }
      ],
      "explain": "i % 3 == 0 时用 continue 跳过本轮，不执行后面的输出；正常情况输出 i。"
    },
    {
      "id": "q025",
      "topic": "数组",
      "difficulty": 2,
      "stem": "输入 10 个整数，求它们的和与平均值并输出（平均值保留两位小数）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a[10], i, sum = 0;\n    float avg;\n    for (i = 0; i < 10; i++)\n        scanf(\"%d\", &a[i]);\n    for (i = 0; i < 10; i++)\n        sum = sum + ___1___;\n    avg = sum / ___2___;\n    printf(\"sum=%d,avg=%.2f\\n\", ___3___, avg);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "a[i]"
          ]
        },
        {
          "key": "2",
          "answers": [
            "10.0",
            "10.0f",
            "(float)10"
          ]
        },
        {
          "key": "3",
          "answers": [
            "sum"
          ]
        }
      ],
      "explain": "累加数组元素 a[i]；除以 10.0 才能得到浮点平均值；最后输出 sum。"
    },
    {
      "id": "q026",
      "topic": "数组",
      "difficulty": 3,
      "stem": "把数组中 10 个元素整体右移一位，最后一个元素移到最前面，然后输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a[10], i, t;\n    for (i = 0; i < 10; i++)\n        scanf(\"%d\", &a[i]);\n    t = a[___1___];\n    for (i = 9; i > 0; i--)\n        a[i] = a[___2___];\n    a[0] = ___3___;\n    for (i = 0; i < 10; i++)\n        printf(\"%d \", a[i]);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "9"
          ]
        },
        {
          "key": "2",
          "answers": [
            "i - 1"
          ]
        },
        {
          "key": "3",
          "answers": [
            "t"
          ]
        }
      ],
      "explain": "先把最后一个元素 a[9] 存到 t；整体后移时 a[i] 取前一个元素 a[i - 1]；最后把 t 放到 a[0]。"
    },
    {
      "id": "q027",
      "topic": "循环嵌套",
      "difficulty": 3,
      "stem": "求 1!+2!+3!+4!+5! 的值并输出（用双重循环实现）。",
      "code": "#include <stdio.h>\nint main()\n{\n    int i, j;\n    long f = 1, s = 0;\n    for (i = 1; i <= 5; i++)\n    {\n        f = 1;\n        for (j = 1; j <= ___1___; j++)\n            f = f * ___2___;\n        s = s + ___3___;\n    }\n    printf(\"s=%ld\\n\", s);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "i"
          ]
        },
        {
          "key": "2",
          "answers": [
            "j"
          ]
        },
        {
          "key": "3",
          "answers": [
            "f"
          ]
        }
      ],
      "explain": "外层 i 控制求哪个阶乘，内层上界是 i；每轮乘以 j 得到 i!；最后把 f 累加到 s。"
    },
    {
      "id": "q028",
      "topic": "字符串",
      "difficulty": 3,
      "stem": "输入一行英文句子（单词之间用空格分隔），求其中最长的单词长度并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    char s[100];\n    int i, len = 0, max = 0;\n    gets(s);\n    for (i = 0; s[i] != '\\0'; i++)\n    {\n        if (s[i] == ' ')\n        {\n            if (len > max)\n                max = ___1___;\n            len = 0;\n        }\n        else\n            ___2___;\n    }\n    if (len > max)\n        max = len;\n    printf(\"max=%d\\n\", ___3___);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "len"
          ]
        },
        {
          "key": "2",
          "answers": [
            "len++",
            "++len"
          ]
        },
        {
          "key": "3",
          "answers": [
            "max"
          ]
        }
      ],
      "explain": "遇到空格说明一个单词结束，用 len 更新最大值 max；不是空格时当前单词长度加一；最后输出 max。"
    },
    {
      "id": "q029",
      "topic": "数组",
      "difficulty": 2,
      "stem": "输入 10 个整数，分别统计其中正数、负数和零的个数并输出。",
      "code": "#include <stdio.h>\nint main()\n{\n    int a[10], i, p = 0, n = 0, z = 0;\n    for (i = 0; i < 10; i++)\n        scanf(\"%d\", &a[i]);\n    for (i = 0; i < 10; i++)\n    {\n        if (a[i] > 0)\n            p++;\n        else if (a[i] < 0)\n            ___1___;\n        else\n            ___2___;\n    }\n    printf(\"p=%d,n=%d,z=%d\\n\", p, ___3___, z);\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "n++",
            "++n"
          ]
        },
        {
          "key": "2",
          "answers": [
            "z++",
            "++z"
          ]
        },
        {
          "key": "3",
          "answers": [
            "n"
          ]
        }
      ],
      "explain": "负数分支执行 n++，零分支执行 z++；输出时按 p、n、z 的顺序。"
    },
    {
      "id": "q030",
      "topic": "循环",
      "difficulty": 3,
      "stem": "输入一个正整数，判断它是否为完数（一个数等于它所有真因子之和），是则输出 yes，否则输出 no。",
      "code": "#include <stdio.h>\nint main()\n{\n    int n, i, s = ___1___;\n    scanf(\"%d\", &n);\n    for (i = 1; i < n; i++)\n        if (n % i == 0)\n            s = s + ___2___;\n    if (s ___3___ n)\n        printf(\"yes\\n\");\n    else\n        printf(\"no\\n\");\n    return 0;\n}",
      "blanks": [
        {
          "key": "1",
          "answers": [
            "0"
          ]
        },
        {
          "key": "2",
          "answers": [
            "i"
          ]
        },
        {
          "key": "3",
          "answers": [
            "=="
          ]
        }
      ],
      "explain": "真因子之和的初值是 0；把每个因子 i 累加进去；最后判断 s == n 即可（注意输入 1 时结果为 no）。"
    }
  ]
};
