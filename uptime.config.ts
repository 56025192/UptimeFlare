const pageConfig = {
  // 状态页面的标题
  title: "古巷DOCKER代理监控",
  // 状态页面标题处显示的链接可以将“highlight”设置为“true”`
  links: [
    { link: 'https://github.com/lyc8503', label: 'GitHub' },
    { link: 'https://blog.lyc8503.net/', label: 'Blog' },
    { link: 'mailto:me@lyc8503.net', label: 'Email Me', highlight: true },
  ],
}

const workerConfig = {
  // 除非状态发生变化，否则最多每3分钟写入一次KV
  kvWriteCooldownMinutes: 3,
  // 通过取消注释下面的行，格式为`<USERNAME>:<PASSWORD>，为状态页和API启用HTTP基本身份验证`
  // passwordProtection: 'username:password',
  // 在此处定义所有监视器
  monitors: [
    {
      id: '1',
      name: 'docker.registry.cyou',
      method: 'POST',
      target: 'https://docker.registry.cyou'
    },
    {
      id: '2',
      name: '2',
      method: 'POST',
      target: 'https://docker-cf.registry.cyou'
    },
  ],
  notification: {
    // [可选]通知API服务器URL
    // 如果未指定，则不会发送通知
    appriseApiServer: "https://apprise.example.com/notify",
    // [可选]用于通知的收件人URL，请参阅https://github.com/caronc/apprise
    // 如果未指定，则不会发送通知
    recipientUrl: "tgram://bottoken/ChatID",
    // [可选]通知消息中使用的时区，默认为“Etc/GMT”
    timeZone: "Asia/Shanghai",
    // [可选]发送通知前的宽限期（分钟）
    // 只有当监视器在初始故障后停机进行N次连续检查时，才会发送通知
    // 如果未指定，将立即发送通知
    gracePeriod: 5,
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 当任何监视器的状态发生变化时，将调用此回调
      // 在此处编写任何Typescript代码

      // 这将不遵循宽限期设置，并在状态更改时立即调用
      // 如果你想实现它，你需要手动处理宽限期
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // 如果任何监视器发生持续事件，此回调将每1分钟调用一次
      // 在此处编写任何Typescript代码
    },
  },
}

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
