class page {
  updateMeasurePage() {
    this.xMax =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.yMax =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  }

  getXmax() {
    this.updateMeasurePage();
    return this.xMax;
  }

  getYmax() {
    this.updateMeasurePage();
    return this.yMax;
  }
  getScrollPage() {
    return (
      (document.documentElement && document.documentElement.scrollTop) ||
      window.pageYOffset ||
      document.body.scrollTop
    );
  }
  getOffset(element, adjust = 0) {
    return element.offsetTop - (1 / 2) * this.getYmax() - adjust;
  }
  scrollFunction(element, animation_Name, bol_reset, adjust = 0) {
    let e = document.getElementById(element);

    if (this.getScrollPage() > page_.getOffset(e, adjust)) {
      e.style.animationName = animation_Name;
    }
    if (bol_reset === true && this.getScrollPage() < 500) {
      e.style.animationName = "";
    }
  }
  createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name) {
    this.createCookie(name, "", -1);
  }
}

let page_ = new page();

export default page_;
