export interface IHttpRoute {
  method: string,
  route: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  handler: Function,
}
