import { LocalEnum } from "./typings/enum";
import { parseQuery } from "./utils/index";

class WebSSO {
  /**
   * @param {string[]} site - 站点列表
   */
  constructor(private site: string) {}

  // 获取本地指纹
  private getFingerprint() {
    return localStorage.getItem(LocalEnum.FINGERPRINT);
  }

  // 如果是第一次登录则设置后台返回的指纹
  public setFingerprint(value: string) {
    localStorage.setItem(LocalEnum.FINGERPRINT, value);
  }

  private cleanCount() {
    localStorage.removeItem("count");
    const ssoEl = document.getElementById("__sso__");
    ssoEl && document.removeChild(ssoEl);
  }

  // 单点登录
  async sso() {
    const query = parseQuery();

    const localFingerprint = this.getFingerprint();

    const fingerprint = query.fingerprint || localFingerprint;

    if (this.site === window.location.href && !fingerprint && !query.org) {
      this.cleanCount();
      return;
    }

    // 如果有fingerprint则重新设置本地fingerprint
    if (fingerprint) {
      // 重新设置本地fingerprint
      this.setFingerprint(fingerprint);
      // 如果当前是一个iframe， 并且存在回跳地址则进行跳转
      if (window.parent && query.org) {
        window.parent.location.href = query.org + "?fingerprint=" + fingerprint;

        this.cleanCount();
      }
    } else {
      // 如果本地和url中都没有fingerprint则跳转对应的站点去获取fingerprint

      const iframe = document.createElement("iframe");

      iframe.style.display = "none";

      iframe.id = "__sso__";
      iframe.src = `${this.site}?org=${window.parent.location.href}`;

      document.body.appendChild(iframe);
    }
  }
}

export default WebSSO;
