import Conflict from "../../exceptions/Conflict"
import Unauthorized from "../../exceptions/Unauthorized"
import JwtService from "../../providers/JwtService"
import UserService from "../../providers/UserService"
import ILoginPayload from "../../interfaces/ILoginPayload"
import IRegisterPayload from "../../interfaces/IRegisterPayload"
import IVerifyEmailQuery from "../../interfaces/IVerifyEmailQuery"
import Mail from "../../providers/Mail"
import IUser from "../../interfaces/IUser"
import IApiSuccess from "../../interfaces/IApiSuccess"
import DI from "../../DI"

class AuthController {
  constructor({ userService, jwtService, mail }: typeof DI) {
    this.mail = mail
    this.userService = userService
    this.jwtService = jwtService
  }
  private readonly userService: UserService
  private readonly jwtService: JwtService
  private readonly mail: Mail

  async register({
    payload,
  }: {
    payload: IRegisterPayload
  }): Promise<IApiSuccess> {
    if (await this.userService.findOneByEmail(payload.email))
      throw new Conflict("The email address has already been taken.")

    await this.userService.create(payload)

    // TODO: 201 status code
    return {
      httpStatus: 201,
    }
  }

  async login({ payload }: { payload: ILoginPayload }): Promise<IApiSuccess> {
    const user = await this.userService.findOneByEmail(payload.email)

    if (!user || !(await user.verifyPassword(payload.password)))
      throw new Unauthorized("Please double check your email and password.")

    return {
      data: {
        token: this.jwtService.sign({ userID: user.id }),
      },
    }
  }

  async sendEmail({ user }: { user: IUser }): Promise<IApiSuccess> {
    if (user.verified)
      throw new Conflict("The email address has already been verified.")

    const key = await user.generateEmailVerificationKey()

    // TODO: Read from env
    const link = `http://localhost:3000/auth/verify-email?key=${key}`
    const html = `Hey buddy,
    Please click the link below to confirm your email address:
    <a href="${link}">${link}</a>`

    // TODO: Use a background worker to retry on failures
    await this.mail.send(user.email, "Please confirm your email address", html)

    return { message: `Sent an email to ${user.email}` }
  }

  async verifyEmail({
    query,
  }: {
    query: IVerifyEmailQuery
  }): Promise<IApiSuccess> {
    // TODO: Add key expiration period
    if (await this.userService.verifyEmail(query.key))
      return { message: "Verified." }

    return { message: "Invalid key." }
  }
}

export default AuthController
