String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
String.prototype.isJson=function(){var r=true; try{JSON.parse(this);}catch(e){r=false;}return r;};
String.prototype.isUsername=function(){if(/^[a-zA-Z0-9_.]+$/.test(this)){return true;}else{return false;}};
String.prototype.commas=function(){return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");};