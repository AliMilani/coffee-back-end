// import IApiSuccess from "./IApiSuccess";

// type controllerPrams = {
//   payload: object,
//   query: object,
//   user: object,
// }

// type IController={
//   [key: string| number| symbol]: ((params:controllerPrams) => Promise<IApiSuccess> | void)
// }

// type IControllerConstructable {
//   // constructor args is any type
//   new (...args: any[]|any): IController;
//   // [key: string]: ((params:controllerPrams) => Promise<IApiSuccess> | unknown)
// }
// export { IControllerConstructable ,IController };

type HttpMethod = "get" | "post" | "put" | "delete" | "patch"

export default interface IRouteOptions<ControllerType> {
  method: HttpMethod
  prefix: string
  schema?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Controller: any
  action: keyof ControllerType
  auth?: "jwt"
}
