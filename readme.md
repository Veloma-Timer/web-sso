# web-sso

浏览器端单点登录（无视tab与多doman）


`user.config.ts`
```ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { defineDecorator } from "v-require-all";


@defineDecorator(['Module'])
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

## 说明
这个方法其实不只能导入指定目录的module, 也能导入controller或者service, 并且app.moudule中的@Module被重写后传入的参数也可以更灵活, 该方法也可不在NestJs中使用.

## NestJs以外使用
```ts
import { requireAll } from 'v-require-all';

requireAll({ dirname: __dirname }).then(modules => {
  console.log(modules);
}).catch(error => {
  console.log(error);
});
```
执行结果
```ts
Map(3) {
  '/Users/zhangxuefei/Desktop/ra/package/a.ts' => { a: 'veloma', default: [Function: sum] },
  '/Users/zhangxuefei/Desktop/ra/package/b.ts' => { b: 'timer', default: [Function: sayHello] },
  '/Users/zhangxuefei/Desktop/ra/package/children/c.ts' => {
    name: '山竹',
    defineDecorator: [Function: defineDecorator],
    Person: [Function: Person],
    default: [Function: sayName]
  }
}
```


## 联系方式
wechat: \_\_veloma\_\_ <br />
email: 981931727@qq.com