export default interface IApiSuccess<DataType = object> {
  message?: string
  httpStatus?: 200 | 201
  data?: DataType
}
