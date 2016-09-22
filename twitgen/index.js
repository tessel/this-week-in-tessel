#!/usr/bin/env node

var fs = require('fs');
var marked = require('marked');

if (!process.argv[2]) {
  console.error('Usage: twitgen input.md');
  process.exit(1);
}

var input = fs.readFileSync(process.argv[2], 'utf-8');

var renderer = new marked.Renderer();

/*
code(string code, string language)
blockquote(string quote)
html(string html)
heading(string text, number level)
hr()
list(string body, boolean ordered)
listitem(string text)
paragraph(string text)
table(string header, string body)
tablerow(string content)
tablecell(string content, object flags)
*/

renderer.heading = function (text, level) {
  var fontSize = 18;
  switch (level) {
    case 1: fontSize = 24; break;
    case 2: fontSize = 22; break;
    case 3: fontSize = 20; break;
    default: fontSize = 18; break;
  }

  return '<div style="font-size: ' + fontSize + 'px"><strong>' + text + '</strong></div><br>'
};

renderer.paragraph = function (text, level) {
  if (text.match(/^\s*<img[^<]+?>\s*$/)) {
    return '\n\n---\n\nSPLIT BLOCK HERE. ADD IMAGE MANUALLY: ' + text.replace(/(https[^"]+)/, '$1') + '\n\n---\n\n';
  }
  return '<div>' + text + '</div><br>'
};

var output = marked(input, { renderer: renderer });
output = output.replace(/<\/ul>/g, '</ul><br>');
output = output.replace(/<\/ol>/g, '</ol><br>');

console.log(output);
