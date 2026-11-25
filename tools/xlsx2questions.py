# -*- coding: utf-8 -*-
"""
题库转换工具：把 Excel / CSV 表格转换成网站读取的 data/questions.js

用法：
    python tools/xlsx2questions.py 题库.xlsx
    python tools/xlsx2questions.py 题库.xlsx -o data/questions.js
    python tools/xlsx2questions.py --template 题库模板.xlsx

表格列（第一行必须是表头，顺序固定）：
    编号 | 知识点 | 难度 | 题干 | 代码模板 | 答案 | 解析

答案列的写法：
    - 第 1 空、第 2 空……之间用两个分号 ;; 分隔
    - 同一个空有多个可接受写法时，用全角竖线 ｜ 分隔
    - 例：*m;;&a[i]｜a + i
"""

import argparse
import csv
import json
import os
import re
import sys

HEADERS = ['编号', '知识点', '难度', '题干', '代码模板', '答案', '解析']
BLANK_SEP = ';;'
ALT_SEP = '｜'
PLACEHOLDER = re.compile(r'___(\d+)___')


def read_rows(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == '.csv':
        with open(path, 'r', encoding='utf-8-sig', newline='') as f:
            rows = list(csv.reader(f))
    else:
        from openpyxl import load_workbook
        wb = load_workbook(path, data_only=True)
        ws = wb[wb.sheetnames[0]]
        rows = []
        for row in ws.iter_rows(values_only=True):
            rows.append(['' if v is None else str(v) for v in row])

    rows = [r for r in rows if any(str(c).strip() for c in r)]
    if not rows:
        raise SystemExit('表格是空的。')

    header = [str(c).strip() for c in rows[0][:len(HEADERS)]]
    if header != HEADERS:
        raise SystemExit(
            '表头不一致。\n期望：%s\n实际：%s' % (' | '.join(HEADERS), ' | '.join(header))
        )
    return rows[1:]


def parse_row(row, line_no, used_ids):
    row = list(row) + [''] * (len(HEADERS) - len(row))
    qid, topic, diff, stem, code, answer_str, explain = [str(c).strip() for c in row[:7]]

    if not qid:
        raise SystemExit('第 %d 行：编号不能为空。' % line_no)
    if qid in used_ids:
        raise SystemExit('第 %d 行：编号 %s 重复。' % (line_no, qid))
    used_ids.add(qid)
    if not code:
        raise SystemExit('第 %d 行（%s）：代码模板不能为空。' % (line_no, qid))

    placeholders = PLACEHOLDER.findall(code)
    if not placeholders:
        raise SystemExit('第 %d 行（%s）：代码模板里没有 ___1___ 这样的空。' % (line_no, qid))

    groups = [g.strip() for g in answer_str.split(BLANK_SEP)]
    if len(groups) != len(placeholders):
        raise SystemExit(
            '第 %d 行（%s）：有 %d 个空，但答案列分成了 %d 段。'
            % (line_no, qid, len(placeholders), len(groups))
        )

    blanks = []
    for key, group in zip(sorted(placeholders, key=int), groups):
        answers = [a.strip() for a in group.split(ALT_SEP) if a.strip()]
        if not answers:
            raise SystemExit('第 %d 行（%s）：第 %s 空没有答案。' % (line_no, qid, key))
        blank = {'key': key, 'answers': answers}
        # 答案里出现字符常量（如 'a'）时区分大小写，否则 'A' 会被误判为正确
        if any(re.search(r"'[A-Za-z]'", a) for a in answers):
            blank['caseSensitive'] = True
        blanks.append(blank)

    try:
        difficulty = int(float(diff)) if diff else 1
    except ValueError:
        difficulty = 1
    difficulty = min(max(difficulty, 1), 3)

    return {
        'id': qid,
        'topic': topic or '综合',
        'difficulty': difficulty,
        'stem': stem,
        'code': code.replace('\r\n', '\n'),
        'blanks': blanks,
        'explain': explain,
    }


def to_js(questions, title):
    payload = {'meta': {'title': title, 'version': '1.0'}, 'questions': questions}
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    return (
        '/* 本文件由 tools/xlsx2questions.py 根据 Excel 表格生成，\n'
        '   请改表格后重新转换，不要直接手改这里的内容。 */\n'
        'window.QUESTION_BANK = ' + body + ';\n'
    )


def convert(src, out):
    rows = read_rows(src)
    used = set()
    questions = [parse_row(r, i + 2, used) for i, r in enumerate(rows)]
    if not questions:
        raise SystemExit('表格里没有题目。')
    with open(out, 'w', encoding='utf-8', newline='\n') as f:
        f.write(to_js(questions, 'C 语言 · 填空练习'))
    print('已生成 %s，共 %d 道题。' % (out, len(questions)))


def build_template(path):
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
    from openpyxl.utils import get_column_letter

    wb = Workbook()
    ws = wb.active
    ws.title = '题库'

    head_fill = PatternFill('solid', fgColor='2563EB')
    head_font = Font(color='FFFFFF', bold=True, size=11)
    thin = Side(style='thin', color='D6DEEB')
    border = Border(left=thin, right=thin, top=thin, bottom=thin)

    for col, name in enumerate(HEADERS, start=1):
        cell = ws.cell(row=1, column=col, value=name)
        cell.fill = head_fill
        cell.font = head_font
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = border

    samples = [
        [
            'q001', '指针', 1,
            '补全 swap 函数，使其能交换两个整数变量所指向的值。',
            'void swap(int *a, int *b)\n{\n    int t = ___1___;\n    *a = ___2___;\n    *b = t;\n}',
            '*a;;*b',
            '形参 a、b 是指针，要交换的是它们指向的变量，读写都要用解引用 *。',
        ],
        [
            'q002', '指针', 3,
            '用指针找数组中的最大元素，补全比较条件和指针更新。',
            'int *find_max(int *a, int n)\n{\n    int *m = a;\n    for (int i = 1; i < n; i++)\n        if (a[i] > ___1___)\n            m = ___2___;\n    return m;\n}',
            '*m;;&a[i]｜a + i',
            'm 指向当前最大元素，比较时用 *m 取值；发现更大元素后让 m 指向它。',
        ],
    ]

    for r, sample in enumerate(samples, start=2):
        for c, value in enumerate(sample, start=1):
            cell = ws.cell(row=r, column=c, value=value)
            cell.border = border
            cell.alignment = Alignment(
                vertical='top',
                wrap_text=True,
                horizontal='center' if c in (1, 3) else 'left',
            )

    widths = [10, 14, 8, 42, 62, 26, 46]
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[1].height = 24
    for r in range(2, 4):
        ws.row_dimensions[r].height = 96
    ws.freeze_panes = 'A2'

    note = wb.create_sheet('填写说明')
    lines = [
        ('C 语言填空题 题库表格说明', True),
        ('', False),
        ('1. 只改「题库」工作表，每行一道题，第一行表头不要动。', False),
        ('2. 编号：每题唯一，建议 q001、q002 这样递增。', False),
        ('3. 知识点：显示给学生的标签，如 指针、循环、链表、位运算。', False),
        ('4. 难度：填 1、2、3，数字越大越难。', False),
        ('5. 题干：一句话说明这段代码要做什么。', False),
        ('6. 代码模板：用 ___1___、___2___ 标出要填的空，编号从 1 开始。', False),
        ('7. 答案：按空的顺序填写，空与空之间用两个分号 ;; 分隔；', False),
        ('   同一个空有多种正确写法时，用全角竖线 ｜ 分隔。', False),
        ('   例：*m;;&a[i]｜a + i', False),
        ('8. 解析：显示正确答案后给学生的讲解。', False),
        ('9. 判断规则：忽略空格、大小写和结尾的分号，所以 "n - 1" 和 "N-1" 都算对。', False),
        ('10. 填好后把整份表格交给老师，由老师转换成网站题库。', False),
    ]
    for i, (text, is_title) in enumerate(lines, start=1):
        cell = note.cell(row=i, column=1, value=text)
        cell.font = Font(bold=True, size=14, color='1F2937') if is_title else Font(size=11, color='374151')
        cell.alignment = Alignment(vertical='center')
    note.column_dimensions['A'].width = 96

    wb.save(path)
    print('已生成模板 %s' % path)


def main():
    parser = argparse.ArgumentParser(description='Excel/CSV 题库转 questions.js')
    parser.add_argument('source', nargs='?', help='题库表格路径（.xlsx 或 .csv）')
    parser.add_argument('-o', '--out', default='data/questions.js', help='输出文件路径')
    parser.add_argument('--template', metavar='PATH', help='生成空白题库模板并退出')
    args = parser.parse_args()

    if args.template:
        build_template(args.template)
        return
    if not args.source:
        parser.print_help()
        sys.exit(1)

    convert(args.source, args.out)


if __name__ == '__main__':
    main()
