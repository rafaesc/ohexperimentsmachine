(function(a) {
  function b() {
    for (var b = ["moz", "webkit", "o", "ms"], c = b.length, d = {
      value: function(a) {
        return function() {
          return Date.now() - a
        }
      }(Date.now())
    }; c >= 0; c--)
      if (b[c] + "Now"in a.performance)
        return d.value = function(b) {
          return function() {
            a.performance[b]()
          }
        }(b[c] + "Now"),
          d;
    return "timing"in a.performance && "connectStart"in a.performance.timing && (d.value = function(a) {
      return function() {
        Date.now() - a
      }
    }(a.performance.timing.connectStart)),
      d
  }
  var c, d = {};
  "performance"in a && "now"in a.performance || ("performance"in a || Object.defineProperty(a, "performance", {
    get: function() {
      return d
    }
  }),
    c = b(),
    Object.defineProperty(a.performance, "now", c))
})(window);
