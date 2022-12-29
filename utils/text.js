exports = module.exports = exports = module.exports = function() {
  var numeral = typeof require !== "undefined" ? require("numeral") : undefined;
  var htmlEntities = typeof require !== "undefined" ? require("html-entities") : undefined;
  var htmlParser = typeof require !== "undefined" ? require("node-html-parser") : undefined;
  var mod = {
    encodeEntities: typeof require !== "undefined" ? htmlEntities.encode : undefined,
    decodeEntities: typeof require !== "undefined" ? htmlEntities.decode : undefined,
    document: function(contents) {
      return htmlParser.parse(contents);
    },
    numeral: function(value) {
      var value = numeral(value);
      if (app.has(value) && app.has(value._value)) return value._value;
    },
    parse: function(element, type) {
      if (!app.has(type)) type = "text";
      if (app.has(element)) {
        var html = element.innerHTML;
        if (type === "text") return mod.strip(html);
        if (type === "number") return mod.numeral(mod.strip(html));
        return html;
      }
      return false;
    },
    strip: function(html, clean) {
      if (!app.has(clean)) clean = true;
      html = html.replace(/<style[^>]*>.*<\/style>/gm, '')
      .replace(/<script[^>]*>.*<\/script>/gm, '')
      .replace(/<[^>]+>/gm, '')
      .replace(/([\r\n]+ +)+/gm, '');
      if (clean) html = mod.clean(html);
      return html;
    },
    clean: function(str, full) {
      if (!app.has(full)) full = false;
      while (str.split("  ").length > 1) str = str.split("  ").join(" ");
      if (full) str = str.split(" ").join("").split(" ").join("").split("\n").join("");
      str = mod.decodeEntities(str);
      return str.trim();
    }
  };
  return mod;
}