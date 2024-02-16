export default interface IApiSuccess<DataType = Object> {
  message?: string;
  httpStatus?: 200 | 201;
  data?: DataType;
}
