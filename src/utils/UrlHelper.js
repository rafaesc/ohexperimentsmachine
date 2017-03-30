const QUERY = "s";

module.exports = {
  set: function(idx){
    let parametros = this.params();
    if (parametros.test) {
      if (window.history && window.history.replaceState) {
        if (idx) {
          window.history.replaceState({}, "", "?" + QUERY + "=" + idx)
        } else {
          window.history.replaceState({}, "", "?")
        }
      } else {
          window.location.hash = idx
      }
    }
  },
  params: function () {
    var location = window.location.search + ""
      , contain = {};
    location = location.replace("?", "").split("&");
    for (var idxs in location) {
      var d = location[idxs].split("=");
      contain[d[0]] = d[1]
    }
		if ( contain.t && contain.t.indexOf("%2C") > -1 ) {
			contain.t = decodeURIComponent(contain.t)
		}
    return contain;
  },
  get: function () {
    let parametros = this.params();
    return parametros[QUERY] ? parametros[QUERY] : false;
  }
};
