const pageConfig = {
  // 状态页面的标题
  title: "lyc8503's Status Page",
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
      method: 'GET',
      target: 'https://docker.registry.cyou'
    },
    {
      id: 'ssh_monitor',
      name: '2',
      method: 'GET',
      target: 'https://docker-cf.registry.cyou'
    },
  ],
  notification: {
    // [Optional] apprise API server URL
    // if not specified, no notification will be sent
    appriseApiServer: "https://apprise.example.com/notify",
    // [Optional] recipient URL for apprise, refer to https://github.com/caronc/apprise
    // if not specified, no notification will be sent
    recipientUrl: "tgram://bottoken/ChatID",
    // [Optional] timezone used in notification messages, default to "Etc/GMT"
    timeZone: "Asia/Shanghai",
    // [Optional] grace period in minutes before sending a notification
    // notification will be sent only if the monitor is down for N continuous checks after the initial failure
    // if not specified, notification will be sent immediately
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
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here

      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

// Don't forget this, otherwise compilation fails.
export { pageConfig, workerConfig }
