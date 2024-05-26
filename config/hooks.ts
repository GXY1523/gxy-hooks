export const menus = [
  {
    title: '状态',
    children: [
      'useToggle',
      'useBoolean',
      'useGetState',
      'useRafState',
      'useThrottle',
      'useDebounce',
      'useSetState',
      'useCookieState',
      'useMap',
      'useSet',
      'useResetState',
      'useLocalStorageState',
      'useSessionStorageState',
      'usePrevious',
    ],
  },
  {
    title: '进阶',
    children: ['useLatest', 'useMemoizedFn'],
  },
  {
    title: '生命周期',
    children: ['useUnmount'],
  },
  {
    title: 'DOM',
    children: [
      'useTitle',
      'useClickAway',
      'useEventListener',
      'useDocumentVisibility',
      'useEventTarget',
    ],
  },
  {
    title: 'Effect',
    children: ['useThrottleFn', 'useDebounceFn', 'useUpdateEffect'],
  },
  {
    title: 'Scene',
    children: ['useHistoryTravel'],
  },
];
