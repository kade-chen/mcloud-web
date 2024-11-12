import { app } from '@/stores/localstorage'
import { VERITY_TOKEN } from '@/api/mcenter/token'

// 业务守卫的业务逻辑
export var beforeEachHanler = async function (to, from, next) {
  // 判断用户是否登录
  // 如果要检查路径是否 不以 /login 开头 或者 不等于 / (完整路径)
  if (to.path.indexOf('/login') !== 0) {
    // console.log('sssss0') //ServiceDashboard
    // 需要判断当前用户是否已经登录
    if (!app.value.isLogin) {
      // 如果没有登录，需要重定向到登录页面去
      // 需要获取router对象? 这么不能不用useRoute
      // 直接跳转到LoginPage去登录
      // 记录下用户需要 去往的目标页面
      // /login?name=TagList
      // console.log('sssss2') //ServiceDashboard
      try {
        await VERITY_TOKEN() // 调用验证令牌的异步函数
        app.value.isLogin = true
      } catch (error) {
        console.error('Token 失效,请重新登陆, error', error)
        app.value.isLogin = false
        // 可以选择继续或重定向到登录页面
        next({
          name: 'LoginPage',
          query: {
            name: to.name,
            query: JSON.stringify(to.query),
            params: JSON.stringify(to.params)
          }
        })
        return
      }
      // next({
      //   name: 'LoginPage',
      //   query: {
      //     name: to.name,
      //     query: JSON.stringify(to.query),
      //     params: JSON.stringify(to.params)
      //   }
      // })
      // return
    }

    if (app.value.isLogin == true) {
      // console.log('sssss1') //ServiceDashboard
      try {
        await VERITY_TOKEN() // 调用验证令牌的异步函数
      } catch (error) {
        console.error('Token 失效,请重新登陆, error', error)
        app.value.isLogin = false
        // 可以选择继续或重定向到登录页面
        next({
          name: 'LoginPage',
          query: {
            name: to.name,
            query: JSON.stringify(to.query),
            params: JSON.stringify(to.params)
          }
        })
        return
      }
    }
  }

  if (to.path.indexOf('/login') === 0 || to.path === '/') {
    if (app.value.isLogin == true) {
      console.log('sssss2') //ServiceDashboard
      try {
        await VERITY_TOKEN() // 调用验证令牌的异步函数
        next({
          name: 'ServiceDashboard',
          query: {
            name: to.name,
            query: JSON.stringify(to.query),
            params: JSON.stringify(to.params)
          }
        })
        return
      } catch (error) {
        console.error('Token 失效,请重新登陆, error', error)
        app.value.isLogin = false
        // 可以选择继续或重定向到登录页面
        next({
          name: 'LoginPage',
          query: {
            name: to.name,
            query: JSON.stringify(to.query),
            params: JSON.stringify(to.params)
          }
        })
        return
      }
    }
  }
  // 直接继续后面的路由处理
  next()
}
