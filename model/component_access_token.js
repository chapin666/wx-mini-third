
/* !
 * 检查ComponentAccessToken是否有效，检查规则为当前时间和过期时间进行对比 * Examples:
 * ```
 * componentAccessToken.isValid();
 * ```
 */
class ComponentAccessToken {

  constructor (componentAccessToken, expireTime) {
    this.componentAccessToken = componentAccessToken;
    this.expireTime = expireTime;
  }

  /* !
  * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比 * Examples:
  * ```
  * token.isValid();
  * ```
  */
  isValid () {
    return (
      !!this.componentAccessToken && new Date().getTime() < this.expireTime
    )
  }
}

module.exports = ComponentAccessToken;