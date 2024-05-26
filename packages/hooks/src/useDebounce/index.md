---
nav:
  path: /hooks
---

# useDebounce

用来处理防抖值。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  option?: Option
);
```

### Params

| 参数   | 说明           | 类型     | 默认值 |
| ------ | -------------- | -------- | ------ |
| value  | 需要防抖的值   | `any`    | -      |
| option | 配置防抖的行为 | `Option` | -      |

### Option

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| wait     | 超时时间，单位为毫秒     | `number`  | `1000`  |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true`  |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |
