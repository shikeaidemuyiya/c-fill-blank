(function () {
  'use strict';

  var STORE_KEY = 'c-fill-solved-v1';

  var state = {
    questions: [],
    index: 0,
    step: 0,
    solved: new Set(loadSolved())
  };

  var el = {};

  function loadSolved() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSolved() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(Array.from(state.solved)));
    } catch (e) { /* 隐私模式下忽略 */ }
  }

  function cacheEls() {
    el.stage = document.getElementById('stage');
    el.list = document.getElementById('questionList');
    el.progress = document.getElementById('progressText');
    el.title = document.getElementById('siteTitle');
    el.topic = document.getElementById('topicBadge');
    el.diff = document.getElementById('diffBadge');
    el.stem = document.getElementById('qStem');
    el.code = document.getElementById('codeBlock');
    el.feedback = document.getElementById('feedback');
    el.check = document.getElementById('checkBtn');
    el.reset = document.getElementById('resetBtn');
    el.explainBox = document.getElementById('explainBox');
    el.explainText = document.getElementById('explainText');
  }

  function normalize(value, caseSensitive) {
    var t = String(value);
    if (t.normalize) t = t.normalize('NFKC');
    t = t.replace(/\s+/g, '');
    t = t.replace(/[;；]+$/, '');
    if (!caseSensitive) t = t.toLowerCase();
    return t;
  }

  function getBlank(q, key) {
    var list = q.blanks || [];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].key) === String(key)) return list[i];
    }
    return null;
  }

  function blankAnswers(def) {
    if (!def || !def.answers) return [];
    return Array.isArray(def.answers) ? def.answers : [def.answers];
  }

  function isCorrect(value, def) {
    var answers = blankAnswers(def);
    if (answers.length === 0) return false;
    var cs = !!(def && def.caseSensitive);
    var v = normalize(value, cs);
    return answers.some(function (a) {
      return normalize(a, cs) === v;
    });
  }

  /* ---------- 渲染 ---------- */

  function renderList() {
    el.list.innerHTML = '';
    state.questions.forEach(function (q, i) {
      var li = document.createElement('li');
      var solved = state.solved.has(q.id);
      li.className = 'qitem' + (i === state.index ? ' active' : '');
      var sub = (q.stem || '').slice(0, 20);
      li.innerHTML =
        '<span class="num">' + (i + 1) + '</span>' +
        '<span class="qmeta">' +
        '<span class="qtitle">' + escapeHtml(q.topic || '综合') + '</span>' +
        '<span class="qsub">' + escapeHtml(sub) + (sub.length >= 20 ? '…' : '') + '</span>' +
        '</span>' +
        '<span class="dot">' + (solved ? '✓' : '') + '</span>';
      li.addEventListener('click', function () {
        if (i !== state.index) showQuestion(i);
      });
      el.list.appendChild(li);
    });
    updateProgress();
  }

  function updateProgress() {
    var total = state.questions.length;
    var done = state.questions.filter(function (q) {
      return state.solved.has(q.id);
    }).length;
    el.progress.textContent = done + ' / ' + total;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function makeBlank(q, key) {
    var def = getBlank(q, key);
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'blank';
    input.dataset.key = key;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.spellcheck = false;
    input.placeholder = '?';

    var longest = 0;
    blankAnswers(def).forEach(function (a) {
      longest = Math.max(longest, String(a).length);
    });
    input.size = Math.min(Math.max(longest + 2, 6), 20);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!el.check.disabled) doCheck();
      }
    });
    return input;
  }

  function renderCode(q) {
    el.code.innerHTML = '';
    var parts = String(q.code || '').split(/(___\d+___)/);
    parts.forEach(function (part) {
      var m = part.match(/^___(\d+)___$/);
      if (m) {
        el.code.appendChild(makeBlank(q, m[1]));
      } else if (part) {
        el.code.appendChild(document.createTextNode(part));
      }
    });
  }

  function showQuestion(i) {
    state.index = i;
    state.step = 0;

    var q = state.questions[i];
    el.topic.textContent = q.topic || '综合';
    el.diff.textContent = '难度 ' + (q.difficulty || 1);
    el.stem.textContent = q.stem || '';

    renderCode(q);

    el.feedback.hidden = true;
    el.feedback.className = 'feedback';
    el.explainBox.hidden = true;
    el.explainText.textContent = q.explain || '';

    el.check.disabled = false;
    el.check.textContent = '检查答案';
    el.reset.hidden = true;

    renderList();
  }

  /* ---------- 判定 ---------- */

  function evaluate() {
    var q = state.questions[state.index];
    var inputs = el.code.querySelectorAll('input.blank');
    var results = [];
    Array.prototype.forEach.call(inputs, function (input) {
      var def = getBlank(q, input.dataset.key);
      results.push({
        input: input,
        key: input.dataset.key,
        ok: isCorrect(input.value, def)
      });
    });
    return results;
  }

  function showFeedback(type, msg) {
    el.feedback.hidden = false;
    el.feedback.className = 'feedback ' + type;
    el.feedback.textContent = msg;
  }

  function clearMark(input) {
    input.classList.remove('wrong');
    input.classList.remove('ok');
  }

  function lockInputs() {
    Array.prototype.forEach.call(el.code.querySelectorAll('input.blank'), function (input) {
      input.readOnly = true;
      input.classList.add('locked');
    });
  }

  function markSolved(id) {
    state.solved.add(id);
    saveSolved();
    renderList();
  }

  function fillAnswers(q) {
    Array.prototype.forEach.call(el.code.querySelectorAll('input.blank'), function (input) {
      var def = getBlank(q, input.dataset.key);
      var answers = blankAnswers(def);
      clearMark(input);
      input.value = answers.length ? answers[0] : '';
      input.classList.add('ok');
      input.readOnly = true;
      input.classList.add('locked');
    });
  }

  function doCheck() {
    var q = state.questions[state.index];
    var results = evaluate();
    var wrong = results.filter(function (r) { return !r.ok; });

    /* 任何时候改对，都直接通关 */
    if (wrong.length === 0) {
      state.step = 3;
      results.forEach(function (r) {
        clearMark(r.input);
        r.input.classList.add('ok');
      });
      markSolved(q.id);
      lockInputs();
      el.explainBox.hidden = false;
      showFeedback('ok', '全部正确，本题已完成。');
      el.check.disabled = true;
      el.check.textContent = '本题已完成 ✓';
      el.reset.hidden = false;
      return;
    }

    if (state.step === 0) {
      state.step = 1;
      showFeedback('warn', '本题答案不正确，请再检查一遍。');
      el.check.textContent = '错在哪里？';
      return;
    }

    if (state.step === 1) {
      state.step = 2;
      results.forEach(function (r) {
        clearMark(r.input);
        if (!r.ok) r.input.classList.add('wrong');
      });
      var nums = wrong.map(function (r) { return '第 ' + r.key + ' 空'; });
      showFeedback('warn', nums.join('、') + ' 有误，请再想一想。');
      el.check.textContent = '显示正确答案';
      return;
    }

    if (state.step === 2) {
      state.step = 3;
      fillAnswers(q);
      el.explainBox.hidden = false;
      showFeedback('info', '参考答案已填入空格，请对照解析理解。');
      el.check.textContent = '重做本题';
      return;
    }

    resetQuestion();
  }

  function resetQuestion() {
    state.step = 0;

    var q = state.questions[state.index];
    renderCode(q);

    el.feedback.hidden = true;
    el.feedback.className = 'feedback';
    el.explainBox.hidden = true;

    el.check.disabled = false;
    el.check.textContent = '检查答案';
    el.reset.hidden = true;
  }

  /* ---------- 启动 ---------- */

  function init() {
    cacheEls();

    var bank = window.QUESTION_BANK;
    if (!bank || !Array.isArray(bank.questions) || bank.questions.length === 0) {
      el.stage.innerHTML = '<div class="empty">题库为空，请检查 data/questions.js。</div>';
      return;
    }

    state.questions = bank.questions;

    if (bank.meta && bank.meta.title) {
      document.title = bank.meta.title;
      el.title.textContent = bank.meta.title;
    }

    el.check.addEventListener('click', doCheck);
    el.reset.addEventListener('click', resetQuestion);

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !el.check.disabled) {
        e.preventDefault();
        doCheck();
      }
    });

    showQuestion(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
