import IApiSuccess from "./IApiSuccess";

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

export default interface IRouteOptions {
  method: string;
  prefix: string;
  schema?: any; // TODO:
  controller: any;
  action: string;
  auth?: "jwt";
}
