(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["players-names.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = (lineno = 0, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [runtime.contextOrFrameLookup(context, frame, "playersCount")]));
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("i", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"field\">\n  <label for=\"player-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\">Игрок ";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += "</label>\n  <input id=\"player-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\" required type=\"text\" name=\"player-";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\" value=\"Игрок ";
output += runtime.suppressValue(t_4 + 1, env.opts.autoescape);
output += "\" />\n</div>\n";
;
}
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"vertical-stack\">\n  <div class=\"winner vertical-stack\">\n    <img\n      src=\"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzV0ODc2c2ptbGRzOGNhZ3JucncxMHJrejZyODc0ajhkZG5vY3hwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Ex3vQtX5VX2YtAQ/giphy.webp\"\n      alt=\"winner\"\n    />\n    <h2>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "winner"), env.opts.autoescape);
output += "</h2>\n  </div>\n  <table>\n    <thead>\n      <tr>\n        <th>Игрок</th>\n        <th>Счет</th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "players");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("playerData", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n      <tr>\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</td>\n        <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"score"), env.opts.autoescape);
output += "</td>\n      </tr>\n      ";
;
}
}
frame = frame.pop();
output += "\n    </tbody>\n  </table>\n</div>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["round-cards.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["roundNumber", "defaultValue"], 
[], 
function (l_roundNumber, l_defaultValue, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("roundNumber", l_roundNumber);
frame.set("defaultValue", l_defaultValue);
var t_2 = "";t_2 += "\n  <select name=\"round-";
t_2 += runtime.suppressValue(l_roundNumber, env.opts.autoescape);
t_2 += "\" id=\"round-";
t_2 += runtime.suppressValue(l_roundNumber, env.opts.autoescape);
t_2 += "\">\n    ";
frame = frame.push();
var t_5 = (lineno = 2, colno = 21, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [1,11]));
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("i", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n      <option value=\"";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "\" ";
if(t_6 == l_defaultValue) {
t_2 += "selected";
;
}
t_2 += ">";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "</option>\n    ";
;
}
}
frame = frame.pop();
t_2 += "\n  </select>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("roundSelector");
context.setVariable("roundSelector", macro_t_1);
output += "\n\n";
frame = frame.push();
var t_9 = (lineno = 8, colno = 27, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [runtime.contextOrFrameLookup(context, frame, "roundsCount")]));
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("roundNumber", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
output += "\n<div class=\"field\">\n  <label for=\"round-";
output += runtime.suppressValue(t_10, env.opts.autoescape);
output += "\">Количество карт в раунде ";
output += runtime.suppressValue(t_10 + 1, env.opts.autoescape);
output += "</label>\n  ";
output += runtime.suppressValue((lineno = 11, colno = 18, runtime.callWrap(macro_t_1, "roundSelector", context, [t_10,(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "initialValue")),t_10)?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "initialValue")),t_10):t_10 + 1)])), env.opts.autoescape);
output += "\n</div>\n";
;
}
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["round.njk"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["roundCards", "selected"], 
[], 
function (l_roundCards, l_selected, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("roundCards", l_roundCards);
frame.set("selected", l_selected);
var t_2 = "";t_2 += "\n<option value=\"\">-</option>\n";
frame = frame.push();
var t_5 = (lineno = 2, colno = 17, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", context, [0,l_roundCards + 1]));
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("i", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n  <option value=\"";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "\" ";
if(t_6 == l_selected) {
t_2 += "selected";
;
}
t_2 += ">";
t_2 += runtime.suppressValue(t_6, env.opts.autoescape);
t_2 += "</option>\n";
;
}
}
frame = frame.pop();
t_2 += " \n";
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("roundCardsOptions");
context.setVariable("roundCardsOptions", macro_t_1);
output += " \n\n";
var macro_t_7 = runtime.makeMacro(
["gameData", "playerData"], 
[], 
function (l_gameData, l_playerData, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("gameData", l_gameData);
frame.set("playerData", l_playerData);
var t_8 = "";t_8 += "\n<tr data-index=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"index"), env.opts.autoescape);
t_8 += "\">\n  <td>";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"name"), env.opts.autoescape);
t_8 += "</td>\n  <td>\n    <select name=\"bet-";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"index"), env.opts.autoescape);
t_8 += "\">\n      ";
t_8 += runtime.suppressValue((lineno = 12, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "roundCardsOptions"), "roundCardsOptions", context, [runtime.memberLookup((l_gameData),"roundCards"),runtime.memberLookup((l_playerData),"bet")])), env.opts.autoescape);
t_8 += "\n    </select>\n  </td>\n  <td>\n    <select name=\"take-";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"index"), env.opts.autoescape);
t_8 += "\">\n      ";
t_8 += runtime.suppressValue((lineno = 17, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "roundCardsOptions"), "roundCardsOptions", context, [runtime.memberLookup((l_gameData),"roundCards"),runtime.memberLookup((l_playerData),"take")])), env.opts.autoescape);
t_8 += "\n    </select>\n  </td>\n  <td>\n    <input\n      type=\"number\"\n      min=\"0\"\n      max=\"999\"\n      value=\"";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"bonuses"), env.opts.autoescape);
t_8 += "\"\n      name=\"bonuses-";
t_8 += runtime.suppressValue(runtime.memberLookup((l_playerData),"index"), env.opts.autoescape);
t_8 += "\"\n    />\n  </td>\n  <td data-result>0</td>\n</tr>\n";
;
frame = callerFrame;
return new runtime.SafeString(t_8);
});
context.addExport("playerRow");
context.setVariable("playerRow", macro_t_7);
output += "\n\n<header>\n  <h1>Раунд ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "roundIndex") + 1, env.opts.autoescape);
output += " <span>(";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "roundCards"), env.opts.autoescape);
output += " карт)</span></h1>\n</header>\n<form id=\"round-form\" class=\"vertical-stack\">\n  <table>\n    <thead>\n      <tr>\n        <th>Игрок</th>\n        <th>Ставка</th>\n        <th>Взятки</th>\n        <th>Бонусы</th>\n        <th>Счет</th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
var t_9;
t_9 = {"roundCards": runtime.contextOrFrameLookup(context, frame, "roundCards"),"roundIndex": runtime.contextOrFrameLookup(context, frame, "roundIndex")};
frame.set("gameData", t_9, true);
if(frame.topLevel) {
context.setVariable("gameData", t_9);
}
if(frame.topLevel) {
context.addExport("gameData", t_9);
}
output += " ";
frame = frame.push();
var t_12 = runtime.contextOrFrameLookup(context, frame, "players");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("playerData", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += " ";
output += runtime.suppressValue((lineno = 49, colno = 29, runtime.callWrap(macro_t_7, "playerRow", context, [runtime.contextOrFrameLookup(context, frame, "gameData"),t_13])), env.opts.autoescape);
output += " ";
;
}
}
frame = frame.pop();
output += "\n    </tbody>\n  </table>\n  ";
if(runtime.contextOrFrameLookup(context, frame, "roundIndex") > 0) {
output += "\n  <button type=\"button\" id=\"previous-round-button\">Предыдущий раунд</button>\n  ";
;
}
output += "\n  ";
if(runtime.contextOrFrameLookup(context, frame, "roundIndex") < runtime.contextOrFrameLookup(context, frame, "rounds") - 1) {
output += "\n  <button type=\"submit\">Следующий раунд</button>\n  ";
;
}
else {
output += "\n  <button type=\"submit\">Завершить игру</button>\n  ";
;
}
output += "\n</form>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

